import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

const {ipcRenderer} = window.require('electron')

export default function UnidadEdit(){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const clave = searchParams.get('clave')

    const [unidad, setUnidad] =useState([])

    useEffect(()=>{
        getUnidad()
    },[])

    async function getUnidad(){
        const response = await fetch(`${localStorage.getItem('server-url')}/unidad/find/${clave}`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            })
        setUnidad(await response.json());
    }

    async function submit(e){
        e.preventDefault()
        const result = ipcRenderer.sendSync('confirm','¿Desea guardar los cambios?')
        if (!result) return
        
        const unidad = {
            clave: clave,
            modelo: document.getElementById('modelo').value,
            motor: document.getElementById('motor').value,
            placas: document.getElementById('placas').value,
            niv: document.getElementById('niv').value,
            descripcion: document.getElementById('descripcion').value,
        }
        
        try {
            const response = await fetch(`${localStorage.getItem('server-url')}/unidad/edit`,{
                method: 'PUT',
                headers : {
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify(unidad)
                })
            if (response.status === 200){
                ipcRenderer.sendSync('alert', await response.json())
                return window.location.replace('/unidad')
            }else if (response.status === 202){
                return ipcRenderer.sendSync('alert',(await response.json()).join('\n'))
            }else{
            return ipcRenderer.sendSync('alert', 'Error!')
            }
        } catch (error) {
            return ipcRenderer.sendSync('alert', 'Error!')
        }
    }

    return(
        <div className="login">
        <h1 className="title">Unidad {clave}</h1>
        <form className="form">
            <label>Modelo:</label>
            <input type="text" id="modelo" required defaultValue={unidad.modelo}/>
            <label>Motor:</label>
            <input type="text" id="motor" required defaultValue={unidad.motor}/>
            <label>Placas:</label>
            <input type="text" id="placas" required defaultValue={unidad.placas}/>
            <label>N.I.V.:</label>
            <input type="text" id="niv" required defaultValue={unidad.niv}/>
            <label>Descripcion:</label>
            <textarea id="descripcion" cols="30" rows="10" required defaultValue={unidad.descripcion}></textarea>
            <br />
            <button onClick={(e)=>submit(e)} className="btn">Guardar</button>
        </form>
    </div>
    )
}