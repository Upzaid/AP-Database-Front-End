import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {updateAnticipo, getSingleAnticipo} from '../../Useful Functions/Anticipo'
import {getPersonal, newPersonal, updatePersonal} from '../../Useful Functions/Personal'

export default function AnticipoEdit(){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const serie = searchParams.get('serie')
    const folio = searchParams.get('folio')

    const [anticipo, setAnticipo] = useState([])
    const [personal, setPersonal] = useState([])

    useEffect(()=>{
        findAnticipo()
        findPersonal()
        console.log(anticipo);

    },[])

    useEffect(()=>{
        if(anticipo.length >0){
            setPersonalSelectDefault()
        }
    }, [anticipo])

    async function findPersonal(){
        setPersonal(await getPersonal())
    }
   
    async function findAnticipo(){
        setAnticipo([await getSingleAnticipo(serie, folio)])
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

    function setPersonalSelectDefault(){
        document.getElementById('clave').value = anticipo[0].personal.clave
        const {options} = document.getElementById('personal')
        
        for (let i = 0; i < options.length; i++){
            if(options[i].value == anticipo[0].personal.clave){
                document.getElementById('personal').selectedIndex = i
                break
            }else{
                document.getElementById('personal').selectedIndex = 0
            }
        }
    }

    function submit(e){
        e.preventDefault()
        const newAnticipo = {
            serie,
            folio,
            fecha: document.getElementById('fecha').value,
            personal: document.getElementById('clave').value,
            concepto: document.getElementById('concepto').value,
            importe: document.getElementById('importe').value,
        }
        
        updateAnticipo(newAnticipo)
    }

    return(
        <div className="login">
            <h1 className="title">Anticpo {serie} - {folio}</h1>
            {anticipo.map(anticipo =>{
                return(
                    <form key={anticipo.serie} onSubmit={(e)=> submit(e)}>
                        <label>Serie:</label>
                        <label htmlFor="">Fecha: </label>
                        <input id="fecha" type="date" required defaultValue={anticipo.fecha.split('T')[0]}/>
                        <br/>
                        <label htmlFor="">Personal: </label>
                        <div>
                            <input id="clave" type="number" onChange={()=> fillPersonal()}  required/>
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
                        <input type="text"  id="concepto" defaultValue={anticipo.concepto} required/>
                        <br/>
                        <label htmlFor="">Importe:</label>
                        <input type="number"  id="importe" step="0.01" defaultValue={anticipo.importe} required/>
                        <br/>
                        <button className="btn" type="submit">Guardar</button>
                    </form>
                )
            })}
            
        </div>
    )
}