import React, { useEffect } from 'react'

function SideMenuButton (props){
    
    useEffect(()=>{
        if(props.name === 'Inicio'){
            setActive()
        }
    },[])

    function setActive() {
        const sideMenu = document.querySelector('.side-menu')
        sideMenu.querySelectorAll('.button').forEach(button=>{
           
            if(button.id === props.name && button.classList[button.classList.length-1] === 'active'){
                return
            }else if(button.id === props.name){
                button.classList.toggle('active')
                return
            }else {
                button.classList.remove('active')
            }
        })
    }

    function clickFunction(){
        setActive()
        if(props.function){

            props.function()
        }
    }
    

    return(
            <div id={props.name} className="button" onClick={()=> clickFunction()}>
                {props.image ? <img src={props.image} alt=""/> : null}
                <span>{props.name}</span>
            </div>
    )
}

export default SideMenuButton