import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

export default function NavieraEdit(){

    const {search} = useLocation()
    const searchParamas = new URLSearchParams(search)
    const clave = searchParamas.get('clave')

    const [naviera, setNaviera] = useState([])
    
    useEffect(()=>{
        getNaviera()
    },[])

    async function getNaviera(){
        const response = await fetch(`${localStorage.getItem('server-url')}/naviera/find/${clave}`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setNaviera([await response.json()])
    }

    async function submit(e){
        e.preventDefault()
        const result = window.confirm('¿Desea guardar los cambios?')
        if(!result) return 

        const newNaviera = {
            clave: naviera[0].clave,
            razon_social: document.getElementById('razon_social').value,
            rfc: document.getElementById('rfc').value,
            telefono: document.getElementById('telefono').value,
            domicilio: document.getElementById('domicilio').value,
        }

        const response = await fetch(`${localStorage.getItem('server-url')}/naviera/edit`,{
            method: 'PUT',
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(newNaviera)
            })
        if (response.status < 300) {
            return alert(await response.json())
        }else return alert('Error!')
    }

    return(
        <>
        {naviera.map(naviera =>{
            return(
            <div className="login">
               <h1 className="title">Naviera {clave}</h1>
               <form onSubmit={(e)=>submit(e)} >
                   <label >Razon Social:</label>
                   <input type="text" id="razon_social" required defaultValue={naviera.razon_social}/>
                   <br />
                   <label >R.F.C.:</label>
                   <input type="text" id="rfc" required defaultValue={naviera.rfc}/>
                   <br />
                   <label >Telefono:</label>
                   <input type="text" id="telefono" required defaultValue={naviera.telefono}/>
                   <br />
                   <label >Domicilio:</label>
                   <textarea id="domicilio" cols="30" rows="10" required defaultValue={naviera.domicilio}></textarea>
                   <br />
                   <button className="btn" type="submit">Guardar</button>
               </form>
            </div>
            )
        })}
        </>
    )
}
