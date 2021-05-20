import React, {useState, useEffect} from 'react'
import Nuevo from '../../Assets/Nuevo.svg'
import SearchBar from '../SearchBar'
import {getPersonal, newPersonal, openPersonal, deletePersonal} from '../../Useful Functions/Personal'

function PersonalFrame (){
    useEffect(()=>{
        findPersonal()
    },[])

    const [personal, setPersonal] = useState([])
    const headings =["Clave", "Nombre", "R.F.C.","Telefono"]

    async function findPersonal(){
        setPersonal(await getPersonal());
    }

    return(
        <>
            <h1 className="title">Personal</h1>
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
                        {personal.map(personal=>{
                            return(
                                <tr key={personal.clave} className="row">
                                    <td onClick={()=>openPersonal(personal.clave)} className="pointer">Abrir</td>
                                    <td>{personal.clave}</td>
                                    <td>{personal.nombres} {personal.primer_apellido} {personal.segundo_apellido}</td>
                                    <td>{personal.rfc}</td>
                                    <td>{personal.telefono}</td>
                                    <td onClick={async ()=>{await deletePersonal(personal.clave); findPersonal()}} className="delete pointer">Borrar</td>
                                </tr>
                            )
                        })}
                    </tbody>
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