import React, {useState} from 'react'

function ConfigWindow(){

    const [message, setMessage] = useState([])

    function checkConnection(e){
        e.preventDefault()
        // TODO API Call to check connection
            // TODO Set the Succes or error message
        setMessage([{text:'Check Connection'}]);
    }

    return(
        <div className="login">
            <h1 className="title">Configurar Conexion</h1>
            <form className="" onSubmit={(e)=>{checkConnection(e)}}>
                <label htmlFor="">IPv4 del Servidor:</label>
                <input type="text" name="" id="" />
                <br/>
                <label htmlFor="">Puerto:</label>
                <input type="text"/>
                <br/>
                <button className="btn" type="submit">Conectar</button>
            </form>
            <br/>
            {message.map(message=>{
                return(
                    <div className={message.class}>{message.text}</div>
                )
            })}
        </div>
    )
}

export default ConfigWindow