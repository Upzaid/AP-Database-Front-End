import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'

function FacturasFrame (props){
    useEffect(()=>{
        // API CALL FOR FACTURAS LIST
    },[])

    const[rows, setRows] =useState([[1,undefined, null]])
    
    const headings =["Serie","Folio", "Fecha", "Receptor","Concepto","Importe"]
    
    return(
        <>
            <h1 className="title">Facturas</h1>
            <div className="frame">
                <ul className="table-header">
                    <li></li>
                    {headings.map(heading=>{
                        return(
                            <li>{heading}</li>
                        )
                    })}
                </ul>
                {rows.map(row=>{
                    return(
                        <ul>
                            <li className="pointer">Ver / Editar</li>
                            {row.map(column=>{
                                return(
                                    <li>{column}</li>
                                )
                            })}
                        </ul>
                    )
                })}
            </div>
            <br/>
           <div className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Nueva Factura</span>
           </div>
        </>
    )
}

export default FacturasFrame