const {ipcRenderer} = window.require('electron')

export async function getAnticipos(){
    const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSingleAnticipo(serie, folio){
    const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/find/${serie}/${folio}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    if (response.status === 200){
        return await response.json()
    }else return null
}

export async function latestAnticipo(){
    const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/latest`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openAnticipo(serie, folio){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:600, 
            url: `${process.env.REACT_APP_URL}/anticipo?serie=${serie}&folio=${folio}&mode=edit`
        })
    )
}

export function newAnticipo(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:700, 
            url: `${process.env.REACT_APP_URL}/anticipo`
        })
    )
}

export async function createAnticipo(anticipo){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(anticipo)
    })
    
    if (response.status === 200){
        ipcRenderer.sendSync('alert', await response.json())
        window.location.replace('/anticipo')
        return 
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function deleteAnticipo(serie, folio){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar el Anticipo ${serie}-${folio}?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/delete`,{
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

export async function updateAnticipo (anticipo){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(anticipo)
        })
    if (response.status === 200) {
        ipcRenderer.sendSync('alert', await response.json())
        window.location.replace(`/anticipo?serie=${anticipo.serie}&folio=${anticipo.folio}&mode=edit`)
        return 
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function getAnticiposRange(startDate, endDate){
    const response = await fetch(`${localStorage.getItem('server-url')}/anticipo/range?start=${startDate}&end=${endDate}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        })
    return await response.json()
}

export function printAnticipos(anticipos){
    ipcRenderer.sendSync('print-anticipos', anticipos)
}

export function openPrintAnticipos(){
    return (ipcRenderer.sendSync('create-window',  ({
        width:600, 
        height:600, 
        url: `${process.env.REACT_APP_URL}/anticipo/print`
        }))
    )
}