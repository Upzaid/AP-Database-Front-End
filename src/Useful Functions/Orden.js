const {ipcRenderer} = window.require('electron')

export async function getOrdenes(){
    const response = await fetch(`${localStorage.getItem('server-url')}/orden/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSingleOrden(serie, folio){
    const response = await fetch(`${localStorage.getItem('server-url')}/orden/find/${serie}/${folio}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    if (response.status === 200){
        return await response.json()
    }else return null
}

export async function latestOrden(){
    const response = await fetch(`${localStorage.getItem('server-url')}/orden/latest`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openOrden(serie, folio){
    return ipcRenderer.sendSync('create-window',
        ({
            width:1200, 
            height:820, 
            url: `/orden?serie=${serie}&folio=${folio}&mode=edit`
        })
    )
}

export function newOrden(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:1200, 
            height:820, 
            url: `/orden`
        })
    )
}

export async function createOrden(orden){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/orden/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(orden)
    })
    
    if (response.status === 200){
        ipcRenderer.sendSync('alert', await response.json())
        return window.location.reload()
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function deleteOrden(serie, folio){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar la Orden ${serie}-${folio}?`)
        
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/orden/delete`,{
        method: 'DELETE',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({serie, folio})
    })

    if (response.status === 200){
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function updateOrden (orden){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/orden/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(orden)
        })
    if (response.status === 200) {
        window.location.reload()
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export function printOrden(orden){
    ipcRenderer.sendSync('print-orden', orden)
}