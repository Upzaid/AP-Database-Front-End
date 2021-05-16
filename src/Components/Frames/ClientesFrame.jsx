import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'

const { ipcRenderer } = window.require("electron");

function ClientesFrame (props){
    useEffect(()=>{
        getClientes()
    },[])

    const[clientes, setClientes] =useState([[1,2,3]])
    const headings =["Clave", "Razon Social", "R.F.C.", "Direccion"]
    
    async function getClientes(){
        const response = await fetch(`${localStorage.getItem('server-url')}/cliente/list`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setClientes(await response.json());
    }

    function openCliente(clave){
        ipcRenderer.sendSync('create-window',
            ({
                width:400, 
                height:700, 
                url: `${process.env.REACT_APP_URL}/cliente?clave=${clave}&mode=edit`
            })
        )
    }
    
    function newCliente(){
        ipcRenderer.sendSync('create-window',
            ({
                width:400, 
                height:700, 
                url: `${process.env.REACT_APP_URL}/cliente`
            })
        )
    }

    return(
        <>
            <h1 className="title">Clientes</h1>
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
                    {clientes.map(cliente=>{
                        return(
                            <tr className="row">
                                <td onClick={()=> openCliente(cliente.clave)} className="pointer">Abrir</td>
                                <td>{cliente.clave}</td>
                                <td>{cliente.razon_social}</td>
                                <td>{cliente.rfc}</td>
                                <td>{cliente.domicilio}</td>
                                <td className="pointer delete">Borrar</td>
                            </tr>
                        )
                    })}
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