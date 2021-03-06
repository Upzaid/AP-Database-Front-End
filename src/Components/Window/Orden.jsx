import React from 'react'
import {useLocation} from 'react-router-dom'
import OrdenEdit from '../Forms/OrdenEdit'
import OrdenNew from '../Forms/OrdenNew'

export default function Orden(){
    
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    
    const mode = searchParams.get('mode')

    
    if (mode === 'edit') return(
        <OrdenEdit />
    )   
    return(
        <OrdenNew />
    )
}
