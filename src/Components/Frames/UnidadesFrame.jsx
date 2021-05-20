import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {newUnidad, openUnidad, deleteUnidad, getUnidades} from '../../Useful Functions/Unidad'

function UnidadesFrame (){
    useEffect(()=>{
        findUnidades()
    },[])

    const[unidades, setUnidades] =useState([])
    const headings =["No. de Unidad", "Modelo", "Motor", "Placas"]
    
    async function findUnidades(){
        setUnidades(await getUnidades())
    }

    return(
        <>
            <h1 className="title">Unidades</h1>
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
                        {unidades.map(unidad=>{
                            return(
                                <tr key={unidad.clave} className="row">
                                    <td className="pointer" onClick={()=> openUnidad(unidad.clave)}>Abrir</td>
                                    <td>{unidad.clave}</td>
                                    <td>{unidad.modelo}</td>
                                    <td>{unidad.motor}</td>
                                    <td>{unidad.placas}</td>
                                    <td onClick={async ()=> {await deleteUnidad(unidad.clave); findUnidades()}} className="pointer delete">Borrar</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div onClick={()=> newUnidad()} className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Nueva Unidad</span>
            </div>
        </>
    )
}

export default UnidadesFrame