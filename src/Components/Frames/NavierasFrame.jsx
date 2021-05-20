import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {getNavieras, newNaviera, openNaviera, deleteNaviera} from '../../Useful Functions/Naviera'


function NavierasFrame (){
    useEffect(()=>{
        findNavieras()
    },[])

    const[navieras, setNavieras] =useState([])
    
    const headings =["Clave", "Razon Social", "R.F.C.", "Direccion"]

    async function findNavieras(){
        setNavieras(await getNavieras())
    }
   
    return(
        <>
            <h1 className="title">Navieras</h1>
            <SearchBar filters={headings} function={null}/>
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
                        {navieras.map(naviera=>{
                            return(
                                <tr key={naviera.clave} className="row">
                                    <td onClick={()=>{openNaviera(naviera.clave)}} className="pointer">Abrir</td>
                                    <td >{naviera.clave}</td>
                                    <td >{naviera.razon_social}</td>
                                    <td >{naviera.rfc}</td>
                                    <td >{naviera.domicilio}</td>
                                    <td onClick={async ()=> {await deleteNaviera(naviera.clave); findNavieras()}} className="delete pointer">Borrar</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div onClick={()=>newNaviera()} className="button new">
                <img src={Nuevo} alt=""/>
                <span>Nueva Naviera</span>
            </div>
        </>
    )
}

export default NavierasFrame