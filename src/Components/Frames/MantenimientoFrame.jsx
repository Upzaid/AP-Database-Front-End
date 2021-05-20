import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {newMantenimiento, openMantenimiento, deleteMantenimiento, getMantenimiento} from '../../Useful Functions/Mantenimiento'

const {ipcRenderer} = window.require('electron')

function MantenimientoFrame (){
    
    const [mantenimiento, setMantenimiento] = useState([])

    useEffect(()=>{
        findMantenimiento()
    },[])

    const headings =["Folio", "Unidad", "Fecha de Inicio", "Fecha de Cierre", "Ubicacion", "Descripcion"]
    
    async function findMantenimiento(){
        setMantenimiento(await getMantenimiento());
    }

    return(
        <>
            <h1 className="title">Mantenimiento</h1>
            <SearchBar filters={headings} function={null}/>
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
                        {mantenimiento.map(orden=>{
                            return(
                                <tr key={orden.folio} className="row">
                                    <td onClick={()=> openMantenimiento(orden.folio)} className="pointer">Abrir</td>
                                    <td>{orden.folio}</td>
                                    <td>{orden.unidad.clave}</td>
                                    <td>{orden.fecha_inicio.split('T')[0]}</td>
                                    <td>{orden.fecha_cierre ? orden.fecha_cierre.split('T')[0] : null}</td>
                                    <td>{orden.ubicacion}</td>
                                    <td>{orden.descripcion}</td>
                                    <td onClick={async ()=> {await deleteMantenimiento(orden.folio); findMantenimiento()}} className="pointer delete">Borrar</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div onClick={()=> newMantenimiento()} className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Orden de Mantenimiento</span>
            </div>
        </>
    )
}

export default MantenimientoFrame