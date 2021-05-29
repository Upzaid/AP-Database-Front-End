const {ipcRenderer} = window.require('electron')

export async function getNavieras(){
    const response = await fetch(`${localStorage.getItem('server-url')}/naviera/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function getSingleNaviera(clave){
    const response = await fetch(`${localStorage.getItem('server-url')}/naviera/find/${clave}`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function latestNaviera(){
    const response = await fetch(`${localStorage.getItem('server-url')}/naviera/latest`,{
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openNaviera(clave){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:680, 
            url: `/naviera?clave=${clave}&mode=edit`
        })
    )
}

export function newNaviera(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:400, 
            height:740, 
            url: `/naviera`
        })
    )
}

export async function createNaviera(naviera){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    
    const response = await fetch(`${localStorage.getItem('server-url')}/naviera/create`,{
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(naviera)
    })
    
    if (response.status === 200){
        ipcRenderer.sendSync('alert', await response.json())
        return window.location.replace(process.env.NODE_ENV === 'development' ? `/naviera` : `#naviera`)
    }else if (response.status === 202){
        return ipcRenderer.send('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function deleteNaviera(clave){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar la Naviera ${clave}?`)
        
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/naviera/delete`,{
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

export async function updateNaviera (naviera){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return

    const response = await fetch(`${localStorage.getItem('server-url')}/naviera/edit`,{
        method: 'PUT',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(naviera)
        })
    if (response.status === 200) {
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}