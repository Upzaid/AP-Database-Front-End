import React, {useState, useEffect} from 'react'
import FacturasTable from '../Inicio/FacturasTable'
import OrdenesTable from '../Inicio/OrdenesTable'
import Users from '../../Assets/Users.svg'
import {getUser, openUsers} from '../../Useful Functions/User'

function InicioFrame(){

    const [user, setUser] = useState()

    useEffect(()=>{
        findUser()
    }, [])

    async function findUser(){
        setUser(await getUser())
    }

    return(
        <div>
            <h1 className="title">Inicio</h1>
            <div className='c2'>
                <OrdenesTable />
                <FacturasTable />
            </div>
            {!user ? null :
            user.permissions === 'admin' 
            ? <div onClick={()=> openUsers()} style={{maxWidth: '100px'}} className="button new ">
                <img src={Users} alt=""/>
                <span >Usuarios</span>
            </div> : null}
        </div>
    )
}

export default InicioFrame