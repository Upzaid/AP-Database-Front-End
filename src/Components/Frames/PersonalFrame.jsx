import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'

const { ipcRenderer } = window.require("electron");

function PersonalFrame (){
    useEffect(()=>{
        getPersonal()
    },[])

    const [personal, setPersonal] = useState([])
    const headings =["Clave", "Nombre", "R.F.C.","Telefono"]

    async function getPersonal(){
        const response = await fetch(`${localStorage.getItem('server-url')}/personal/list`, {
            headers : {
                    'auth-token': localStorage.getItem('auth-token'),
                } 
            })
        setPersonal(await response.json());
    }

    function openPersonal(clave){
        ipcRenderer.sendSync('create-window',
            ({
                width:400, 
                height:800, 
                url: `${process.env.REACT_APP_URL}/personal?clave=${clave}&mode=edit`
            })
        )
    }
    
    function newPersonal(){
        ipcRenderer.sendSync('create-window',
            ({
                width:400, 
                height:800, 
                url: `${process.env.REACT_APP_URL}/personal?mode=new`
            })
        ) 
    }

    return(
        <>
            <h1 className="title">Personal</h1>
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
                    {personal.map(personal=>{
                        return(
                            <tr key={personal.clave} className="row">
                                <td onClick={()=>openPersonal(personal.clave)} className="pointer">Abrir</td>
                                <td>{personal.clave}</td>
                                <td>{personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</td>
                                <td>{personal.rfc}</td>
                                <td>{personal.telefono}</td>
                                <td className="delete pointer">Borrar</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div onClick={()=> newPersonal()} className="button new ">
                <img src={Nuevo} alt=""/>
                <span>Nuevo Personal</span>
            </div>
        </>
    )
}

export default PersonalFrame