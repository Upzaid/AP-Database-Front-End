import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'

function PersonalFrame (props){
    useEffect(()=>{
        // API CALL FOR ANTICIPOS LIST
    },[])

    const[rows, setRows] =useState([[1,2,3]])
    
    const headings =["Clave", "Nombre", "R.F.C.", "Direccion", "Telefono"]
    
    return(
        <>
            <h1 className="title">Personal</h1>
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
                <span>Nuevo Personal</span>
           </div>
        </>
    )
}

export default PersonalFrame