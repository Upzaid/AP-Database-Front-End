import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

export default function Anticipo (){
    
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const serie = searchParams.get('serie')
    const folio = searchParams.get('folio')

    const mode = searchParams.get('mode')
    
    const [anticipo, setAnticipo] = useState([])
    const [personal, setPersonal] = useState([])
    
    const [latestAnticipo, setLatestAnticipo] = useState()

    useEffect(()=>{
        getPersonal()
        if (mode === 'edit'){
            findAnticipo()
        }else{
            getLatest()
        }
    }, [])

    async function submit(e){
        e.preventDefault()
        
        const result = window.confirm('¿Desea guardar los cambios?')
        if(!result) return

        const newAnticipo = {
            fecha: document.getElementById('fecha').value,
            personal: document.getElementById('clave').value,
            concepto: document.getElementById('concepto').value,
            importe: document.getElementById('importe').value,
        }

        if (mode === 'edit'){
            newAnticipo.serie = anticipo[0].serie
            newAnticipo.folio = anticipo[0].folio
             
        }else{
            newAnticipo.serie = document.getElementById('serie').value
            newAnticipo.folio = document.getElementById('folio').value
        }
        
        const options =mode === 'edit'
        ? {
            url:`${localStorage.getItem('server-url')}/anticipo/edit`,
            method: 'PUT'
        }
        : {
            url: `${localStorage.getItem('server-url')}/anticipo/create`,
            method: 'POST'
        }
        
        const response = await fetch(options.url,{
            method: options.method,
            headers : {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
            body: JSON.stringify(newAnticipo),
            })
        
            
        if (response.status < 300) {
            alert(await response.json())
            window.location.replace('/anticipo')
            return 
        }
        return (
            console.log(await response.json())
        )
        
    }

    async function findAnticipo(){
        const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/find/${serie}/${folio}`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setAnticipo([await response.json()])
    }

    async function getPersonal(){
        const response = await fetch(`${localStorage.getItem('server-url')}/personal/list`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setPersonal(await response.json())
    }

    function setClave(){
        const newClave = document.getElementById('personal').value
        document.getElementById('clave').value = newClave
    }

    function findPersonal(){
        const clave = document.getElementById('clave').value
        const personal = document.getElementsByTagName('option')
        let index 
        for(let i = 0; i < personal.length; i++){
            if (personal[i].value === clave) {
                index = i
                break
            }
        }
        document.getElementById('personal').selectedIndex = index
        return index
    }

    async function getLatest(){
        const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/latest`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setLatestAnticipo(await response.json())
    }

    if (mode === 'edit'){
        return(
                <>
                    {anticipo.map(anticipo =>{
                        return(
                            <div key='1' className="login">
                                <h1 className="title">Anticipo {anticipo.serie} - {anticipo.folio}</h1>
                                <form action="" className="form" onSubmit={(e)=>{submit(e)}}>
                                    <label htmlFor="">Fecha: </label>
                                    <input id="fecha" type="date" defaultValue={anticipo.fecha.split('T')[0]} required/>
                                    <br/>
                                    <label htmlFor="">Personal: </label>
                                    <div>
                                        <input id="clave" type="number" name=""  defaultValue={anticipo.personal.clave} onBlur={()=>{findPersonal()}} required/>
                                        <select name="" id="personal" onChange={()=>setClave()} required>
                                            <option value=""></option>
                                            {personal.map(personal=>{
                                                return(
                                                    <option key={personal.clave} value={personal.clave}>{personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <br/>
                                    <label htmlFor="">Concepto:</label>
                                    <input type="text"  id="concepto" defaultValue={anticipo.concepto} required/>
                                    <br/>
                                    <label htmlFor="">Importe:</label>
                                    <input type="number"  id="importe" defaultValue={anticipo.importe} required/>
                                    <br/>
                                    <button className ='btn'>Guardar</button>
                                </form>
                            </div>
                        )
                    })}
                </>
        )
    }
    return(
        <>
            <div className="login">
                <h1 className="title">Nuevo Anticipo</h1>
                <form action="" className="form" onSubmit={(e)=> submit(e)}>
                    <label>Serie:</label>
                    <input type="text" id="serie" defaultValue={latestAnticipo ? latestAnticipo.serie : null} required/>
                    <label>Folio:</label>
                    <input type="number" id="folio" defaultValue={latestAnticipo ? latestAnticipo.folio + 1 : null} required/>
                    <br/>
                    <label htmlFor="">Fecha: </label>
                    <input id="fecha" type="date" required/>
                    <br/>
                    <label htmlFor="">Personal: </label>
                    <div>
                        <input id="clave" type="number" onBlur={()=>{findPersonal()}} required/>
                        <select id="personal" onChange={()=>setClave()} required>
                            <option value=""></option>
                            {personal.map(personal=>{
                                return(
                                    <option key={personal.clave} value={personal.clave}>{personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</option>
                                    )
                                })}
                        </select>
                    </div>
                    <br/>
                    <label htmlFor="">Concepto:</label>
                    <input type="text"  id="concepto"  required/>
                    <br/>
                    <label htmlFor="">Importe:</label>
                    <input type="number"  id="importe" required/>
                    <br/>
                    <button className="btn" type="submit">Guardar</button>
                </form>
            </div>
        </>  
    )      
}
