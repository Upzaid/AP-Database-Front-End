import React, {useEffect, useState} from 'react'

const {ipcRenderer} = window.require('electron')

export default function MantenimientoNew(){

    const [latest, setLatest] = useState([])

    useEffect(()=>{
        getLatest()
    }, [])

    async function getLatest(){
        const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/latest`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                }
        })
        setLatest(await response.json())
    }

    async function submit(e){
        e.preventDefault()
        const result = ipcRenderer.sendSync('confirm', '¿Desea guardar los cambios?')
        if(!result) return

        const mantenimiento ={
            folio : document.getElementById('folio').value,
            fecha_inicio: document.getElementById('fecha_inicio').value,
            fecha_cierre: document.getElementById('fecha_cierre').value,
            unidad: document.getElementById('unidad').value,
            ubicacion: document.getElementById('ubicacion').value,
            descripcion: document.getElementById('descripcion').value,
            costo: document.getElementById('costo').value,
        }

        const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/create`,{
            method: 'POST',
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(mantenimiento)
        })

        if (response.status === 200){
            return ipcRenderer.sendSync('alert', await response.json())
        }else if (response.status === 202){
            return ipcRenderer.sendSync('alert',(await response.json()).join('\n'))
        }
        return ipcRenderer.sendSync('alert', 'Error!')
    }

    return(
        <div className="login">
            <h1 className="title">Nueva Orden de Mantenimiento</h1>
            <form onSubmit={(e)=>{submit(e)}}>
                <label >Folio:</label>
                <input type="number" id="folio" required defaultValue={latest.folio ? latest.folio + 1: null}/>
                <br />
                <label >Fecha de Inicio:</label>
                <input type="date" id="fecha_inicio" required defaultValue={ new Date().toISOString().split('T')[0]}/>
                <br />
                <label >Fecha de Cierre:</label>
                <input type="date" id="fecha_cierre" />
                <br />
                <label >Unidad:</label>
                <input type="number" id="unidad" />
                <br />
                <label >Ubicacion:</label>
                <input type="text" id="ubicacion" />
                <br />
                <label >Descripcion:</label>
                <textarea id="descripcion" cols="30" rows="5"></textarea>
                <br />
                <label >Importe:</label>
                <input type="number" step="0.01" id="costo" />
                <br />
                <button type="submit" className="btn">Guardar</button>
            </form>

        </div>
    )
}