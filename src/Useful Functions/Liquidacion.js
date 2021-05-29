const {ipcRenderer} = window.require('electron')

export async function getLiquidaciones(){
    const response = await fetch(`${localStorage.getItem('server-url')}/liquidacion/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSingleLiquidacion(folio){
    const response = await fetch(`${localStorage.getItem('server-url')}/liquidacion/find/${folio}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function latestLiquidacion(){
    const response = await fetch(`${localStorage.getItem('server-url')}/liquidacion/latest`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openLiquidacion(folio){
    return ipcRenderer.sendSync('create-window',
        ({
            width:700, 
            height:820, 
            url: `/liquidacion?folio=${folio}&mode=edit`
        })
    )
}

export function newLiquidacion(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:700, 
            height:820, 
            url: `/liquidacion`
        })
    )
}

export async function createLiquidacion(liquidacion){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/liquidacion/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(liquidacion)
    })
    
    if (response.status === 200){
        ipcRenderer.sendSync('alert', await response.json())
        return window.location.reload()
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function deleteLiquidacion(folio){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar la Liquidacion ${folio}?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/liquidacion/delete`,{
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

export async function updateLiquidacion (liquidacion){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/liquidacion/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(liquidacion)
        })
    if (response.status === 200) {
        window.location.reload()
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export function printLiquidacion(liquidacion){
    ipcRenderer.sendSync('print-liquidacion', liquidacion)
}