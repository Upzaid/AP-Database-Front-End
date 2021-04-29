import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'

function AnticiposFrame (props){
    useEffect(()=>{
        // API CALL FOR ANTICIPOS LIST
    },[])

    const[rows, setRows] =useState([])
    
    const headings =["Serie", "Folio", "Fecha", "Operador","Concepto","Importe"]
    
    return(
        <>
            <h1 className="title">Anticipos</h1>
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
                <span>Nuevo Anticipo</span>
           </div>
        </>
    )
}

export default AnticiposFrame