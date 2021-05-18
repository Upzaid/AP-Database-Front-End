import React from 'react'
import {useLocation} from 'react-router-dom'
import LiquidacionEdit from '../Forms/LiquidacionEdit'
import LiquidacionNew from '../Forms/LiquidacionNew'

export default function Liquidacion(){
    
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const mode = searchParams.get('mode')
    
    if (mode === 'edit')return (
        <LiquidacionEdit />
    )
    return(
        <LiquidacionNew />
    )
}