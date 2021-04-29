import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'

function OrdenesFrame (props){
    useEffect(()=>{
        // API CALL FOR ORDENES LIST
    },[])

    const[rows, setRows] =useState([[1,2,3]])
    
    const headings = ["Folio", "Serie", "Fecha", "Contenedor", "Booking / BL", "Sello", "Operador", "Ruta", 
    "Tipos de Servicio", "Unidad", "Placas", "Flete", "Maniobra", "Almacenaje","Reexpedicion",
    "Dif Km.", "Subtotal", "I.V.A.", "Retencion", "Total", "Status"]
    
    return(
        <>
            <h1 className="title">Ordenes de Servicio</h1>
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
                <span>Nueva Orden</span>
           </div>
        </>
    )
}

export default OrdenesFrame