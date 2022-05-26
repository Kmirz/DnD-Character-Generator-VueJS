const express = require("express");
const router = express.Router();

const path = require("path");

const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");

// Getting PDF File
router.post("/getPDF", async (req, res) => {
  try {
    const characterData = req.body;

    console.log(characterData);

    const pdfFile = await createPdf("./app/Routes/PDFs/5E_CharacterSheet_Fillable.pdf", characterData);
    console.log(pdfFile);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfFile.length,
    });
    res.send(pdfFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function createPdf(input, characterData) {
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input));

    pdfDoc.removePage(1);

    const form = pdfDoc.getForm();

    form.getTextField("CharacterName").setText(characterData.name);

    form.getTextField("Race ").setText(characterData.characterRace);

    form.getTextField("ClassLevel").setText(`${characterData.className}  LVL: 1`);

    let statArray = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

    characterData.statValues.forEach((element, id) => {
      form.getTextField(statArray[id]).setText(String(element));
    });

    //Calculated ability score from stats
    let abilityScoreArray = ["STRmod", "DEXmod ", "CONmod", "INTmod", "WISmod", "CHamod"];

    characterData.statValues.forEach((element, id) => {
      let abilityScore = Math.floor((element - 10) / 2);

      abilityScore = abilityScore >= 0 ? `+${abilityScore}` : String(abilityScore);

      form.getTextField(abilityScoreArray[id]).setText(abilityScore);
    });

    form.getTextField("Features and Traits").setText(characterData.proficiencyList.join("\r\n"));

    //Modify doc, fill out the form...

    const pdfBytes = await pdfDoc.save();
    // console.log(pdfBytes);
    // await writeFile(output, pdfBytes);

    return Buffer.from(pdfBytes.buffer, "binary");

    console.log("PDF created!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
