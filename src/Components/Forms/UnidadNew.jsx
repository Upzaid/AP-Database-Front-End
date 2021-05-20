import React from 'react'
import {createUnidad} from '../../Useful Functions/Unidad'

export default function UnidadNew(){

    function submit(e){
        e.preventDefault()
        const unidad = {
            clave: document.getElementById('clave').value,
            modelo: document.getElementById('modelo').value,
            motor: document.getElementById('motor').value,
            placas: document.getElementById('placas').value,
            niv: document.getElementById('niv').value,
            descripcion: document.getElementById('descripcion').value,
        }
        createUnidad(unidad)
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