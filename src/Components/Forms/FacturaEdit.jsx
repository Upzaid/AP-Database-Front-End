import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {getClientes} from '../../Useful Functions/Cliente'
import {updateFactura, getSingleFactura} from '../../Useful Functions/Factura'
import {getSingleOrden, openOrden} from '../../Useful Functions/Orden'

const { ipcRenderer } = window.require('electron')

export default function FacturaEdit (){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const serie = searchParams.get('serie')
    const folio = searchParams.get('folio')

    const [clientes, setClientes] = useState([])
    const [ordenes, setOrdenes] = useState([])
    const [factura, setFactura] = useState([])

    useEffect(()=>{
        getFactura()
        findClientes()
    },[])

    useEffect(()=>{
        if (factura.length > 0) {
            setOrdenes(factura[0].ordenes.map(orden=>{
                return {serie: orden.serie, folio: orden.folio}
            }))
            setReceptor()
            fillStatus()
        }
    },[factura])

    async function getFactura(){
        setFactura([await getSingleFactura(serie, folio)]);
    }

    async function findClientes(){
        setClientes(await getClientes());
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

    function fillStatus(){
        const {options} = document.getElementById('estatus')
        for (let i = 0; i < options.length; i++){
            console.log(options[i], factura[0].estatus);
            if (options[i].value == factura[0].estatus){
                document.getElementById('estatus').selectedIndex = i
                break
            }else {
                document.getElementById('estatus').selectedIndex = 0
            }
        }
    }

    async function addOrden(){
        const serie = document.getElementById('sre').value
        const folio = document.getElementById('flo').value
        const orden = await getSingleOrden(serie, folio)
        
        if (orden){
            const ordenesArray = [...ordenes]
            function ordenCompare(element){
                if (element.serie === orden.serie && element.folio === orden.folio) return true
            }

            if (ordenesArray.find(ordenCompare)){
                return ipcRenderer.sendSync('alert', 'Orden duplicada')
            }else {
                ordenesArray.push({serie: orden.serie, folio: orden.folio})
                return setOrdenes(ordenesArray);
            }
        }else return ipcRenderer.sendSync('alert', 'Orden no existe')
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

    function submit(e){
        e.preventDefault()
        const newFactura ={
            serie : serie,
            folio : folio,
            fecha : document.getElementById('fecha').value,
            receptor : document.getElementById('receptor').value,
            ordenes: ordenes,
            total : document.getElementById('total').value,      
            estatus : document.getElementById('estatus').value,      
        }
        updateFactura(newFactura)
    }

    function setReceptor(){
        const options = document.getElementById('receptor-select').options
        for (let i = 0; i < options.length; i++){
            if(options[i].value == factura[0].receptor.clave){
                document.getElementById('receptor-select').selectedIndex = i
                break
            }
        }
    }

    return(
        <div className="login">
            <h1 className="title">Factura {serie}-{folio}</h1>
            {factura.map(factura =>{
                return(
                    <form key={factura.folio} onSubmit={(e)=> submit(e)}>
                    <label >Fecha:</label>
                    <input type="date" id="fecha" required defaultValue={factura ? factura.fecha.split('T')[0] : null}/>
                    <label >Receptor:</label>
                    <input onChange={()=> fillReceptor()} required type="number" id="receptor" defaultValue={factura.receptor.clave}/>
                    <select onChange={()=> fillClaveReceptor()} required id="receptor-select">
                        <option ></option>
                        {clientes.map(cliente=>{
                            return(
                                <option key={cliente.clave} value={cliente.clave}>{cliente.razon_social}</option>
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
                        <button onClick={()=> addOrden()} type="button" className="btn">+</button>
                        <br /><br />
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Serie</th>
                                    <th>Folio</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {ordenes.map(orden=>{
                                return(
                                    <tr key={`${orden.serie} ${orden.folio}`} className="row">
                                        <td className="pointer" onClick={()=> openOrden(orden.serie, orden.folio)}>Abrir</td>
                                        <td>{orden.serie}</td>
                                        <td>{orden.folio}</td>
                                        <td onClick={()=> removeOrden(orden)} className="delete pointer">Remover</td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <br />
                        <label >Estatus:</label>
                        <select id="estatus">
                            <option value="Pendiente">Pendiente</option>
                            <option value="Pagada">Pagada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>
                        <br />
                    </div>
                    <label >Total:</label>
                    <input required type="number" id="total" step="0.01" defaultValue={factura.total}/>
                    <button className="btn" type="submit">Guardar</button>
                </form>
                )
            })}
        </div>
    )
}