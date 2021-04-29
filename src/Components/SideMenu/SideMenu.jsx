import React from 'react'
import Button from '../Button'


function SideMenu (props) {

    return (
        <div className="side-menu">
            {props.buttons.map(button =>{
                return(
                    <Button key={button.name} name={button.name} image={button.image} function={button.function}/>
                )
            })}
        </div>
    )
}

export default SideMenu