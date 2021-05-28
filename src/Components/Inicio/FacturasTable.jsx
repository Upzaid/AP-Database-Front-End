import React, {useState, useEffect} from 'react'
import Search from '../../Useful Functions/Search'
import {openFactura} from '../../Useful Functions/Factura'

export default function FacturasTable(){
    const [facturas, setFacturas] = useState([])

    useEffect(()=>{
        findFacturas()
    }, [facturas])

    async function findFacturas(){
        setFacturas(await Search('factura', 'estatus', 'Pendiente'))
    }

    return (
        <div>
            <h2 className="title">{facturas.length} Facturas Pendientes de Pago</h2>
            <div className="frame">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Serie</th>
                            <th>Folio</th>
                            <th>Receptor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.map(factura =>{
                            return(
                                <tr key={`${factura.serie} ${factura.folio}`} className="row">
                                    <td onClick={()=> openFactura(factura.serie, factura.folio)} className="pointer">Abrir</td>
                                    <td>{factura.serie}</td>
                                    <td>{factura.folio}</td>
                                    <td>{factura.receptor.razon_social}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}