import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {updateNaviera, getSingleNaviera} from '../../Useful Functions/Naviera'

export default function NavieraEdit(){

    const {search} = useLocation()
    const searchParamas = new URLSearchParams(search)
    const clave = searchParamas.get('clave')

    const [naviera, setNaviera] = useState([])
    
    useEffect(()=>{
        findNaviera()
    },[])

    async function findNaviera(){
        setNaviera([await getSingleNaviera(clave)])
    }

    function submit(e){
        e.preventDefault()
        const newNaviera = {
            clave: naviera[0].clave,
            razon_social: document.getElementById('razon_social').value,
            rfc: document.getElementById('rfc').value,
            telefono: document.getElementById('telefono').value,
            domicilio: document.getElementById('domicilio').value,
        }
        updateNaviera(newNaviera)
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
