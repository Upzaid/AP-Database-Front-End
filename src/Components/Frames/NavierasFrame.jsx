import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'

const { ipcRenderer } = window.require("electron");

function NavierasFrame (props){
    useEffect(()=>{
        getNavieras()
    },[])

    const[navieras, setNavieras] =useState([])
    
    const headings =["Clave", "Razon Social", "R.F.C.", "Direccion"]

    async function getNavieras(){
        const response = await fetch(`${localStorage.getItem('server-url')}/naviera/list`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setNavieras(await response.json());
    }
    
    function openNaviera(clave){
        ipcRenderer.sendSync('create-window',
            ({
                width:400, 
                height:700, 
                url: `${process.env.REACT_APP_URL}/naviera?clave=${clave}&mode=edit`
            })
        )
    }
    
    function newNaviera(){
        ipcRenderer.sendSync('create-window',
            ({
                width:400, 
                height:700, 
                url: `${process.env.REACT_APP_URL}/naviera`
            })
        )
    }

    return(
        <>
            <h1 className="title">Navieras</h1>
            <SearchBar filters={headings} function={null}/>
            <div className="frame">
                <table>
                    <tr>
                        <th></th>
                        {headings.map(heading=>{
                            return(
                                <th>{heading}</th>
                            )
                        })}
                        <th></th>
                    </tr>
                    {navieras.map(naviera=>{
                        return(
                            <tr key={naviera.clave} className="row">
                                <td onClick={()=>{openNaviera(naviera.clave)}} className="pointer">Abrir</td>
                                <td >{naviera.clave}</td>
                                <td >{naviera.razon_social}</td>
                                <td >{naviera.rfc}</td>
                                <td >{naviera.domicilio}</td>
                                <td className="delete pointer">Borrar</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div onClick={()=>newNaviera()} className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Nueva Naviera</span>
            </div>
        </>
    )
}

export default NavierasFrame