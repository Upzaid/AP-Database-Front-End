import React from 'react'
import {useLocation} from 'react-router-dom'
import PersonalEdit from '../Forms/PersonalEdit'
import PersonalNew from '../Forms/PersonalNew'

export default function Personal (){
    
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const mode = searchParams.get('mode')

    if (mode === 'edit'){
        return(
            <PersonalEdit />
        )
    }
    return (
        <PersonalNew />
    )
}