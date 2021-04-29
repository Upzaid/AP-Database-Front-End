import React, {useState} from 'react'
import Button from './Button'

function SearchBar(props){

    function submit(e){
        e.preventDefault()
        if (props.funcion){
            props.function()
        }
        
    }

    return(
            <form onSubmit={(e)=>{submit(e)}} className="">
                <label htmlFor="">Buscar:</label>
                <input type="text"/>
                <label htmlFor="">Filtro:</label>
                <select name="" id="">
                    {props.filters.map(filter=>{
                        return(
                            <option value={filter}>{filter}</option>
                        )
                    })}
                </select>
                <button type="submit" className="btn">Buscar</button>
            </form>
    )
}

export default SearchBar