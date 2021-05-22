const {shell} = require('electron')
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

function OrdenPDF(orden){
    const doc = new PDFDocument()
    
    doc.pipe(fs.createWriteStream('orden.pdf'))
    doc.end()

    shell.openPath(path.join(__dirname, 'orden.pdf'))
}

OrdenPDF()