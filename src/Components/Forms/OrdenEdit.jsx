import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {getSingleOrden, updateOrden} from '../../Useful Functions/Orden'
import {getNavieras} from '../../Useful Functions/Naviera'
import {getClientes} from '../../Useful Functions/Cliente'
import {getUnidades} from '../../Useful Functions/Unidad'
import {getPersonal} from '../../Useful Functions/Personal'

export default function OrdenEdit(){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const serie = searchParams.get('serie')
    const folio = searchParams.get('folio')
    
    const [navieras, setNavieras] = useState([])
    const [clientes, setClientes] = useState([])
    const [personal, setPersonal] = useState([])
    const [unidades, setUnidades] = useState([])
    const [orden, setOrden] = useState([])

    useEffect(()=>{
        findOrden()
        findNavieras()
        findClientes()
        findPersonal()
        findUnidades()
    }, [])

    useEffect(()=>{
        if (orden[0]){
            console.log(orden);
            setStatus()
            setTamano()
            setNaviera()
            setCliente()
            setOperador()
        }
    }, [orden])

    async function findOrden(){
        setOrden([await getSingleOrden(serie, folio)])
    }

    async function findNavieras(){
        setNavieras(await getNavieras());
    }

    async function findClientes(){
        setClientes(await getClientes());
    }

    async function findPersonal(){
        setPersonal(await getPersonal());
    }

    async function findUnidades(){
        setUnidades(await getUnidades());
    }

    function fillPlacas(){
        const unidad = document.getElementById('unidad').value

        for (let i = 0; i < unidades.length; i++){
            if (unidades[i].clave == unidad){
                document.getElementById('placas').value = unidades[i].placas
                break
            }
        }
    }
    
    function fillClaveNaviera(){
        const clave = document.getElementById('navieraselect').value
        document.getElementById('naviera').value = clave
    }
    
    function fillNaviera (){
        const clave = document.getElementById('naviera').value
        const navierasList = document.getElementById('navieraselect').options
        
        for (let i = 0; i < navierasList.length; i++){
            if(navierasList[i].value === clave){
                navierasList.selectedIndex = i
                break
            } 
        }
    }

    function fillClaveCliente(){
        const clave = document.getElementById('clienteselect').value
        document.getElementById('consignatario').value = clave
    }

    function fillCliente(){
        const clave = document.getElementById('consignatario').value
        const clienteList = document.getElementById('clienteselect').options
        
        for (let i = 0; i < clienteList.length; i++){
            if(clienteList[i].value === clave){
                clienteList.selectedIndex = i
                break
            } 
        }
    }

    function fillClaveOperador(){
        const clave = document.getElementById('operadorselect').value
        document.getElementById('operador').value = clave
    }

    function fillOperador(){
        const clave = document.getElementById('operador').value
        const operadorList = document.getElementById('operadorselect').options
        
        for (let i = 0; i < operadorList.length; i++){
            if(operadorList[i].value === clave){
                operadorList.selectedIndex = i
                break
            } 
        }
    }

    function setStatus(){
        const estatus = document.getElementById('estatus')
        if (estatus){
            const {options} = estatus
            for (let i = 0; i < options.length; i++){
                if(options[i].value === orden[0].estatus){
                    document.getElementById('estatus').selectedIndex = i
                    break
                }
            }
        }
    }

    function setNaviera(){
        const {value} = document.getElementById('naviera')
        const {options} = document.getElementById('navieraselect')
        for(let i = 0; i < options.length; i++){
            if (options[i].value === value){
                document.getElementById('navieraselect').selectedIndex = i
                break
            }
        }
    }

    function setCliente(){
        const {value} = document.getElementById('consignatario')
        const {options} = document.getElementById('clienteselect')
        for(let i = 0; i < options.length; i++){
            if (options[i].value === value){
                document.getElementById('clienteselect').selectedIndex = i
                break
            }
        }
    }

    function setOperador(){
        const {value} = document.getElementById('operador')
        const {options} = document.getElementById('operadorselect')
        for(let i = 0; i < options.length; i++){
            if (options[i].value === value){
                document.getElementById('operadorselect').selectedIndex = i
                break
            }
        }
    }

    function setTamano(){
        const tamano = document.getElementById('tamano')
        if (tamano){
            const {options} = tamano
            for (let i = 0; i < options.length; i++){
                if(options[i].value === orden[0].tamano){
                    document.getElementById('tamano').selectedIndex = i
                    break
                }
            }
        }
    }

    function submit (e){
        e.preventDefault()

        const newOrden ={
            estatus: document.getElementById('estatus').value,
            serie: serie,
            folio: folio,
            fecha: document.getElementById('fecha').value,
            ruta: document.getElementById('ruta').value,
            origen: document.getElementById('origen').value,
            tipo_servicio: document.getElementById('tipo_servicio').value,
            destino_agencia: document.getElementById('destino_agencia').value,
            observaciones: document.getElementById('observaciones').value,
            naviera: document.getElementById('naviera').value,
            consignatario: document.getElementById('consignatario').value,
            contenedor: document.getElementById('contenedor').value,
            tamano: document.getElementById('tamano').value,
            sello: document.getElementById('sello').value,
            booking: document.getElementById('booking').value,
            peso: document.getElementById('peso').value,
            operador: document.getElementById('operador').value,
            unidad: document.getElementById('unidad').value,
            flete: document.getElementById('flete').value,
            flete_falso: document.getElementById('flete_falso').value,
            maniobra: document.getElementById('maniobra').value,
            almacenaje: document.getElementById('almacenaje').value,
            reexpedicion: document.getElementById('reexpedicion').value,
            dif_kilometraje: document.getElementById('dif_kilometraje').value,
            subtotal: document.getElementById('subtotal').value,
            iva: document.getElementById('iva').value,
            retencion: document.getElementById('retencion').value,
            total: document.getElementById('total').value,
            comision: document.getElementById('comision').value,
        }
        
        updateOrden(newOrden)
    }

    return(
        <div >
            <h1 className="title">Orden {serie}-{folio}</h1>
            {orden.map(orden=>{
                return(
                    <form onSubmit={(e)=> submit(e)} className="login">
                <div className="c3">
                    <div className="form">
                        <label >Fecha:</label>
                        <input type="date" id="fecha" defaultValue={orden.fecha.split('T')[0]}/>
                        <label >Estatus:</label>
                        <select id="estatus">
                            <option value=""></option>
                            <option value="Activo">Activo</option>
                            <option value="Concluido">Concluido</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                        <label >Ruta:</label>
                        <input type="text" id="ruta" defaultValue={orden.ruta}/>
                        <label >Origen:</label>
                        <input type="text" id="origen" defaultValue={orden.origen}/>
                        <label >Tipo de Servicio:</label>
                        <input type="text" id="tipo_servicio" defaultValue={orden.tipo_servicio}/>
                        <label >Destino / Agencia Aduanal:</label>
                        <input type="text" id="destino_agencia" defaultValue={orden.destino_agencia}/>
                        <label >Observaciones:</label>
                        <textarea id="observaciones" cols="30" rows="10" defaultValue={orden.observaciones}></textarea>
                    </div>
                    <div className="form">
                        <label >Naviera:</label>
                        <div>
                            <input type="number"  id="naviera" defaultValue={orden.naviera.clave} onChange={()=> fillNaviera()}/>
                            <select id="navieraselect" onChange={()=> fillClaveNaviera()}>
                                <option value=""></option>
                                {navieras.map(naviera =>{
                                    return(
                                        <option key={naviera.clave} value={naviera.clave}>{naviera.razon_social}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <label >Consignatario:</label>
                        <div>
                            <input type="number" id="consignatario" defaultValue={orden.consignatario.clave} onChange={()=>fillCliente() }/>
                            <select id="clienteselect" onChange={()=>fillClaveCliente()}>
                                <option value=""></option>
                                {clientes.map(cliente =>{
                                    return(
                                        <option key={cliente.clave} value={cliente.clave}>{cliente.razon_social}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <label >Contenedor:</label>
                        <input type="text" id="contenedor" defaultValue={orden.contenedor}/>
                        <label >Tamaño:</label>
                        <select id="tamano">
                            <option value=""></option>
                            <option value="20' DC">20' DC</option>
                            <option value="40' HC">40' DC</option>
                        </select>
                        <label >Sello:</label>
                        <input type="text" id="sello" defaultValue={orden.sello}/>
                        <label >Booking:</label>
                        <input type="text" id="booking" defaultValue={orden.booking}/>
                        <label >Peso:</label>
                        <input type="number" id="peso" defaultValue={orden.peso}/>
                        <label >Operador:</label>
                        <div>
                            <input type="number" id="operador" onChange={()=>fillOperador()} defaultValue={orden.operador.clave}/>
                            <select id="operadorselect" onChange={()=>fillClaveOperador()}>
                                <option value=""></option>
                                {personal.map(personal =>{
                                    return(
                                        <option value={personal.clave}>{personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <label >Unidad:</label>
                        <input type="number"  id="unidad" onChange={()=>fillPlacas()} defaultValue={orden.unidad.clave}/>
                        <label >Placas:</label>
                        <input type="text" id="placas" defaultValue={orden.unidad.placas}/>
                    </div>
                    <div className="form">
                        <label >Comision del Operador:</label>
                        <input type="number" id="comision" step="0.01" defaultValue={orden.comision}/>
                        <label >Flete:</label>
                        <input type="number" id="flete" defaultValue={orden.flete}/>
                        <label >Maniobras:</label>
                        <input type="number" id="maniobra" defaultValue={orden.maniobra}/>
                        <label >Alamacenajes:</label>
                        <input type="number" id="almacenaje" defaultValue={orden.almacenaje}/>
                        <label >Flete en Falso:</label>
                        <input type="number" id="flete_falso" defaultValue={orden.flete_falso}/>
                        <label >Reexpedicion:</label>
                        <input type="number" id="reexpedicion" defaultValue={orden.reexpedicion}/>
                        <label >Diferenecia de Kilometraje:</label>
                        <input type="number" id="dif_kilometraje" defaultValue={orden.dif_kilometraje}/>
                        <label >Subtotal:</label>
                        <input type="number" id="subtotal" defaultValue={orden.subtotal}/>
                        <label >I.V.A.:</label>
                        <input type="number" id="iva" defaultValue={orden.iva}/>
                        <label >Retencion:</label>
                        <input type="number" id="retencion" defaultValue={orden.retencion}/>
                        <label >Total:</label>
                        <input type="number" id="total" defaultValue={orden.total}/>
                    </div>
                </div>
                <br />
                <div>
                    <button style={{marginRight: '200px'}} className="btn">Imprimir</button>
                    <button type="submit" className="btn">Guardar</button>
                </div>
            </form>
                )
            })}
            
        </div>
    )
}