import React from 'react'

function Button(props){
    return(
        <div onClick={()=>{props.function()}} className="btn pointer">
                <img src={props.image} alt=""/>
                <span>{props.name}</span>
        </div>
    )
}

export default Button