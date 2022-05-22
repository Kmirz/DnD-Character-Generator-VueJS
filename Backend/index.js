const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");

async function createPdf(input, output) {
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input));

    pdfDoc.removePage(1);

    const form = pdfDoc.getForm();

    let example = "";

    form.getTextField("CharacterName").setText("Jamie Lee");
    form
      .getTextField("Features and Traits")
      .setText(
        "Visual Studio Code comes with Emmet preinstalled. Emmet is a plugin that helps you write HTML and CSS easier using shortcuts.Thanks to Emmet it is really easy to generate lorem ipsum. You no longer have to search for a lorem ipsum online generator."
      );

    form.getCheckBox("Check Box 18").check();

    form.removeField(form.getCheckBox("Check Box 18"));

    //Modify doc, fill out the form...

    const pdfBytes = await pdfDoc.save();

    await writeFile(output, pdfBytes);

    console.log("PDF created!");
  } catch (err) {
    console.log(err);
  }
}

createPdf("./5E_CharacterSheet_Fillable.pdf", "output.pdf");
