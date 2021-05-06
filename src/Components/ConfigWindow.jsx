import React, {useState} from 'react'

function ConfigWindow(){

    const [message, setMessage] = useState([])

    async function checkConnection(e){
        e.preventDefault()
        
        const ip = document.getElementById('ip').value
        const port = document.getElementById('port').value
        
        try {
            const response = await fetch(`http://${ip}:${port}/`, {headers: {'Content-Type': 'application/json'}})
            if (response) {
                localStorage.setItem('server-url', `http://${ip}:${port}`)
                return setMessage([{text: await response.json(), class: 'success'}])
            }
        } catch (error) {
            return setMessage([{text: 'No fue posible realizar la conexion', class: 'error'}])
        }
      
    }

    return(
        <div className="login">
            <h1 className="title">Configurar Conexion</h1>
            <form className="" onSubmit={(e)=>{checkConnection(e)}}>
                <label htmlFor="">IPv4 del Servidor:</label>
                <input type="text" id="ip" />
                <br/>
                <label htmlFor="">Puerto:</label>
                <input type="text" id="port"/>
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