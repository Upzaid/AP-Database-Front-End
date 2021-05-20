import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {getClientes, newCliente, openCliente, deleteCliente} from '../../Useful Functions/Cliente'

function ClientesFrame (){
    useEffect(()=>{
        findClientes()
    },[])

    const[clientes, setClientes] =useState([[1,2,3]])
    const headings =["Clave", "Razon Social", "R.F.C.", "Direccion"]
    
    async function findClientes(){
        setClientes(await getClientes())
    }

    return(
        <>
            <h1 className="title">Clientes</h1>
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
                        {clientes.map(cliente=>{
                            return(
                                <tr key={cliente.clave} className="row">
                                    <td onClick={()=> openCliente(cliente.clave)} className="pointer">Abrir</td>
                                    <td>{cliente.clave}</td>
                                    <td>{cliente.razon_social}</td>
                                    <td>{cliente.rfc}</td>
                                    <td>{cliente.domicilio}</td>
                                    <td onClick={async ()=>{await deleteCliente(cliente.clave); findClientes()}} className="pointer delete">Borrar</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div onClick={()=>{newCliente()}} className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Nuevo Cliente</span>
           </div>
        </>
    )
}

export default ClientesFrame