const {ipcRenderer} = window.require('electron')

export async function getUser(){
    const response = await fetch(`${localStorage.getItem('server-url')}/user/active`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export function openUsers(){
    return ipcRenderer.sendSync('create-window',
        ({
            width:780, 
            height:600, 
            url: `/users`
        })
    )
}

export async function getUsers(){
    const response = await fetch(`${localStorage.getItem('server-url')}/user/list`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    return await response.json()
}

export async function deletetUser(username){
    const result = ipcRenderer.sendSync('confirm', `¿Desea eliminar al usuario ${username}?`)
    if (!result) return
    const response = await fetch(`${localStorage.getItem('server-url')}/user/delete`, {
        method: 'DELETE',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({username})
        })
    if (response.status === 200) {
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}

export async function createUser(user){
    const result = ipcRenderer.sendSync('confirm', `¿Desea guardar los cambios?`)
    if (!result) return
    const response = await fetch(`${localStorage.getItem('server-url')}/user/register`, {
        method: 'POST',
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(user)
        })
    if (response.status === 200) {
        return ipcRenderer.sendSync('alert', await response.json())
    }else if (response.status === 202){
        return ipcRenderer.sendSync('alert', (await response.json()).join('\n'))
    }
    return ipcRenderer.sendSync('alert', 'Error!')
}