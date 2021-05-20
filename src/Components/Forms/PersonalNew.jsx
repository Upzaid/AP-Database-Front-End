import React, {useState, useEffect} from 'react'
import {createPersonal, latestPersonal} from '../../Useful Functions/Personal'

export default function PersonalNew(){
    
    useEffect(()=>{
        getLatest()
    },[])

    const [latest, setLatest] = useState()
    
    async function getLatest(){
        setLatest(await latestPersonal())
    }

    function submit(e){
        e.preventDefault()
        const personal = {
            clave: document.getElementById('clave').value,
            nombres: document.getElementById('nombres').value,
            primer_apellido: document.getElementById('primer_apellido').value,
            segundo_apellido: document.getElementById('segundo_apellido').value,
            rfc: document.getElementById('rfc').value,
            imss: document.getElementById('imss').value,
            identificacion: document.getElementById('identificacion').value,
            licencia: document.getElementById('licencia').value,
            fecha_alta: document.getElementById('fecha_alta').value,
            telefono: document.getElementById('telefono').value,
        }
        createPersonal(personal)
    }

    return(
        <div className="login">
            <h1 className="title">Nuevo Personal</h1>
            <form className="form" onSubmit={(e)=> submit(e)}>
                <label>Clave:</label>
                <input type="number" id="clave" required defaultValue={latest ? latest.clave + 1: null}/>
                
                <label>Nombre(s):</label>
                <input type="text" id="nombres" required/>
                <label>Primer apellido:</label>
                <input type="text" id="primer_apellido" required/>
                <label>Segundo apellido:</label>
                <input type="text" id="segundo_apellido" required/>
                <label >Telefono:</label>
                <input type="text" id="telefono" />
                
                <label >R.F.C.:</label>
                <input type="text" id="rfc" required/>
                <label >IMSS:</label>
                <input type="text" id="imss" />
                <label >Identificacion:</label>
                <input type="text" id="identificacion" required/>
                <label >Licencia:</label>
                <input type="text" id="licencia" />
               
                <label >Fecha de alta:</label>
                <input type="date" id="fecha_alta" required defaultValue={new Date().toISOString().split('T')[0]}/>
                <label >Fecha de baja:</label>
                <input type="date" id="fecha_baja" />
                <br />
                <button className="btn">Guardar</button>
            </form>
        </div>
    )
}