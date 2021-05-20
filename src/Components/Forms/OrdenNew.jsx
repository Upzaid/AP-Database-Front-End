import React, {useEffect, useState} from 'react'
import {latestOrden, createOrden} from '../../Useful Functions/Orden'
import {getNavieras} from '../../Useful Functions/Naviera'
import {getClientes} from '../../Useful Functions/Cliente'
import {getPersonal} from '../../Useful Functions/Personal'
import {getUnidades} from '../../Useful Functions/Unidad'

export default function OrdenNew(){

    const [navieras, setNavieras] = useState([])
    const [clientes, setClientes] = useState([])
    const [personal, setPersonal] = useState([])
    const [unidades, setUnidades] = useState([])
    const [latest, setLatest] = useState()

    useEffect(()=>{
        findNavieras()
        findClientes()
        findPersonal()
        findUnidades()
        getLatest()
    }, [])

    async function getLatest(){
        setLatest(await latestOrden())
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
            }else document.getElementById('placas').value = ''
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
            }else navierasList.selectedIndex = 0
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
            }else clienteList.selectedIndex = 0

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
            }else operadorList.selectedIndex = 0
        }
    }

    function submit (e){
        e.preventDefault()

        const orden ={
            estatus: document.getElementById('estatus').value,
            serie: document.getElementById('serie').value,
            folio: document.getElementById('folio').value,
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
        
        createOrden(orden)
    }

    return(
        <div >
            <h1 className="title">Nueva Orden de Trabajo</h1>
            <form onSubmit={(e)=> submit(e)} className="login">
                <div className="c3">
                    <div className="form">
                        <label >Fecha:</label>
                        <input type="date" id="fecha" defaultValue={new Date().toISOString().split('T')[0]}/>
                        <div>
                            <label >Serie:</label>
                            <input type="text" id="serie" required defaultValue={latest ? latest.serie : null}/>
                            <label >Folio:</label>
                            <input type="number" id="folio" required defaultValue={latest ? latest.folio +1 : null}/>
                        </div>
                        <label >Estatus:</label>
                        <select id="estatus">
                            <option value=""></option>
                            <option value="Activo">Activo</option>
                            <option value="Concluido">Concluido</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                        <label >Ruta:</label>
                        <input type="text" id="ruta" />
                        <label >Origen:</label>
                        <input type="text" id="origen" />
                        <label >Tipo de Servicio:</label>
                        <input type="text" id="tipo_servicio" />
                        <label >Destino / Agencia Aduanal:</label>
                        <input type="text" id="destino_agencia" />
                        <label >Observaciones:</label>
                        <textarea id="observaciones" cols="30" rows="10"></textarea>
                    </div>
                    <div className="form">
                        <label >Naviera:</label>
                        <div>
                            <input type="number"  id="naviera" onChange={()=> fillNaviera()}/>
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
                            <input type="number" id="consignatario" onChange={()=>fillCliente() }/>
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
                        <input type="text" id="contenedor" />
                        <label >Tamaño:</label>
                        <select id="tamano">
                            <option value=""></option>
                            <option value="20' DC">20' DC</option>
                            <option value="40' HC">40' DC</option>
                        </select>
                        <label >Sello:</label>
                        <input type="text" id="sello" />
                        <label >Booking:</label>
                        <input type="text" id="booking" />
                        <label >Peso:</label>
                        <input type="number" id="peso" />
                        <label >Operador:</label>
                        <div>
                            <input type="number" id="operador" onChange={()=>fillOperador()}/>
                            <select id="operadorselect" onChange={()=>fillClaveOperador()}>
                                <option value=""></option>
                                {personal.map(personal =>{
                                    return(
                                        <option key={personal.clave} value={personal.clave}>{personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <label >Unidad:</label>
                        <input type="number"  id="unidad" onChange={()=>fillPlacas()}/>
                        <label >Placas:</label>
                        <input type="text" id="placas" />
                    </div>
                    <div className="form">
                        <label >Comision del Operador:</label>
                        <input type="number" id="comision" step="0.01"/>
                        <label >Flete:</label>
                        <input type="number" id="flete" />
                        <label >Maniobras:</label>
                        <input type="number" id="maniobra" />
                        <label >Alamacenajes:</label>
                        <input type="number" id="almacenaje" />
                        <label >Flete en Falso:</label>
                        <input type="number" id="flete_falso" />
                        <label >Reexpedicion:</label>
                        <input type="number" id="reexpedicion" />
                        <label >Diferenecia de Kilometraje:</label>
                        <input type="number" id="dif_kilometraje" />
                        <label >Subtotal:</label>
                        <input type="number" id="subtotal" />
                        <label >I.V.A.:</label>
                        <input type="number" id="iva" />
                        <label >Retencion:</label>
                        <input type="number" id="retencion" />
                        <label >Total:</label>
                        <input type="number" id="total" />
                    </div>
                </div>
                <br />
                <div>
                    <button type="button" style={{marginRight: '200px'}} className="btn">Imprimir</button>
                    <button type="submit" className="btn">Guardar</button>
                </div>
            </form>
        </div>
    )
}