import React, {useState, useEffect} from 'react'
import {getUsers, deletetUser, createUser} from '../../Useful Functions/User'

const {ipcRenderer} = window.require('electron')


export default function Users(){

    const [users, setUsers] = useState([])

    useEffect(()=>{
        findUsers()
    },[])

    async function findUsers(){
        setUsers(await getUsers())
    }

    async function submit (e){
        e.preventDefault()

        const password = document.getElementById('password').value
        const confirm = document.getElementById('confirm').value

        if( password !== confirm){
            return ipcRenderer.sendSync('alert', 'Contraseñas deben ser iguales')
        }
        const user ={
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            permissions: document.getElementById('permissions').value,
        }
        await createUser(user);
    }

    return(
        <div className="login">
            <h1 className='title'>Usuarios</h1>
            <div className="c2">
            <form onSubmit={async(e)=>{await submit(e); findUsers()}} className="form">
                <h2 className="title">Crear Nuevo Usuario</h2>
                <label >Nombre de Usuario:</label>
                <input type="text" id="username" required/>
                <label >Contraseña:</label>
                <input type="password" id="password" required/>
                <label >Confirmar Contraseña:</label>
                <input type="password" id="confirm" required/>
                <label >Permisios:</label>
                <select id="permissions">
                    <option value="editor">Editar</option>
                    <option value="viewer">Ver</option>
                    <option value="admin">Administrador</option>
                </select>
                <br />
                <button className="btn" type="submit">Guardar</button>
            </form>
            <div className="form">
                <h2 className='title'>Administar Usuarios</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Permisos</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>{
                            return(
                                <tr key={user.username} className='row'>
                                    <td>{user.username}</td>
                                    <td>{user.permissions}</td>
                                    <td onClick={async()=> {await deletetUser(user.username); findUsers()}} className="delete pointer">Eliminar</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}