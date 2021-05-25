const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const { shell } = require('electron')

function LiquidacionPDF(liquidacion){
    const doc = new PDFDocument({
        font: 'Helvetica',
        size: 'LETTER',
        margin: 10,
        autoFirstPage: false
    })

    const width = 612
    const heigth = 792
    const marginx = 10
    const marginy = 10

    const writeStream = fs.createWriteStream('liquidacion.pdf')
    doc.pipe(writeStream)
    doc.on('pageAdded', ()=> doc.roundedRect(10, 10, width - 2*marginx, heigth - 2*marginy, 3).stroke())
    doc.addPage()

    doc.fontSize(12).text(`Liquidacion ${liquidacion.folio}`, marginx, doc.y + 3, {align: 'center'})
    doc.roundedRect(marginx, marginy, width - 2*marginx, 18, 3).stroke().moveDown()
    doc.fontSize(8)
    doc.text(`Operador: ${liquidacion.operador.nombres} ${liquidacion.operador.primer_apellido} ${liquidacion.operador.segundo_apellido}`)
    doc.text(`Fecha de Inicio: ${liquidacion.fecha_inicio.split('T')[0]}`)
    doc.text(`Fecha de Cierre: ${liquidacion.fecha_cierre.split('T')[0]}`)

    doc.moveDown()

    doc.roundedRect(marginx, doc.y, width - 2*marginx, 18, 3)
    doc.fontSize(12).text(`Servicios`, marginx, doc.y + 3, {align: 'center'}).moveDown().stroke()
    liquidacion.ordenes.forEach(orden => {
        doc.fontSize(8).text(`${orden.serie}-${orden.folio} ${orden.consignatario.razon_social} $${orden.comision}`)
    })
    
    doc.moveDown()
    
    doc.roundedRect(marginx, doc.y, width - 2*marginx, 18, 3)
    doc.fontSize(12).text(`Anticipos`, marginx, doc.y + 3, {align: 'center'}).moveDown()
    liquidacion.anticipos.forEach(anticipo => {
        doc.fontSize(8).text(`${anticipo.serie}-${anticipo.folio} ${anticipo.concepto} $${anticipo.importe}`)
    })

    doc.moveDown()

    doc.roundedRect(marginx, doc.y, width - 2*marginx, 18, 3).stroke()
    doc.fontSize(12).text(`Comprobacion`, marginx, doc.y + 3, {align: 'center'}).moveDown() 
    liquidacion.comprobacion.forEach(comprobante => {
        doc.fontSize(8).text(`${comprobante.concepto} $${comprobante.importe}`)
    })

    doc.moveDown()
    doc.text(`Total: $${liquidacion.importe}`)
    
    doc.end()
    writeStream.on('finish', ()=>{
        shell.openPath('liquidacion.pdf')
    })
}

exports.LiquidacionPDF = LiquidacionPDF