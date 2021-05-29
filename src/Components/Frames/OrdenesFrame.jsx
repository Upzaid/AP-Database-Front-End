import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {newOrden, openOrden, deleteOrden, getOrdenes} from '../../Useful Functions/Orden'

function OrdenesFrame (){
    
    const [ordenes, setOrdenes] = useState([])
    
    useEffect(()=>{
        findOrdenes()
    },[])
    
    async function findOrdenes (){
        setOrdenes(await getOrdenes())
    }
    
    const headings = [ "Serie", "Folio", "Fecha", "Naviera", "Contenedor", "Booking / BL","Consignatario", "Sello", "Operador", "Ruta", 
    "Tipo de Servicio", "Unidad", "Placas", "Status"]
    
    const filters = [ "Serie", "Folio", "Fecha", "Contenedor", "Booking", "Sello","Ruta", 
    "Tipo de Servicio", "Status"]

    return(
        <>
            <h1 className="title">Ordenes de Servicio</h1>
            <SearchBar filters={filters} model="orden" function={setOrdenes}/>
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
                        {ordenes.map(orden=>{
                            return(
                                <tr key={`${orden.serie} ${orden.folio}`} className="row">
                                    <td className="pointer" onClick={()=>{openOrden(orden.serie, orden.folio)}}>Abrir</td>
                                    <td>{orden.serie}</td>
                                    <td>{orden.folio}</td>
                                    <td>{orden.fecha.split('T')[0]}</td>
                                    <td>{orden.naviera.razon_social}</td>
                                    <td>{orden.contenedor}</td>
                                    <td>{orden.booking}</td>
                                    <td>{orden.consignatario.razon_social}</td>
                                    <td>{orden.sello}</td>
                                    <td>{orden.operador.nombres} {orden.operador.primer_apellido} {orden.operador.segundo_apellido}</td>
                                    <td>{orden.ruta}</td>
                                    <td>{orden.tipo_servicio}</td>
                                    <td>{orden.unidad.clave}</td>
                                    <td>{orden.unidad.placas}</td>
                                    <td>{orden.estatus}</td>
                                    <td onClick={async ()=> {await deleteOrden(orden.serie, orden.folio); findOrdenes()}} className="delete pointer">Eliminar</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div onClick={()=>{newOrden()}} className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Nueva Orden</span>
            </div>
        </>
    )
}

export default OrdenesFrame