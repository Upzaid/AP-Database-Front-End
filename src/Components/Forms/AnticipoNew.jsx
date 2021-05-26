import React, {useState, useEffect} from 'react'
import {getPersonal} from '../../Useful Functions/Personal'
import {latestAnticipo, createAnticipo} from '../../Useful Functions/Anticipo'

export default function AnticipoNew(){
    
    const [personal, setPersonal] = useState([])
    const [latest, setLatest] = useState([])

    useEffect(()=>{
       findPersonal()
       getLatest()
    },[])

    async function findPersonal(){
        setPersonal(await getPersonal())
    }

    async function getLatest(){
        setLatest(await latestAnticipo())
    }

    function fillPersonalClave(){
        document.getElementById('clave').value = document.getElementById('personal').value
    }

    function fillPersonal(){
        const {options} = document.getElementById('personal')
        const {value} = document.getElementById('clave')
        for (let i = 0; i < options.length; i++){
            if(options[i].value == value){
                document.getElementById('personal').selectedIndex = i
                break
            }else{
                document.getElementById('personal').selectedIndex = 0
            }
        }
    }

    function submit(e){
        e.preventDefault()
        const anticipo ={
            fecha: document.getElementById('fecha').value,
            serie: document.getElementById('serie').value,
            folio: document.getElementById('folio').value,
            personal: document.getElementById('clave').value,
            concepto: document.getElementById('concepto').value,
            importe: document.getElementById('importe').value,
        }
      
        createAnticipo(anticipo)
    }

    return(
        <div className="login">
            <h1 className="title">Nuevo Anticipo</h1>
            <form className="form" onSubmit={(e)=> submit(e)}>
                <label>Serie:</label>
                <input type="text" id="serie" defaultValue={latest ? latest.serie : null} required/>
                <label>Folio:</label>
                <input type="number" id="folio" defaultValue={latest.folio ? latest.folio + 1 : null} required/>
                <br/>
                <label htmlFor="">Fecha: </label>
                <input id="fecha" type="date" required defaultValue={new Date().toISOString().split('T')[0]}/>
                <br/>
                <label htmlFor="">Personal: </label>
                <div>
                    <input id="clave" type="number" onChange={()=> fillPersonal()} required/>
                    <select id="personal" onChange={()=> fillPersonalClave()} required>
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
                <input type="number"  id="importe" step="0.01" required/>
                <br/>
                <button className="btn" type="submit">Guardar</button>
            </form>
        </div>
    )
}