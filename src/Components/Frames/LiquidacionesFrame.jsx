import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {newLiquidacion, openLiquidacion, deleteLiquidacion, getLiquidaciones} from '../../Useful Functions/Liquidacion' 


function LiquidacionesFrame (){
    useEffect(()=>{
        findLiquidaciones()
    },[])

    const[liquidaciones, setLiquidaciones] =useState([])
    const headings = ["Folio", "Fecha de Inicio", "Fecha de Cierre", "Operador", "Importe"]
    const filters = ["Folio", "Fecha de Inicio", "Fecha de Cierre", "Importe"]

    async function findLiquidaciones(){
        setLiquidaciones(await getLiquidaciones())
    }

    return(
        <>
            <h1 className="title">Liquidaciones</h1>
            <SearchBar filters={filters} model='liquidacion' function={setLiquidaciones}/>
            <div className="frame">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {headings.map(heading=>{
                                return(
                                    <th key={heading}>{heading}</th>
                                )
                            })}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {liquidaciones.map(liquidacion=>{
                            return(
                                <tr key={liquidacion.folio} className="row">
                                    <td onClick={()=> openLiquidacion(liquidacion.folio)} className="pointer">Abrir</td>
                                    <td>{liquidacion.folio}</td>
                                    <td>{liquidacion.fecha_inicio.split('T')[0] }</td>
                                    <td>{liquidacion.fecha_cierre.split('T')[0] }</td>
                                    <td>{liquidacion.operador.nombres} {liquidacion.operador.primer_apellido} {liquidacion.operador.segundo_apellido}</td>
                                    <td>$ {liquidacion.importe}</td>
                                    <td onClick={async ()=>{await deleteLiquidacion(liquidacion.folio); findLiquidaciones()}} className="delete pointer">Eliminar</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div onClick={()=>newLiquidacion()} className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Nueva Liquidacion</span>
            </div>
        </>
    )
}

export default LiquidacionesFrame