import React from 'react'
import {useLocation} from 'react-router-dom'
import FacturaNew from '../Forms/FacturaNew'
import FacturaEdit from '../Forms/FacturaEdit'

export default function Factura (){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const mode = searchParams.get('mode')

    if (mode === 'edit') return(
        <FacturaEdit />
    )
    return(
        <FacturaNew />
    )
}