const {ipcRenderer} = window.require('electron')

export async function getFacturas(){
    const response = await fetch(`${localStorage.getItem('server-url')}/factura/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSingleFactura(serie, folio){
    const response = await fetch(`${localStorage.getItem('server-url')}/factura/find/${serie}/${folio}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    if (response.status === 200){
        return await response.json()
    }else return null
}

export async function latestFactura(){
    const response = await fetch(`${localStorage.getItem('server-url')}/factura/latest`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openFactura(serie, folio){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:400, 
            url: `${process.env.REACT_APP_URL}/factura?serie=${serie}&folio=${folio}&mode=edit`
        })
    )
}

export function newFactura(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:500, 
            url: `${process.env.REACT_APP_URL}/factura`
        })
    )
}

export async function createFactura(factura){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/factura/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(factura)
    })
    
    if (response.status === 200){
        ipcRenderer.sendSync('alert', await response.json())
        return window.location.replace('/factura')
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function deleteFactura(serie, folio){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar la Factura ${serie}-${folio}?`)
        
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/factura/delete`,{
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

export async function updateFactura (factura){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/factura/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(factura)
        })
    if (response.status === 200) {
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}
