import React, {useState, useEffect} from 'react'
const { ipcRenderer } = window.require('electron')

export default function FacturaNew(){
    const [clientes, setClientes] = useState([])
    const [latest, setLatest] = useState([])
    const [ordenes, setOrdenes] = useState([])

    useEffect(()=>{
        getLatest()
        getClientes()
    },[])

    async function getClientes(){
        const response = await fetch(`${localStorage.getItem('server-url')}/cliente/list`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setClientes(await response.json());
    }

    async function getLatest(){
        const response = await fetch(`${localStorage.getItem('server-url')}/factura/latest`,{
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setLatest(await response.json())
    }

    function fillClaveReceptor (){
        const {value} = document.getElementById('receptor-select')
        document.getElementById('receptor').value = value
    }

    function fillReceptor(){
        const {options} = document.getElementById('receptor-select')
        const {value} = document.getElementById('receptor')
        for (let i = 0; i < options.length; i++){
            if (value === options[i].value){
                document.getElementById('receptor-select').selectedIndex = i
                break
            }else{
                document.getElementById('receptor-select').selectedIndex = 0
            }
        }
    }

    async function getOrden(){
        const serie = document.getElementById('sre').value
        const folio = document.getElementById('flo').value
        try {
            const response = await fetch(`${localStorage.getItem('server-url')}/factura/find/${serie}/${folio}`,{
                headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            })
            
            const ordenesArray = ordenes
            ordenesArray.push(await response.json())
            setOrdenes(ordenesArray);
            

        } catch (error) {
            return console.log(error);
        }
      

    }

    function removeOrden(){

    }

    function submit(e){
        e.preventDefault()
        const result = window.confirm('¿Desea guardar los cambios?')
        if (!result) return
        const factura ={
            serie : document.getElementById('serie'),
            folio : document.getElementById('folio'),
            fecha : document.getElementById('fecha'),
            receptor : document.getElementById('receptor'),
            total : document.getElementById('total'),
        }
    }

    return(
        
        <div className="login">
            <h1 className="title">Nueva Factura</h1>
            <form >
                <label >Serie:</label>
                <input type="text" id="serie" required defaultValue={latest ? latest.serie : null}/>
                <label >Folio:</label>
                <input type="number" id="folio" required defaultValue={latest.folio ? latest.folio + 1 : null}/>
                <label >Fecha:</label>
                <input type="date" id="fecha" required defaultValue={new Date().toISOString().split('T')[0]}/>
                <label >Receptor:</label>
                <input onChange={()=> fillReceptor()} required type="number" id="receptor"/>
                <select onChange={()=> fillClaveReceptor()} required id="receptor-select">
                    <option ></option>
                    {clientes.map(cliente=>{
                        return(
                            <option value={cliente.clave}>{cliente.razon_social}</option>
                        )
                    })}
                </select>
                <div>
                    <label >Ordenes:</label>
                    <br />
                    <label >Serie:</label>
                    <input type="text" id="sre"/>
                    <label >Folio:</label>
                    <input type="number" id="flo"/>
                    <button onClick={()=> getOrden()} type="button" className="btn">+</button>
                    <table>
                        <tr>
                            <th>Fecha</th>
                            <th>Serie</th>
                            <th>Folio</th>
                            <th></th>
                        </tr>
                        {ordenes.map(orden=>{
                            return(
                                <tr className="row">
                                    <td>{orden.fecha}</td>
                                    <td>{orden.serie}</td>
                                    <td>{orden.folio}</td>
                                    <td className="delete">Remover</td>
                                </tr>
                                )
                        })}
                    </table>
                </div>
                <label >Total:</label>
                <input required type="number" id="total" step="0.01"/>
                <button className="btn" type="submit">Guardar</button>
            </form>
        </div>
       
    )
}