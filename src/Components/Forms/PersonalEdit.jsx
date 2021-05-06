import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

function PersonalEdit (){

    useEffect(()=>{
        findPersonal()
    },[])

    const [personal, setPersonal] = useState([])

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const clave = searchParams.get('clave')

    async function findPersonal(){
        const response = await fetch(`${localStorage.getItem('server-url')}/personal/find/${clave}`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setPersonal([await response.json()])
    }

    async function submit(e){
        e.preventDefault()
        const result = window.confirm('¿Desea guardar los cambios?')
        if(!result) return
        
        const newPersonal = {
            clave: personal[0].clave,
            nombres: document.getElementById('nombres').value,
            primer_apellido: document.getElementById('primer_apellido').value,
            segundo_apellido: document.getElementById('segundo_apellido').value,
            telefono: document.getElementById('telefono').value,
            rfc: document.getElementById('rfc').value,
            identificacion: document.getElementById('identificacion').value,
            licencia: document.getElementById('licencia').value,
            fecha_alta: document.getElementById('fecha_alta').value,
            fecha_baja: document.getElementById('fecha_baja').value
        }
        
        const response = await fetch(`${localStorage.getItem('server-url')}/personal/edit`,{
            method: 'PUT',
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(newPersonal)
            })
        
        if (response.status < 300) return alert('Personal actualizado exitosamente')
        return alert('Error!')
    }

    return(
        <>
            {personal.map(personal=>{
                return(
                    <div className="login">
                    <h1 className="title">Editar Personal {personal.clave}</h1>
                        <form className="form" onSubmit={(e)=> submit(e)}>
                
                            <label>Nombre(s):</label>
                            <input type="text" id="nombres" required defaultValue={personal.nombres}/>
                            <label>Primer apellido:</label>
                            <input type="text" id="primer_apellido" required defaultValue={personal.primer_apellido}/>
                            <label>Segundo apellido:</label>
                            <input type="text" id="segundo_apellido" required defaultValue={personal.segundo_apellido}/>
                            <label >Telefono:</label>
                            <input type="text" id="telefono" defaultValue={personal.telefono}/>
                            
                            <label >R.F.C.:</label>
                            <input type="text" id="rfc" required defaultValue={personal.rfc}/>
                            <label >IMSS:</label>
                            <input type="text" id="imss"  defaultValue={personal.imss}/>
                            <label >No. de Identificacion:</label>
                            <input type="text" id="identificacion" required defaultValue={personal.identificacion}/>
                            <label >Licencia:</label>
                            <input type="text" id="licencia" defaultValue={personal.licencia}/>
                        
                            <label >Fecha de alta:</label>
                            <input type="date" id="fecha_alta" required defaultValue={personal.fecha_alta.split('T')[0]}/>
                            <label >Fecha de baja:</label>
                            <input type="date" id="fecha_baja" defaultValue={personal.fecha_baja ? personal.fecha_baja.split('T')[0] : null}/>
                            <br />
                            <button className="btn">Guardar</button>
                        </form>
                    </div>
                )
            })}
        </>
    )
}

export default PersonalEdit