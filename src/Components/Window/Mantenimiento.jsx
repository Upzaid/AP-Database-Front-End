import React from 'react'
import {useLocation} from 'react-router-dom'
import MantenimientoNew from '../Forms/MantenimientoNew'
import MantenimientoEdit from '../Forms/MantenimientoEdit'

export default function Mantenimiento(){
    
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const mode = searchParams.get('mode') 
    
    if (mode === 'edit') return(
        <MantenimientoEdit />
    )
    return(
        <MantenimientoNew />
    )
}