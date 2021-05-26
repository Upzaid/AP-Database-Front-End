export default async function Search(model, field, data){
    const response = await fetch(`${localStorage.getItem('server-url')}/${model}/search?field=${field}&data=${data}`, {
        headers : {
                'auth-token': localStorage.getItem('auth-token'),
            } 
        })
    if (response.status === 200) return await response.json()
    return
}