import React, {useState} from 'react'
import LogoText from '../../Assets/LogoText.svg'
import Configuracion from '../../Assets/Configuracion.svg'

const { ipcRenderer } = window.require("electron");


function LogInForm(){
    
    const [error, setError] = useState([])

    function openConfig(){
        ipcRenderer.sendSync('create-window',
            ({
                width:300, 
                height:460, 
                url: `${process.env.REACT_APP_URL}/config`
            })
        )
    }

    async function logIn(e){
        e.preventDefault()
        
        // TODO API Log In Call
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                username, password
            })
        }
        
        try {
            const response = await fetch(`${localStorage.getItem('server-url')}/user/login`, options)
            if (response.status > 299) return setError([await response.json()])
            
            // Successful Log in redirect to Main Window set auth token
            localStorage.setItem('auth-token', await response.json())
            
            return window.location.replace('/')
        
        } catch (err) {
            console.log(err);
            return (err)
        }
        
    }

    return(
        <div className="login" onSubmit={(e)=>{logIn(e)}}>
            <img classname="logo" src={LogoText} alt=""/>
            <form action="">
                <label htmlFor="">Nombre de Usuario: </label>
                <input type="text" name="" id="username" required/>
                <br/>
                <label htmlFor="">Contraseña: </label>
                <input type="password" name="" id="password" required/>
                <br/>
                <button className="btn">Iniciar Sesion</button>
                <img onClick={()=>{openConfig()}} className="pointer" src={Configuracion} alt=""/>
            </form>
            <br/>
            {error.map(message=>{
                return(
                    <div className="error">{message}</div>
                )
            })}
        </div>
    )
}

export default LogInForm