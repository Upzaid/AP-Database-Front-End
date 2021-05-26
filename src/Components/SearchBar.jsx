import React from 'react'
import Search from '../Useful Functions/Search'


function SearchBar(props){

    async function submit(e){
        e.preventDefault()
        const field = document.getElementById('field').value
        const data = document.getElementById('data').value
        console.log(field, data);
        const search = await Search(props.model, field, data)
        if (search) props.function(search)
    }

    return(
            <div className="search">
                <form onSubmit={(e)=>{submit(e)}} className="">
                    <label >Buscar:</label>
                    <input type="text" id="data"/>
                    <label >Filtro:</label>
                    <select id="field">
                        {props.filters.map(filter=>{
                            return(
                                <option key={filter} value={filter}>{filter}</option>
                            )
                        })}
                    </select>
                    <button type="submit" className="btn">Buscar</button>
                </form>
            </div>
    )
}

export default SearchBar