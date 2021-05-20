const {ipcRenderer} = window.require('electron')

export async function getClientes(){
    const response = await fetch(`${localStorage.getItem('server-url')}/cliente/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSingleCliente(clave){
    const response = await fetch(`${localStorage.getItem('server-url')}/cliente/find/${clave}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function latestCliente(){
    const response = await fetch(`${localStorage.getItem('server-url')}/cliente/latest`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openCliente(clave){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:680, 
            url: `${process.env.REACT_APP_URL}/cliente?clave=${clave}&mode=edit`
        })
    )
}

export function newCliente(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:740, 
            url: `${process.env.REACT_APP_URL}/cliente`
        })
    )
}

export async function createCliente(cliente){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/cliente/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(cliente)
    })
    
    if (response.status === 200){
        ipcRenderer.sendSync('alert', await response.json())
        return window.location.replace('/cliente')
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function deleteCliente(clave){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar el Cliente ${clave}?`)
        
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/cliente/delete`,{
        method: 'DELETE',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({clave})
    })

    if (response.status === 200){
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function updateCliente (cliente){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/cliente/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(cliente)
        })
    if (response.status === 200) {
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}
