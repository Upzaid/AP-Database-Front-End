import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

export default function Orden(){
    
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const serie = searchParams.get('serie')
    const folio = searchParams.get('folio')
    
    // Possible modes should be edit or new
    const [mode, setMode] =useState(searchParams.get('mode'))
    
    const [naviera, setNaviera] = useState()
    const [navierasArray, setNavierasArray] = useState([])
    
    const [placas, setPlacas] = useState()
    const [operado, setOperador] = useState()

    useEffect(()=>{
        // TODO API CALL FOR SPECIFIC ORDEN
    },[mode])

    function submit (e){
        e.preventDeafult()
    }

    return(
        <div  className="window">
            <h1 className='title' >{mode === 'new' ? 'Nueva' : null} Orden {mode === 'new' ? null : `${serie} - ${folio}`}</h1>
            <form onSubmit={(e)=> submit(e)}>
                <label htmlFor="">Naviera:</label>
                <select name="" id="" defaultValue={mode === 'new'? null : naviera}>
                    {mode === 'new' 
                    ? navierasArray.map(naviera =>{
                        return(
                                <option value="">{naviera}</option>
                            )
                        }) 
                    : null}
                </select>
            </form>
        </div>
    )
}
