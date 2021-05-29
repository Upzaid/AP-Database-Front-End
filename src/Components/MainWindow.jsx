import React, {useState} from 'react'

// Assets
import Anticipos from '../Assets/Anticipos.svg'
import Clientes from '../Assets/Clientes.svg'
import Facturas from '../Assets/Facturas.svg'
import Liquidaciones from '../Assets/Liquidaciones.svg'
import Mantenimiento from '../Assets/Mantenimiento.svg'
import Navieras from '../Assets/Navieras.svg'
import Orden from '../Assets/Orden.svg'
import Personal from '../Assets/Personal.svg'
import Unidades from '../Assets/Unidades.svg'
import Inicio from '../Assets/Inicio.svg'

// Components
import SideMenu from '../Components/SideMenu/SideMenu'

// Frames
import InicioFrame from './Frames/InicioFrame'
import OrdenesFrame from './Frames/OrdenesFrame'
import FacturasFrame from './Frames/FacturasFrame'
import AnticiposFrame from './Frames/AnticiposFrame'
import LiquidacionesFrame from './Frames/LiquidacionesFrame'
import ClientesFrame from './Frames/ClientesFrame'
import NavierasFrame from './Frames/NavierasFrame'
import PersonalFrame from './Frames/PersonalFrame'
import UnidadesFrame from './Frames/UnidadesFrame'
import MantenimientoFrame from './Frames/MantenimientoFrame'

function MainWindow(){

    const [content, setContent] =useState(<InicioFrame />)

    const buttonArray = [
        {image: Inicio, name: 'Inicio', function: () =>{setContent(<InicioFrame />)}},
        {image: Orden, name: 'Ordenes', function: () =>{setContent(<OrdenesFrame />)}},
        {image: Facturas, name: 'Facturas', function: () =>{setContent(<FacturasFrame />)}},
        {image: Anticipos, name: 'Anticipos', function: () =>{setContent(<AnticiposFrame />)}},
        {image: Liquidaciones, name: 'Liquidaciones', function: () =>{setContent(<LiquidacionesFrame />)}},
        {image: Navieras, name: 'Navieras', function: () =>{setContent(<NavierasFrame />)}},
        {image: Clientes, name: 'Clientes', function: () =>{setContent(<ClientesFrame />)}}, 
        {image: Personal, name: 'Personal', function: () =>{setContent(<PersonalFrame />)}}, 
        {image: Unidades, name: 'Unidades', function: () =>{setContent(<UnidadesFrame />)}},
        {image: Mantenimiento, name: 'Mantenimiento', function: () =>{setContent(<MantenimientoFrame />)}},
    ]
   
    return(
        <div className="main-window">
            <SideMenu buttons={buttonArray}/>
            <div className="content-container">
                {content}
            </div>
        </div>
    )
}

export default MainWindow