const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const {shell} = require('electron')


function AnticipoPDF(document, x, y, anticipo){

    document.fontSize(9)
    document.text(`${anticipo.serie} - ${anticipo.folio}`, x, y + 9, {align:'right', width: 300})
    document.text(anticipo.fecha.split('T')[0], x + 0, y + 18, {align:'right', width: 300})
    
    document.moveTo(x, y + 27).lineTo(x + 306, y + 27).stroke()
    document.fontSize(10).text(`${anticipo.personal.nombres} ${anticipo.personal.primer_apellido} ${anticipo.personal.segundo_apellido}`, x, y + 37, {align: 'center', width: 306})
    document.text(anticipo.concepto, x, y + 77, {align: 'center', width: 306})
    
    document.text(`$ ${anticipo.importe}`, x, y + 157, {align: 'right', width: 300})
    document.roundedRect(x, y, 306, 198, 3).stroke()
}

function AnticiposPDF(anticipos){
    const doc = new PDFDocument({
        font: 'Helvetica',
        size: 'LETTER',
        margin: 0
    })
    const writeStream = fs.createWriteStream('anticipo.pdf')
    doc.pipe(writeStream)


    let x = 0
    let y = 0
    for (let i = 0; i< anticipos.length; i++){
        AnticipoPDF(doc, x, y,anticipos[i] )
        x += 306
        if (x >= 612){
            y += 198
            x = 0
            if (y >= 792){
                doc.addPage()
                x = 0
                y = 0
            }
        }
    }

    doc.end()
    writeStream.on('finish', ()=>{
        shell.openPath('anticipo.pdf')
    })
}

exports.AnticiposPDF = AnticiposPDF