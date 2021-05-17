import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'

const {ipcRenderer} = window.require('electron')

function UnidadesFrame (props){
    useEffect(()=>{
        getUnidades()
    },[])

    const[unidades, setUnidades] =useState([])
    
    const headings =["No. de Unidad", "Modelo", "Motor", "Placas"]
    
    async function getUnidades(){
        const response = await fetch(`${localStorage.getItem('server-url')}/unidad/list`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setUnidades(await response.json())
    }

    function newUnidad(){
        ipcRenderer.sendSync('create-window',
            ({
                width:400, 
                height:700, 
                url: `${process.env.REACT_APP_URL}/unidad?mode=new`
            })
        )
    }
    
    function openUnidad(clave){
        ipcRenderer.sendSync('create-window',
            ({
                width:400, 
                height:700, 
                url: `${process.env.REACT_APP_URL}/unidad?clave=${clave}&mode=edit`
            })
        )
    }

    async function deleteUnidad(clave){
        const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar la unidad ${clave}?`)
        
        if (!result) return

        const response = await fetch(`${localStorage.getItem('server-url')}/unidad/delete`,{
            method: 'DELETE',
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({clave})
        })
        
        ipcRenderer.sendSync('alert', await response.json())
        getUnidades()
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
                                    <td onClick={()=> deleteUnidad(unidad.clave)} className="pointer delete">Borrar</td>
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