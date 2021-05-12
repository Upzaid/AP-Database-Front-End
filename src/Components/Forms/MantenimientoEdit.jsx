import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

const {ipcRenderer} = window.require('electron')

export default function MantenimientoEdit(){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const folio = searchParams.get('folio')

    const [mantenimiento, setMantenimiento] = useState([])

    useEffect(()=>{
        getMantenimiento()
    }, [])

    async function getMantenimiento(){
        const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/find/${folio}`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
       setMantenimiento([await response.json()]);
    }

    async function submit(e){
        e.preventDefault()
        const result = ipcRenderer.sendSync('confirm', '¿Desea guardar los cambios?')
        if(!result) return

        const mantenimiento ={
            folio : folio,
            fecha_inicio: document.getElementById('fecha_inicio').value,
            fecha_cierre: document.getElementById('fecha_cierre').value,
            unidad: document.getElementById('unidad').value,
            ubicacion: document.getElementById('ubicacion').value,
            descripcion: document.getElementById('descripcion').value,
            costo: document.getElementById('costo').value,
        }

        const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/edit`,{
            method: 'PUT',
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
            <h1 className="title">Mantenimiento {folio}</h1>
            {mantenimiento.map(orden =>{
                return(
                    <form onSubmit={(e)=>{submit(e)}}>
                        <label >Fecha de Inicio:</label>
                        <input type="date" id="fecha_inicio" required defaultValue={orden.fecha_inicio.split('T')[0]}/>
                        <br />
                        <label >Fecha de Cierre:</label>
                        <input type="date" id="fecha_cierre" defaultValue={orden.fecha_cierre ? orden.fecha_cierre.split('T')[0] : null} />
                        <br />
                        <label >Unidad:</label>
                        <input type="number" id="unidad" required defaultValue={orden.unidad.clave}/>
                        <br />
                        <label >Ubicacion:</label>
                        <input type="text" id="ubicacion" defaultValue={orden.ubicacion}/>
                        <br />
                        <label >Descripcion:</label>
                        <textarea id="descripcion" cols="30" rows="5" defaultValue={orden.descripcion}></textarea>
                        <br />
                        <label >Importe:</label>
                        <input type="number" step="0.01" id="costo" defaultValue={orden.costo}/>
                        <br />
                        <button type="submit" className="btn">Guardar</button>
                    </form>
                )
            })}
        </div>
    )
}