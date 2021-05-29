import React from 'react'
import {useLocation} from 'react-router-dom'
import ClienteEdit from '../Forms/ClienteEdit'
import ClienteNew from '../Forms/ClienteNew'

export default function Cliente(){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const mode = searchParams.get('mode')

    if (mode === 'edit')return(
        <ClienteEdit />
    ) 
    return(
        <ClienteNew />
    )
}