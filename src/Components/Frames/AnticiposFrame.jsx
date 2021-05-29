import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {newAnticipo, openAnticipo, deleteAnticipo, getAnticipos, openPrintAnticipos} from '../../Useful Functions/Anticipo'

function AnticiposFrame (){
    useEffect(()=>{
       findAnticipos()
    },[])

    const [anticipos, setAnticipos] =useState([])
    const headings =["Serie", "Folio", "Fecha", "Personal","Concepto","Importe"]
    const filters =["Serie", "Folio", "Fecha","Concepto","Importe"]

    async function findAnticipos(){
        setAnticipos(await getAnticipos())
    }

    return(
        <>
            <h1 className="title">Anticipos</h1>
            <SearchBar filters={filters} model="anticipo" function={setAnticipos}/>
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
                        {anticipos.map(anticipo=>{
                            return(
                                <tr key={`${anticipo.serie} ${anticipo.folio}`} className="row">
                                    <td className="pointer" onClick={() => {openAnticipo(anticipo.serie, anticipo.folio)}}>Abrir</td>
                                    <td>{anticipo.serie}</td>
                                    <td>{anticipo.folio}</td>
                                    <td>{anticipo.fecha.split('T')[0]}</td>
                                    <td>{anticipo.personal.nombres} {anticipo.personal.primer_apellido} {anticipo.personal.segundo_apellido}</td>
                                    <td>{anticipo.concepto}</td>
                                    <td>$ {anticipo.importe}</td>
                                    <td onClick={async ()=> {await deleteAnticipo(anticipo.serie, anticipo.folio); findAnticipos()}} className="delete pointer">Eliminar</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="c2">
                <div onClick={()=>{openPrintAnticipos()}} style={{justifySelf: 'flex-start'}} className="button new ">
                        <span>PDF Anticipos</span>
                </div>
                <div onClick={()=>newAnticipo()} className="button new ">
                        <img src={Nuevo} alt=""/>
                        <span>Nuevo Anticipo</span>
                </div>
            </div>
        </>
    )
}

export default AnticiposFrame