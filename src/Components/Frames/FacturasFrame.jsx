import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'

const {ipcRenderer} = window.require('electron')

function FacturasFrame (){
    useEffect(()=>{
        getFacturas()
    },[])

    const[facturas, setFacturas] =useState([])
    
    const headings =["Serie","Folio", "Fecha", "Receptor", "Importe"]

    async function getFacturas(){
        const response = await fetch(`${localStorage.getItem('server-url')}/factura/list`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setFacturas(await response.json());
    }

    async function deleteFactura(serie, folio){
        const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar la liquidacion ${folio}?`)
        
        if (!result) return

        const response = await fetch(`${localStorage.getItem('server-url')}/factura/delete`,{
            method: 'DELETE',
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({serie ,folio})
        })
        
        ipcRenderer.sendSync('alert', await response.json())
        getFacturas()
    }

    function newFactura(){
        ipcRenderer.sendSync('create-window',({
            width:500, 
            height:700, 
            url: `${process.env.REACT_APP_URL}/factura?mode=new`
        }))
    }

    function openFactura(serie, folio){
        ipcRenderer.sendSync('create-window',({
            width:500, 
            height:700, 
            url: `${process.env.REACT_APP_URL}/factura?serie=${serie}&folio=${folio}&mode=edit`
        }))
    }

    return(
        <>
            <h1 className="title">Facturas</h1>
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
                    {facturas.map(factura=>{
                        return(
                            <tr key={`${factura.serie} ${factura.folio}`} className="row">
                                <td onClick={()=> openFactura(factura.serie, factura.folio)} className="pointer">Abrir</td>
                                <td>{factura.serie}</td>
                                <td>{factura.folio}</td>
                                <td>{factura.fecha.split('T')[0]}</td>
                                <td>{factura.receptor.razon_social}</td>
                                <td>{factura.total}</td>
                                <td onClick={()=> deleteFactura(factura.serie, factura.folio)} className="pointer delete">Borrar</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div onClick={()=> newFactura()} className="button new ">
                    <img src={Nuevo} alt=""/>
                    <span>Nueva Factura</span>
            </div>
        </>
    )
}

export default FacturasFrame