import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {openFactura, newFactura, deleteFactura, getFacturas} from '../../Useful Functions/Factura'

function FacturasFrame (){
    useEffect(()=>{
        findFacturas()
    },[])

    const[facturas, setFacturas] =useState([])
    
    const headings =["Serie","Folio", "Fecha", "Receptor", "Importe"]
    const filters =["Serie","Folio", "Fecha", "Importe"]

    async function findFacturas(){
        setFacturas(await getFacturas());
    }

    return(
        <>
            <h1 className="title">Facturas</h1>
            <SearchBar filters={filters} model='factura' function={setFacturas}/>
            <div className="frame">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {headings.map(heading=>{
                                return(
                                    <th key={heading}>{heading}</th>
                                    )
                                })}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {facturas.map(factura=>{
                        return(
                            <tr key={`${factura.serie} ${factura.folio}`} className="row">
                                <td onClick={()=> openFactura(factura.serie, factura.folio)} className="pointer">Abrir</td>
                                <td>{factura.serie}</td>
                                <td>{factura.folio}</td>
                                <td>{factura.fecha.split('T')[0]}</td>
                                <td>{factura.receptor.razon_social}</td>
                                <td>$ {factura.total}</td>
                                <td onClick={()=>{ deleteFactura(factura.serie, factura.folio); findFacturas()}} className="pointer delete">Eliminar</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div onClick={()=> newFactura()} className="button new ">
                    <img src={Nuevo} alt=""/>
                    <span>Nueva Factura</span>
            </div>
        </>
    )
}

export default FacturasFrame