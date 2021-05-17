import React from 'react'
import {useLocation} from 'react-router-dom'
import UnidadNew from '../Forms/UnidadNew'
import UnidadEdit from '../Forms/UnidadEdit'

export default function Unidad(){
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const mode = searchParams.get('mode')
    
    if (mode === 'edit') return(
        <UnidadEdit />
    )
    return(
        <UnidadNew />
    )
}