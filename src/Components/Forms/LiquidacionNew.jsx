import React, {useEffect, useState} from 'react'

const {ipcRenderer} = window.require('electron')

export default function LiquidacionNew(){
    
    const [ordenes, setOrdenes] = useState([]) 
    const [anticipos, setAnticipos] = useState([]) 
    const [comprobacion, setComporbacion] = useState([])
    const [personal, setPersonal] = useState([])
    const [latest, setLatest] = useState()

    useEffect(()=>{
        getPersonal()
        getLatest()
    },[])

    async function getLatest(){
        const response = await fetch(`${localStorage.getItem('server-url')}/liquidacion/latest`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setLatest(await response.json());
    }

    async function getPersonal(){
        const response = await fetch(`${localStorage.getItem('server-url')}/personal/list`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setPersonal(await response.json());
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

    function openOrden(serie, folio){
        ipcRenderer.sendSync('create-window',
        ({
            width:1200, 
            height:820, 
            url: `${process.env.REACT_APP_URL}/orden?serie=${serie}&folio=${folio}&mode=edit`
        })
    )
    }

    function openAnticipo(serie, folio){
        ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:600, 
            url: `${process.env.REACT_APP_URL}/anticipo?serie=${serie}&folio=${folio}&mode=edit`
        })
    )
    }

    async function addOrden(){
        const serie = document.getElementById('orden-serie').value
        const folio = document.getElementById('orden-folio').value
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
                    ordenesArray.push({serie: orden.serie, folio: orden.folio, comision: orden.comision})
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

    async function addAnticipo(){
        const serie = document.getElementById('anticipo-serie').value
        const folio = document.getElementById('anticipo-folio').value
        try {
            const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/find/${serie}/${folio}`,{
                headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            })
            
            if (response.status === 200){
                const anticipoArray = [...anticipos]
                const anticipo = await response.json()
                
                function anticipoCompare(element){
                    if (element.serie === anticipo.serie && element.folio === anticipo.folio) return true
                }

                if (anticipoArray.find(anticipoCompare)){
                    return ipcRenderer.sendSync('alert', 'Anticipo duplicado')
                }else {
                    anticipoArray.push({serie: anticipo.serie, folio: anticipo.folio, importe: anticipo.importe})
                    return setAnticipos(anticipoArray);
                }
            }else if (response.status === 202){
                return ipcRenderer.sendSync('alert', await response.json())
            }
            return ipcRenderer.sendSync('alert', "Error!")
        } catch (error) {
            return console.log(error);
        }
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
        const result = window.confirm('¿Desea guardar los cambios?')
        if (!result) return
        
        const liquidacion = {
            folio: document.getElementById('folio').value,
            fecha: document.getElementById('fecha').value,
            operador: document.getElementById('operador').value,
            ordenes: ordenes.map(orden =>{
                return {serie: orden.serie, folio: orden.folio}
            }),
            anticipos: anticipos.map(anticipo =>{
                return {serie: anticipo.serie, folio: anticipo.folio}
            }),
            comprobacion,
            importe: document.getElementById('total').value
        }
        
        const response = await fetch(`${localStorage.getItem('server-url')}/liquidacion/create`,{
            method: 'POST',
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(liquidacion)
        })

        if (response.status === 200){
            ipcRenderer.sendSync('alert', await response.json())
            return window.location.replace('/liquidacion')
        }else if (response.status === 202){
            return ipcRenderer.sendSync('alert',(await response.json()).join('\n'))
        }
        return ipcRenderer.sendSync('alert', 'Error!')

    }

    return(
        <div className="login">
            <h1 className="title">Nueva Liquidacion</h1>
            <form onSubmit={(e)=> submit(e)} className="form" >
                <label >Fecha:</label>
                <input type="date" id="fecha" defaultValue={new Date().toISOString().split('T')[0]} required/>
                <label >Folio:</label>
                <input type="number" id="folio" defaultValue={latest ? latest.folio + 1 : null} required/>
                <label >Operador:</label>
                <input onChange={()=> fillOperadorSelect()} type="number" id="operador" required/>
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
                    <button type="button" className="btn">Calcular Total</button>
                    <input type="number" id="total"/>
                </div>
                <br />
                <div className="c2">
                    <button type="button" className="btn">PDF</button>
                    <button type="submit" className="btn">Guardar</button>
                </div>
            </form>
        </div>
    )
}