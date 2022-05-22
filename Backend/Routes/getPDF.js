const express = require("express");
const router = express.Router();
const http = require("http");
const fs = require("fs");

// Getting PDF File
router.get("/getPDF", async (req, res) => {
  try {
    let pdfFile = __dirname + "/PDFs/output.pdf";
    fs.readFile(pdfFile, function (err, content) {
      if (err) {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("No such file");
      } else {
        res.writeHead(200, { "content-type": "Pdf/pdf" });
        res.end(content);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
