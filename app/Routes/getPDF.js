const express = require("express");
const router = express.Router();
const http = require("http");
const fs = require("fs");
const path = require("path");

const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");

// Getting PDF File
router.post("/getPDF", async (req, res) => {
  try {
    const characterData = { name: req.body.name };

    console.log(req.body.name);

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

    let example = "";

    form.getTextField("CharacterName").setText(characterData.name);
    form
      .getTextField("Features and Traits")
      .setText(
        "Visual Studio Code comes with Emmet preinstalled. Emmet is a plugin that helps you write HTML and CSS easier using shortcuts.Thanks to Emmet it is really easy to generate lorem ipsum. You no longer have to search for a lorem ipsum online generator."
      );

    form.getCheckBox("Check Box 18").check();

    form.removeField(form.getCheckBox("Check Box 18"));

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
