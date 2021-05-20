import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {getSingleCliente, updateCliente} from '../../Useful Functions/Cliente'

export default function ClienteEdit(){

    const {search} = useLocation()
    const searchParamas = new URLSearchParams(search)
    const clave = searchParamas.get('clave')

    const [cliente, setCliente] = useState([])
    
    useEffect(()=>{
        findCliente()
    },[])

    async function findCliente(){
        setCliente([await getSingleCliente(clave)])
    }

    function submit(e){
        e.preventDefault()
        const newCliente = {
            clave: cliente[0].clave,
            razon_social: document.getElementById('razon_social').value,
            rfc: document.getElementById('rfc').value,
            telefono: document.getElementById('telefono').value,
            domicilio: document.getElementById('domicilio').value,
        }

        updateCliente(newCliente)
    }

    return(
        <>
        {cliente.map(cliente =>{
            return(
            <div className="login">
               <h1 className="title">Cliente {clave}</h1>
               <form onSubmit={(e)=>submit(e)} >
                   <label >Razon Social:</label>
                   <input type="text" id="razon_social" required defaultValue={cliente.razon_social}/>
                   <br />
                   <label >R.F.C.:</label>
                   <input type="text" id="rfc" required defaultValue={cliente.rfc}/>
                   <br />
                   <label >Telefono:</label>
                   <input type="text" id="telefono" required defaultValue={cliente.telefono}/>
                   <br />
                   <label >Domicilio:</label>
                   <textarea id="domicilio" cols="30" rows="10" required defaultValue={cliente.domicilio}></textarea>
                   <br />
                   <button className="btn" type="submit">Guardar</button>
               </form>
            </div>
            )
        })}
        </>
    )
}
