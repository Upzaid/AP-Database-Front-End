const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const {exec} = require('child_process')

const orden ={
    fecha: 'DD-MM-AAAA',
    serie: 'AAA',
    folio: '1234',
}

function OrdenPDF(orden){
    const doc = new PDFDocument({
        font: 'Helvetica',
        size: 'LETTER'
    })
    const width = 612
    const height = 792
    const r = 2
    let x = 10
    let y = 10
    
    const accentColor = '#CCC'

    const writeStream = fs.createWriteStream('orden.pdf')

    doc.pipe(writeStream)
    doc.lineWidth(1)
    // Margin
    doc.roundedRect(x, y, width-2*x, height-2*y, r)
    
    // Logo Frame
    doc.roundedRect(x, y, 100, 100, r)
    // Title Frame
    doc.roundedRect(x + 100, y, width-2*x-100*2, 100, r)
    x = width-x-2*100
    // Folio and Fecha
    
    doc.roundedRect(x + 100, y, 100, 100, r).stroke()
    
    doc.roundedRect(x + 100, y, 100, 25 , r).fillAndStroke(accentColor, 'black')
    doc.roundedRect(x + 100, y + 25, 100, 25 , r).stroke()
 
    doc.roundedRect(x + 100, y + 50, 100, 25 , r).fillAndStroke(accentColor, 'black')
    doc.roundedRect(x + 100, y + 75, 100, 25 , r)
    y += 100
    x = 10

    // Naviera frame
    doc.roundedRect(x, y, width-2*x, 20, r).stroke()
    y += 20

    // Ruta
    doc.roundedRect(x, y, 75, 15,5).fillAndStroke(accentColor, 'black')
    doc.roundedRect(x + 75 , y, width-2*x - 75, 15, r).stroke()

    // Tipo de servicio
    doc.roundedRect(x + (width-20)* 0.75 , y, (width-20)*0.125, 15, r).fillAndStroke(accentColor, 'black')

    y += 15

    // 
    doc.roundedRect(x , y, width-2*x, 25, r).fillAndStroke(accentColor, 'black')
    y += 25
    
    // 
    doc.roundedRect(x, y, (width-20 )* 0.25, 150, r)
    doc.roundedRect(x + (width -20)* 0.25, y, (width-20) * 0.5 , 150, r)
    doc.roundedRect(x + (width-20)* 0.75, y, (width-20) * 0.25 , 150, r).stroke()
    y += 150

    // Detalles de la carga
    doc.roundedRect(x , y, width-2*x, 25, r).fillAndStroke(accentColor, 'black')
    y += 25

    doc.roundedRect(x, y, (width-2*x)*.8, 75, r )
    doc.roundedRect(x + (width-2*x)*.8, y, (width-2*x)*.2, 180, r)
    doc.roundedRect(x, y + 75, (width-2*x)*.8, 105, r )
    doc.roundedRect(x + (width-2*x)*.8, y, (width-2*x)*.12, 180, r)
    doc.roundedRect(x + (width-2*x)*.92, y, (width-2*x)*.08, 180, r)
    doc.roundedRect(x + (width-2*x)*.8, y, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 18, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 36, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 54, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 72, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 90, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 108, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 126, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 144, (width-2*x)*.2, 18, r)
    doc.roundedRect(x + (width-2*x)*.8, y + 162, (width-2*x)*.2, 18, r).stroke()
    
    y += 180

    // Acuse de recibo
    doc.roundedRect(x , y, width-2*x, 25, r).fillAndStroke(accentColor, 'black')
    y += 25

    doc.roundedRect(x, y, (width-20)/2, 35, r)
    doc.roundedRect(x, y+35, (width-20)/2, 35, r)
    doc.roundedRect(x, y+70, (width-20)/2, 35, r)
    doc.roundedRect(x, y+105, (width-20)/2, 35, r)

    doc.roundedRect(x +(width-20)/2, y, (width-20)*0.3, 140, r)
    doc.roundedRect(x +(width-20)*0.8, y, (width-20)*0.2, 140, r).stroke()
    
    y += 140

    doc.roundedRect(x , y, width-2*x, 25, r).fillAndStroke(accentColor, 'black')
    y += 25
    
    // Asignacion del sevicio
    doc.roundedRect(x, y, (width-20)/3, 35, r)
    doc.roundedRect(x + (width-20)/3, y, (width-20)/3, 35, r)
    doc.roundedRect(x + 2 * (width-20)/3, y, (width-20)/3, 35, r).stroke()
    y += 35
    doc.roundedRect(x , y, (width-20), 32, r)

    doc.stroke()

    // Text
    x = 10
    y = 10
    doc.fontSize(9)
    doc.fillColor('black').text('FECHA', x + width-120 , y+10, {
        width: 100,
        align: 'center'
    })

    doc.end()
    
    writeStream.on('finish', ()=>{
        exec(path.join(__dirname,'orden.pdf'))
    })
}

OrdenPDF(orden)
