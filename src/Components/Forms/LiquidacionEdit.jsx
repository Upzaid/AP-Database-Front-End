import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {getPersonal} from '../../Useful Functions/Personal'
import {getSingleLiquidacion, updateLiquidacion} from '../../Useful Functions/Liquidacion'
import {openOrden, getSingleOrden} from '../../Useful Functions/Orden'
import {getSingleAnticipo, openAnticipo} from '../../Useful Functions/Anticipo'

const {ipcRenderer} = window.require('electron')

export default function LiquidacionNew(){
    
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const folio = searchParams.get('folio')

    const [ordenes, setOrdenes] = useState([]) 
    const [anticipos, setAnticipos] = useState([]) 
    const [comprobacion, setComporbacion] = useState([])
    
    const [liquidacion, setLiquidacion] = useState([])
    const [personal, setPersonal] = useState([])
    const [total, setTotal] = useState()

    useEffect(()=>{
        getLiquidacion()
        findPersonal()
    },[])

    useEffect(()=>{
        if(liquidacion.length > 0){
            setOrdenes(liquidacion[0].ordenes)
            setAnticipos(liquidacion[0].anticipos)
            setComporbacion(liquidacion[0].comprobacion)
            setOperadorSelectDeafault()
        }
    },[liquidacion])

    useEffect(()=>{
        calculateTotal()
    },[ordenes, anticipos, comprobacion])

    async function getLiquidacion(){
        setLiquidacion([await getSingleLiquidacion(folio)]);
    }

    async function findPersonal(){
        setPersonal(await getPersonal());
    }

    function setOperadorSelectDeafault(){
        const {options} = document.getElementById('operador-select')
        const value = liquidacion[0].operador.clave

        for(let i = 0; i < options.length; i++){
            if (options[i].value == value){
                document.getElementById('operador-select').selectedIndex = i
                break
            }else{
                document.getElementById('operador-select').selectedIndex = 0
            }
        }
    }

    function fillOperador(){
        document.getElementById('operador').value = document.getElementById('operador-select').value
    }
    
    function fillOperadorSelect(){
        const {options} = document.getElementById('operador-select')
        const {value} = document.getElementById('operador')

        for(let i = 0; i < options.length; i++){
            if (options[i].value === value){
                document.getElementById('operador-select').selectedIndex = i
                break
            }else{
                document.getElementById('operador-select').selectedIndex = 0
            }
        }
    }

    async function addOrden(){
        const serie = document.getElementById('orden-serie').value
        const folio = document.getElementById('orden-folio').value
        const orden = await getSingleOrden(serie, folio)
        
        if (orden){
            const ordenesArray = [...ordenes]
            function ordenCompare(element){
                if (element.serie === orden.serie && element.folio === orden.folio) return true
            }
            if (ordenesArray.find(ordenCompare)){
                return ipcRenderer.sendSync('alert', 'Orden duplicada')
            }else {
                ordenesArray.push({serie: orden.serie, folio: orden.folio, comision: orden.comision})
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

    async function addAnticipo(){
        const serie = document.getElementById('anticipo-serie').value
        const folio = document.getElementById('anticipo-folio').value
        const anticipo = await getSingleAnticipo(serie, folio)
            if (anticipo){
                const anticipoArray = [...anticipos]
                function anticipoCompare(element){
                    if (element.serie === anticipo.serie && element.folio === anticipo.folio) return true
                }
                if (anticipoArray.find(anticipoCompare)){
                    return ipcRenderer.sendSync('alert', 'Anticipo duplicado')
                }else {
                    anticipoArray.push({serie: anticipo.serie, folio: anticipo.folio, importe: anticipo.importe})
                    return setAnticipos(anticipoArray);
                }
            }else ipcRenderer.sendSync('alert', 'Anticipo no existe')
    }
    
    function removeAnticipo(anticipo){
        const anticipoArray = [...anticipos]
        function anticipoCompare(element){
           return anticipo.serie === element.serie && anticipo.folio === element.folio
        }
        if (anticipoArray.findIndex(anticipoCompare) > -1){
            anticipoArray.splice(anticipoArray.findIndex(anticipoCompare), 1)
        }
        setAnticipos(anticipoArray)
    }

    function addComprobacion(){
        const concepto = document.getElementById('comp-concepto').value
        const importe = document.getElementById('comp-importe').value
        const comprobacionArray = [...comprobacion]
        comprobacionArray.push({concepto, importe})
        setComporbacion(comprobacionArray);
    }
    
    function removeComprobacion(comprobante){
        const comprobacionArray = [...comprobacion]
        function comprobacionCompare(element){
           return comprobante.concepto === element.concepto && comprobante.importe === element.importe
        }
        if (comprobacionArray.findIndex(comprobacionCompare) > -1){
            comprobacionArray.splice(comprobacionArray.findIndex(comprobacionCompare), 1)
        }
        setComporbacion(comprobacionArray)
    }

    async function submit(e){
        e.preventDefault()
        const newLiquidacion = {
            folio: folio,
            fecha_inicio: document.getElementById('fecha_inicio').value,
            fecha_cierre: document.getElementById('fecha_cierre').value,
            operador: document.getElementById('operador').value,
            ordenes: ordenes.map(orden =>{
                return {serie: orden.serie, folio: orden.folio}
            }),
            anticipos: anticipos.map(anticipo =>{
                return {serie: anticipo.serie, folio: anticipo.folio}
            }),
            comprobacion: comprobacion.map(comprobante=>{
                return {concepto: comprobante.concepto, importe: comprobante.importe}
            }),
            importe: total
        }
        updateLiquidacion(newLiquidacion)
    }

    function calculateTotal(){
        const totalOrdenes = ordenes.reduce((acc, curr)=> acc + curr.comision, 0)
        const totalAntcicpos = anticipos.reduce((acc, curr)=> acc + curr.importe, 0)
        const totalComprobacion = comprobacion.reduce((acc, curr)=> acc + Number(curr.importe), 0)
        setTotal(totalOrdenes - totalAntcicpos + totalComprobacion)
    }

    return(
        <div className="login">
            <h1 className="title">Liquidacion {folio}</h1>
            {liquidacion.map(liquidacion =>{
                return(
                    <form onSubmit={(e)=> submit(e)} className="form" >
                <label >Fecha de Inicio:</label>
                <input type="date" id="fecha_inicio" defaultValue={liquidacion.fecha_inicio.split('T')[0] } required/>
                <label >Fecha de Cierre:</label>
                <input type="date" id="fecha_cierre" defaultValue={liquidacion.fecha_cierre.split('T')[0] } required/>
                <label >Operador:</label>
                <input onChange={()=> fillOperadorSelect()} type="number" id="operador" required defaultValue={liquidacion.operador.clave}/>
                <select onChange={()=> fillOperador()} id="operador-select" required>
                    <option value=""></option>
                    {personal.map(personal=>{
                        return(
                            <option key={personal.clave} value={personal.clave}>{personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</option>
                        )
                    })}
                </select>
                <br />
               
                <label >Ordenes:</label>
                <div>
                    <label >Serie:</label>
                    <input type="text" name="" id="orden-serie" />
                    <label >Folio:</label>
                    <input type="number" name="" id="orden-folio" />
                    <button onClick={()=> addOrden()} type="button" className="btn">+</button>
                </div>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Serie</th>
                            <th>Folio</th>
                            <th>Comision</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map(orden=>{
                            return(
                            <tr key={`${orden.serie} ${orden.folio}`} className="row">
                                <td onClick={()=> openOrden(orden.serie, orden.folio)} className="pointer">Abrir</td>
                                <td>{orden.serie}</td>
                                <td>{orden.folio}</td>
                                <td>{orden.comision}</td>
                                <td onClick={()=> removeOrden(orden)} className="delete pointer">Remover</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />
                <label >Anticipos:</label>
                <div>
                    <label >Serie:</label>
                    <input type="text" name="" id="anticipo-serie" />
                    <label >Folio:</label>
                    <input type="number" name="" id="anticipo-folio" />
                    <button onClick={()=> addAnticipo()} type="button" className="btn">+</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Serie</th>
                            <th>Folio</th>
                            <th>Importe</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {anticipos.map(anticipo =>{
                            return(
                                <tr key={`${anticipo.serie} ${anticipo.folio}`} className="row">
                                    <td onClick={()=> openAnticipo(anticipo.serie, anticipo.folio)} className="pointer">Abrir</td>
                                    <td>{anticipo.serie}</td>
                                    <td>{anticipo.folio}</td>
                                    <td>{anticipo.importe}</td>
                                    <td onClick={()=> removeAnticipo(anticipo)} className="pointer delete">Remover</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />
                <label >Comprobacion:</label>
                <div>
                    <label >Concepto:</label>
                    <input type="text" name="" id="comp-concepto" />
                    <label >Importe:</label>
                    <input type="number" name="" id="comp-importe" />
                    <button onClick={()=> addComprobacion()} type="button" className="btn">+</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th>Importe</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {comprobacion.map(comprobante =>{
                            return(
                                <tr key={`${comprobante.concepto} ${comprobante.importe}`} className="row">
                                    <td>{comprobante.concepto}</td>
                                    <td>{comprobante.importe}</td>
                                    <td onClick={()=> removeComprobacion(comprobante)} className="pointer delete">Remover</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />
             
                <br />
                <div>
                    <span id="total">Total: ${total}</span>
                </div>
                <br />
                <div className="c2">
                    <button type="button" className="btn">PDF</button>
                    <button type="submit" className="btn">Guardar</button>
                </div>
            </form>
                )
            })}
        </div>
    )
}