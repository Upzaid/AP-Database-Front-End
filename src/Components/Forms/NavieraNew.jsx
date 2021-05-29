import React, {useState, useEffect} from 'react'
import {createNaviera, latestNaviera} from '../../Useful Functions/Naviera'

export default function NavieraNew(){
    
    const [latest, setLatest] = useState()

    useEffect(()=>{
        getLatest()
    },[])

    async function getLatest(){
        setLatest(await latestNaviera())
    }

    function submit(e){
        e.preventDefault()
        const naviera = {
            clave: document.getElementById('clave').value,
            razon_social: document.getElementById('razon_social').value,
            rfc: document.getElementById('rfc').value,
            telefono: document.getElementById('telefono').value,
            domicilio: document.getElementById('domicilio').value,
        }
        createNaviera(naviera)
    }

    return(
        <div className="login">
            <h1 className="title">Nueva Naviera</h1>
            <form onSubmit={(e)=>submit(e)} >
                <label >Clave:</label>
                <input type="number" id="clave" defaultValue={latest ? latest.clave + 1 : null} required/>
                <br />
                <label >Razon Social:</label>
                <input type="text" id="razon_social" required/>
                <br />
                <label >R.F.C.:</label>
                <input type="text" id="rfc" required/>
                <br />
                <label >Telefono:</label>
                <input type="text" id="telefono" />
                <br />
                <label >Domicilio:</label>
                <textarea id="domicilio" cols="30" rows="10"></textarea>
                <br />
                <button className="btn" type="submit">Guardar</button>
            </form>
        </div>
    )
}