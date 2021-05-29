import React from 'react'
import {useLocation} from 'react-router-dom'
import NavieraEdit from '../Forms/NavieraEdit'
import NavieraNew from '../Forms/NavieraNew'

export default function Naviera(){

    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const mode = searchParams.get('mode')

    if (mode === 'edit')return(
        <NavieraEdit />
    ) 
    return(
        <NavieraNew />
    )
}