import React from 'react'
import {useLocation} from 'react-router-dom'
import AnticipoNew from '../Forms/AnticipoNew'
import AnticipoEdit from '../Forms/AnticipoEdit'

export default function Anticipo (){
    
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const mode = searchParams.get('mode')

    if (mode === 'edit') return(
        <AnticipoEdit />
    )
    return(
        <AnticipoNew />
    )
    
}
