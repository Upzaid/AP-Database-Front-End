import React from 'react'
import LogoText from '../../Assets/LogoText.svg'
import Configuracion from '../../Assets/Configuracion.svg'

function LogInForm(){

    function logIn(e){
        e.preventDefault()
        console.log('Login');
        // API Log In Call
        
        // Successful Log in
            // Redirect to Main Window
        window.location.replace('/')
        
    }

    return(
        <div className="login" onSubmit={(e)=>{logIn(e)}}>
            <img classname="logo" src={LogoText} alt=""/>
            <form action="">
                <label htmlFor="">Nombre de Usuario: </label>
                <input type="text" name="" id=""/>
                <br/>
                <label htmlFor="">Contraseña: </label>
                <input type="password" name="" id=""/>
                <br/>
                <button className="btn">Iniciar Sesion</button>
                <img className="pointer" src={Configuracion} alt=""/>
            </form>
        </div>
    )
}

export default LogInForm