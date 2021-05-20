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

    // function openOrden(serie, folio){
    //     ipcRenderer.sendSync('create-window',
    //         ({
    //             width:1200, 
    //             height:820, 
    //             url: `${process.env.REACT_APP_URL}/orden?serie=${serie}&folio=${folio}&mode=edit`
    //         })
    //     )
    // }

    // function newOrden(){
    //     ipcRenderer.sendSync('create-window',
    //         ({
    //             width:1200, 
    //             height:820, 
    //             url: `${process.env.REACT_APP_URL}/orden?mode=new`
    //         })
    //     )
    // }
    
    
    const headings = [ "Serie", "Folio", "Fecha", "Naviera", "Contenedor", "Booking / BL","Consignatario", "Sello", "Operador", "Ruta", 
    "Tipos de Servicio", "Unidad", "Placas", "Flete", "Maniobra", "Almacenaje","Reexpedicion",
    "Dif Km.", "Subtotal", "I.V.A.", "Retencion", "Total", "Status"]
    
    return(
        <>
            <h1 className="title">Ordenes de Servicio</h1>
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
                                    <td>{orden.flete}</td>
                                    <td>{orden.maniobra}</td>
                                    <td>{orden.almacenaje}</td>
                                    <td>{orden.reexpedicion}</td>
                                    <td>{orden.dif_kilometraje}</td>
                                    <td>{orden.subtotal}</td>
                                    <td>{orden.iva}</td>
                                    <td>{orden.retencion}</td>
                                    <td>{orden.total}</td>
                                    <td>{orden.estatus}</td>
                                    <td onClick={async ()=> {await deleteOrden(orden.serie, orden.folio); findOrdenes()}} className="delete pointer">Borrar</td>
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