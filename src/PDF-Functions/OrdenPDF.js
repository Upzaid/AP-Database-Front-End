const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')
const {shell} = require('electron')

function OrdenPDF(orden){
    console.log(__dirname, 'print');
    const doc = new PDFDocument({
        font: 'Helvetica',
        size: 'LETTER',
        margin:0
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
    doc.image(path.join(__dirname,'../Assets/Logo.png'), x+0.5, y+2, {width: 98})
    
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
    doc.roundedRect(x + (width-20)* 0.7 , y, (width-20)*0.15, 15, r).fillAndStroke(accentColor, 'black')

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

    doc.roundedRect(x +(width-20)/2, y, (width-20)*0.25, 140, r)
    doc.roundedRect(x +(width-20)*0.75, y, (width-20)*0.25, 140, r).stroke()
    doc.image(path.join(__dirname, 'qr_code.jpeg'),x +(width-20)*0.76, y +1 , {width: 138})
    
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
    doc.fontSize(17).fillColor('black').font('Helvetica-Bold')
    doc.text('AUTOTRANSPORTES PANTACO S.A. DE C.V.', x, y+10, {width: width-20, align: 'center'})
    doc.fontSize(15).text('R.F.C.: APA140923B23', x, y+32, {width: width-20, align: 'center'})
    doc.fontSize(7.5).text('AV. GRANJAS #113 COL. JARDÍN AZPEITIA DEL. AZCAPOTZALCO CDMX, CP. 02530 TEL. 55-2631-6615', x, y+55, {width: width-20, align: 'center'})

    doc.fontSize(9).font('Helvetica')
    doc.fillColor('black').text('FECHA', x + width-120 , y+10, {
        width: 100,
        align: 'center'
    }).text(orden.fecha.split('T')[0], x + width-120 , y+35, {
        width: 100,
        align: 'center'
    })
    y += 35
    doc.text('FOLIO', x + width-120, y + 25, {
        width: 100,
        align: 'center'
    }).text(`${orden.serie} - ${orden.folio}`, x + width-120, y + 50, {
        width: 100,
        align: 'center'
    })
    y += 50

    doc.font('Helvetica-Bold').fontSize(11).text(orden.naviera.razon_social, x , y + 20,{
        width: width-20,
        align: 'center'
    })
    y += 20

    doc.font('Helvetica').fontSize(9).text('RUTA', x, y + 20, {
        width: 75,
        align: 'center'
    }).text(orden.ruta, x + 78, y + 20)

    doc.text('TIPO DE SERVICIO', (width-20)*0.55, y + 20, {
        align: 'center'
    })

    doc.text(orden.tipo_servicio, (width-20)*0.85, y + 20, {
        align: 'center',
        width: (width-20) * 0.15
    })

    y += 20

    doc.text('ORIGEN', x, y + 20, {align:'center', width: (width - 20)* 0.25})
        .text('CONSIGNATARIO', x + (width - 20)* 0.25, y + 20, {align:'center', width: (width - 20)* 0.5})
        .text('DESTINO / AGENCIA ADUANAL', x + (width - 20)* 0.75, y + 20, {align:'center', width: (width - 20)* 0.25})

    y += 20
    doc.text(orden.origen, x, y + 20, {width: (width-20)*0.25, height:150, align: 'center'})
    doc.text(orden.consignatario.razon_social, x + (width-20)*0.25 , y + 20, {width: (width-20)*0.5, height:150, align: 'center'})
    doc.text(orden.destino_agencia, x + (width-20)*0.75 , y + 20, {width: (width-20)*0.25, height:150, align: 'center'})

    y += 150

    doc.text('DETALLES DE LA CARGA', x , y +25, {width: (width-20), align:'center'})
    y += 25

    doc.text(`Numero de contenedor: ${orden.contenedor}`, x + 2, y + 20)
    doc.text(`${orden.tamano} ${orden.naviera.razon_social}`, x + 2, y + 29)
    doc.text(`Booking / BL:${orden.booking}`, x + 2, y + 38)
    doc.text(`Sello: ${orden.sello}`, x + 2, y + 47)
    doc.text(`${orden.observaciones}`, x + 2, y + 56, {width: (width-20) * 0.8})

    doc.text('MERCANCIA INCRIPTADA SEGUN PEDIMENTO SAT', x, y + 98, {width: (width-20)*0.8, align:'center'})
    doc.text('FLETE LIBRE A BORDO Y SIN MANIOBRAS', x, y + 128, {width: (width-20)*0.8, align:'center'})
    doc.text('PESO MÁXIMO 19 TONELADAS + TARA SEGÚN NOM 012-SCT *EVITE PROBLEMAS CON SCT*', x, y + 158, {width: (width-20)*0.8, align:'center'})

    doc.text('FLETE', x + (width-20)*0.80 + 2, y + +20, {width: (width-20) * 0.12})
    doc.text('MANIOBRA', x + (width-20)*0.80 + 2, y + +38, {width: (width-20) * 0.12})
    doc.text('ALMACENAJE', x + (width-20)*0.80 + 2, y + +56, {width: (width-20) * 0.12})
    doc.text('FLETE FALSO', x + (width-20)*0.80 + 2, y + +74, {width: (width-20) * 0.12})
    doc.text('REEXPEDICION', x + (width-20)*0.80 + 2, y + +92, {width: (width-20) * 0.12})
    doc.text('DIF. KM.', x + (width-20)*0.80 + 2, y + +110, {width: (width-20) * 0.12})
    doc.text('SUBTOTAL', x + (width-20)*0.80 + 2, y + +128, {width: (width-20) * 0.12})
    doc.text('I.V.A. %16', x + (width-20)*0.80 + 2, y + +146, {width: (width-20) * 0.12})
    doc.text('RET %4', x + (width-20)*0.80 + 2, y + +164, {width: (width-20) * 0.12})
    doc.text('TOTAL', x + (width-20)*0.80 + 2, y + +182, {width: (width-20) * 0.12})
    
    doc.text(!orden.flete ? null : `$${orden.flete}`, x + (width-20)*0.92 + 2, y + +20, {width: (width-20) * 0.08})
    doc.text(!orden.maniobra ? null : `$${orden.maniobra}`, x + (width-20)*0.92 + 2, y + +38, {width: (width-20) * 0.08})
    doc.text(!orden.almacenaje ? null :`$${orden.almacenaje}`, x + (width-20)*0.92 + 2, y + +56, {width: (width-20) * 0.08})
    doc.text(!orden.flete_falso ? null :`$${orden.flete_falso}`, x + (width-20)*0.92 + 2, y + +74, {width: (width-20) * 0.08})
    doc.text(!orden.reexpedicion ? null :`$${orden.reexpedicion}`, x + (width-20)*0.92 + 2, y + +92, {width: (width-20) * 0.08})
    doc.text(!orden.dif_kilometraje ? null :`$${orden.dif_kilometraje}`, x + (width-20)*0.92 + 2, y + +110, {width: (width-20) * 0.08})
    doc.text(!orden.subtotal ? null : `$${orden.subtotal}`, x + (width-20)*0.92 + 2, y + +128, {width: (width-20) * 0.08})
    doc.text(!orden.iva ? null : `$${orden.iva}`, x + (width-20)*0.92 + 2, y + +146, {width: (width-20) * 0.08})
    doc.text(!orden.retencion ? null : `$${orden.retencion}`, x + (width-20)*0.92 + 2, y + +164, {width: (width-20) * 0.08})
    doc.text(!orden.total ? null :`$${orden.total}`, x + (width-20)*0.92 + 2, y + +182, {width: (width-20) * 0.08})
    y += 180

    doc.text()
    doc.text('ACUSE DE RECIBO DE MERCANCIA', x, y + 25, {width: width-20,align: 'center'})
    y += 25

    doc.text('NOMBRE', x, y +24, {width: (width-20) * 0.5, align: 'center'})
    doc.text('FIRMA', x, y +59, {width: (width-20) * 0.5, align: 'center'})
    doc.text('FECHA Y HORA DE ENTRADA', x, y +94, {width: (width-20) * 0.5, align: 'center'})
    doc.text('FECHA Y HORA DE SALIDA', x, y +129, {width: (width-20) * 0.5, align: 'center'})

    doc.text('SELLO DE PLANTA', x + (width-20)/2, y + 25, {width: (width-20)*0.25 ,align: 'center'} )
    y += 140

    doc.text('ASIGNACIÓN DEL SERVICIO', x, y + 25, {width: width-20, align:'center'})
    y +=20

    doc.text('NOMBRE DEL OPERADOR', x, y + 25, {width: (width-20)/3 , align: 'center'})
    doc.text('ECONÓMICO', x + (width-20)/3, y + 25, {width: (width-20)/3 , align: 'center'})
    doc.text('PLACAS', x + 2*(width-20)/3, y + 25, {width: (width-20)/3 , align: 'center'})
    
    doc.text(`${orden.operador.nombres} ${orden.operador.primer_apellido} ${orden.operador.segundo_apellido}`, x, y + 40, {width: (width-20)/3 , align: 'center'})
    doc.text(orden.unidad.clave, x + (width-20)/3, y + 40, {width: (width-20)/3 , align: 'center'})
    doc.text(orden.unidad.placas, x + 2*(width-20)/3, y + 40, {width: (width-20)/3 , align: 'center'})
    y += 60

    doc.fontSize(6).text('Cadena Original del complemento de certificación digital del SAT: ||1.1|9BB8EEEB-BD55-4FA7-BBF2-152D0D158408|2020-08-03T13:56:48|SAT970701NN3|Qw1KSFiN7OI/xaHK1soJZY9/n8WfT37u7EDXs563G4We64gRnx9kZ3t6fMN1gCQApcobPxEzbepdqz3Jk9flVFZdJp+uc6YTBI+z1nT/AYoo5KQ8Qk4Zmy0PpFkc2cpJzIm1dLRf3QWHEyg6GOuewOYpiuEN18FrLVf8U1iIpdZ7jDe8LeAYJU4IfuFBvbeLD1zmUdX0PIoyHaeJuZGdrBg024+J1f3T1l3MX4sQZXUnsok07oeoNOcu3jTB6aNCavMAuxUB5/DhiZNdI5S0Gac77laT4dY9TKZPjo7voN4MSv5BC32VuV19If19OVy1K/y8sa0SzlDdyDModp4G3w==|00001000000504465028||',x ,y, {width: width-20})

    doc.end()

    writeStream.on('finish', () =>{
        shell.openPath('orden.pdf')
    })
}

exports.OrdenPDF = OrdenPDF
