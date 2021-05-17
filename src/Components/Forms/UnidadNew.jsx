import React, {useEffect, useState} from 'react'

const {ipcRenderer} = window.require('electron')

export default function UnidadNew(){

    async function submit(e){
        e.preventDefault()
        const result = ipcRenderer.sendSync('confirm','¿Desea guardar los cambios?')
        if (!result) return
        
        const unidad = {
            clave: document.getElementById('clave').value,
            modelo: document.getElementById('modelo').value,
            motor: document.getElementById('motor').value,
            placas: document.getElementById('placas').value,
            niv: document.getElementById('niv').value,
            descripcion: document.getElementById('descripcion').value,
        }
        
        try {
            const response = await fetch(`${localStorage.getItem('server-url')}/unidad/create`,{
                method: 'POST',
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
            }else {
                return ipcRenderer.sendSync('alert', 'Error!')
            }
        } catch (error) {
            return ipcRenderer.sendSync('alert', 'Error!')
        }
    }

    return(
        <div className="login">
            <h1 className="title">Unidad New</h1>
            <form className="form">
                <label>Clave:</label>
                <input type="number" id="clave" required/>
                <label>Modelo:</label>
                <input type="text" id="modelo" required/>
                <label>Motor:</label>
                <input type="text" id="motor" required/>
                <label>Placas:</label>
                <input type="text" id="placas"  required/>
                <label>N.I.V.:</label>
                <input type="text" id="niv" required/>
                <label>Descripcion:</label>
                <textarea id="descripcion" cols="30" rows="10" required></textarea>
                <br />
                <button onClick={(e)=>submit(e)} className="btn">Guardar</button>
            </form>
        </div>
    )
}