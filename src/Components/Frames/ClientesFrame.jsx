import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'

function ClientesFrame (props){
    useEffect(()=>{
        // API CALL FOR ANTICIPOS LIST
    },[])

    const[rows, setRows] =useState([[1,2,3]])
    
    const headings =["Clave", "Razon Social", "R.F.C.", "Direccion"]
    
    return(
        <>
            <h1 className="title">Clientes</h1>
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
                <span>Nuevo Cliente</span>
           </div>
        </>
    )
}

export default ClientesFrame