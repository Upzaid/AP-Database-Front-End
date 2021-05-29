import React from 'react'
import SideMenuButton  from './SideMenuButton'

function SideMenu (props) {

    return (
        <div className="side-menu">
            {props.buttons.map(button =>{
                return(
                    <SideMenuButton key={button.name} name={button.name} image={button.image} function={button.function}/>
                )
            })}
        </div>
    )
}

export default SideMenu