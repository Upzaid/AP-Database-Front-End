import React, {useState, useEffect} from 'react'

const { ipcRenderer } = window.require('electron')

export default function FacturaNew(){
    const [clientes, setClientes] = useState([])
    const [latest, setLatest] = useState()
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
            const response = await fetch(`${localStorage.getItem('server-url')}/orden/find/${serie}/${folio}`,{
                headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            })
            
            if (response.status === 200){
                const ordenesArray = [...ordenes]
                const orden = await response.json()
                
                function ordenCompare(element){
                    if (element.serie === orden.serie && element.folio === orden.folio) return true
                }

                if (ordenesArray.find(ordenCompare)){
                    return ipcRenderer.sendSync('alert', 'Orden duplicada')
                }else {
                    ordenesArray.push({serie: orden.serie, folio: orden.folio})
                    return setOrdenes(ordenesArray);
                }
            }else if (response.status === 202){
                return ipcRenderer.sendSync('alert', await response.json())
            }
            return ipcRenderer.sendSync('alert', "Error!")
        } catch (error) {
            return console.log(error);
        }
    }

    function removeOrden(orden){
        const ordenesArray = [...ordenes]
        
        function ordenCompare(element){
           return orden.serie === element.serie && orden.folio === element.folio
        }

        if (ordenesArray.findIndex(ordenCompare) > -1){
            ordenesArray.splice(ordenesArray.findIndex(ordenCompare), 1)
        }
        setOrdenes(ordenesArray)
        
    }

    async function submit(e){
        e.preventDefault()
        const result = ipcRenderer.sendSync('confirm','¿Desea guardar los cambios?')
        if (!result) return
        
        const factura ={
            serie : document.getElementById('serie').value,
            folio : document.getElementById('folio').value,
            fecha : document.getElementById('fecha').value,
            receptor : document.getElementById('receptor').value,
            ordenes: ordenes,
            total : document.getElementById('total').value,      
        }
        
        const response = await fetch(`${localStorage.getItem('server-url')}/factura/create`,{
            method: 'POST',
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(factura)
        })

        if (response.status === 200){
            ipcRenderer.sendSync('alert', await response.json())
            return window.location.replace('/factura')
        }else if (response.status === 202){
            return ipcRenderer.sendSync('alert',(await response.json()).join('\n'))
        }
        return ipcRenderer.sendSync('alert', 'Error!')
    }

    return(
        <div className="login">
            <h1 className="title">Nueva Factura</h1>
            <form onSubmit={(e)=> submit(e)}>
                <label >Serie:</label>
                <input type="text" id="serie" required defaultValue={latest ? latest.serie : null}/>
                <label >Folio:</label>
                <input type="number" id="folio" required defaultValue={latest ? latest.folio + 1 : null}/>
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
                    <br /> <br />
                    <table>
                        <thead>
                            <tr>
                                <th>Serie</th>
                                <th>Folio</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.map(orden=>{
                                return(
                                    <tr key={`${orden.serie} ${orden.folio}`} className="row">
                                        <td>{orden.serie}</td>
                                        <td>{orden.folio}</td>
                                        <td onClick={()=> removeOrden(orden)} className="delete pointer">Remover</td>
                                    </tr>
                                    )
                            })}
                        </tbody>
                    </table>
                    <br />
                </div>
                <label >Total:</label>
                <input required type="number" id="total" step="0.01"/>
                <button className="btn" type="submit">Guardar</button>
            </form>
        </div>
    )
}