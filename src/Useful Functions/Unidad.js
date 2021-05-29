const {ipcRenderer} = window.require('electron')

export async function getUnidades(){
    const response = await fetch(`${localStorage.getItem('server-url')}/unidad/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSingleUnidad(clave){
    const response = await fetch(`${localStorage.getItem('server-url')}/unidad/find/${clave}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openUnidad(clave){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:680, 
            url: `/unidad?clave=${clave}&mode=edit`
        })
    )
}

export function newUnidad(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:700, 
            url: `/unidad`
        })
    )
}

export async function createUnidad(unidad){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/unidad/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(unidad)
    })
    
    if (response.status === 200){
        ipcRenderer.sendSync('alert', await response.json())
        window.location.reload()
        return 
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function deleteUnidad(clave){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar la Unidad ${clave}?`)
        
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/unidad/delete`,{
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

export async function updateUnidad (unidad){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/unidad/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(unidad)
        })
    if (response.status === 200) {
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}