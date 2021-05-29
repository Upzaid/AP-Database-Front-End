const {ipcRenderer} = window.require('electron')

export async function getMantenimiento(){
    const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSingleMantenimiento(folio){
    const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/find/${folio}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function latestMantenimiento(){
    const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/latest`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openMantenimiento(folio){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:800, 
            url: `/mantenimiento?folio=${folio}&mode=edit`
        })
    )
}

export function newMantenimiento(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:820, 
            url: `/mantenimiento`
        })
    )
}

export async function createMantenimiento(mantenimiento){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(mantenimiento)
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

export async function deleteMantenimiento(folio){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar la Orden de Mantenimiento ${folio}?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/delete`,{
        method: 'DELETE',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({folio})
    })

    if (response.status === 200){
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function updateMantenimiento (mantenimiento){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/mantenimiento/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(mantenimiento)
        })
    if (response.status === 200) {
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}
