import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {updateUnidad, getSingleUnidad} from '../../Useful Functions/Unidad'

export default function UnidadEdit(){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const clave = searchParams.get('clave')

    const [unidad, setUnidad] =useState([])

    useEffect(()=>{
        findUnidad()
    },[])

    async function findUnidad(){
        setUnidad(await getSingleUnidad(clave));
    }

    function submit(e){
        e.preventDefault()
        const newUnidad = {
            clave: clave,
            modelo: document.getElementById('modelo').value,
            motor: document.getElementById('motor').value,
            placas: document.getElementById('placas').value,
            niv: document.getElementById('niv').value,
            descripcion: document.getElementById('descripcion').value,
        }
        updateUnidad(newUnidad)
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