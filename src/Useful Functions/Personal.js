const {ipcRenderer} = window.require('electron')

export async function getPersonal(){
    const response = await fetch(`${localStorage.getItem('server-url')}/personal/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSinglePersonal(clave){
    const response = await fetch(`${localStorage.getItem('server-url')}/personal/find/${clave}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function latestPersonal(){
    const response = await fetch(`${localStorage.getItem('server-url')}/personal/latest`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openPersonal(clave){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:820, 
            url: `/personal?clave=${clave}&mode=edit`
        })
    )
}

export function newPersonal(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:820, 
            url: `/personal`
        })
    )
}

export async function createPersonal(personal){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/personal/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(personal)
    })
    
    if (response.status === 200){
        ipcRenderer.sendSync('alert', await response.json())
        return window.location.replace(process.env.NODE_ENV === 'development' ? `/personal` : `#personal`)
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function deletePersonal(clave){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar Personal ${clave}?`)
        
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/personal/delete`,{
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

export async function updatePersonal (personal){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/personal/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(personal)
        })
    if (response.status === 200) {
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}