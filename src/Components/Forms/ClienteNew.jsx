import React, {useState, useEffect} from 'react'

export default function ClienteNew(){
    
    const [latest, setLatest] = useState()

    useEffect(()=>{
        getLatest()
    },[])

    async function getLatest(){
        const response = await fetch(`${localStorage.getItem('server-url')}/cliente/latest`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setLatest(await response.json())
    }

    async function submit(e){
        e.preventDefault()
        const result = window.confirm('¿Desea guardar los cambios?')
        if(!result) return 

        const naviera = {
            clave: document.getElementById('clave').value,
            razon_social: document.getElementById('razon_social').value,
            rfc: document.getElementById('rfc').value,
            telefono: document.getElementById('telefono').value,
            domicilio: document.getElementById('domicilio').value,
        }

        const response = await fetch(`${localStorage.getItem('server-url')}/cliente/create`,{
            method: 'POST',
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(naviera)
            })
        if (response.status < 300) {
            alert(await response.json())
            return window.location.replace('/cliente')
        }else return alert('Error!')
        
    }

    return(
        <div className="login">
            <h1 className="title">Nuevo Cliente</h1>
            <form onSubmit={(e)=>submit(e)} >
                <label >Clave:</label>
                <input type="number" id="clave" defaultValue={latest? latest.clave + 1 : null} required/>
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