import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'

function ContenedoresFrame (props){
    useEffect(()=>{
        // API CALL FOR ANTICIPOS LIST
    },[])

    const[rows, setRows] =useState([[1,2]])
    
    const headings =["Tamaño", "Dimensiones"]
    
    return(
        <>
            <h1 className="title">Contenedores</h1>
            <SearchBar filters={headings} function={null}/>
            <div className="frame">
                <table>
                    <tr>
                        <th></th>
                        {headings.map(heading=>{
                            return(
                                <th>{heading}</th>
                            )
                        })}
                    </tr>
                    {rows.map(row=>{
                        return(
                            <tr className="row">
                                <td className="pointer">Abrir</td>
                                {row.map(column=>{
                                    return(
                                        <td>{column}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Nuevo Contenedor</span>
            </div>
        </>
    )
}

export default ContenedoresFrame