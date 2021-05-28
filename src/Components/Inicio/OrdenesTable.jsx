import React, {useState, useEffect} from 'react'
import Search from '../../Useful Functions/Search'
import {openOrden} from '../../Useful Functions/Orden'

export default function OrdenesTable(){
    
    const [ordenes, setOrdenes] = useState([])

    useEffect(()=>{
        findOrdenes()
    }, [ordenes])

    async function findOrdenes(){
        setOrdenes(await Search('orden', 'estatus', 'Activo'))
    }

    return (
        <div>
            <h2 className="title">{ordenes.length} Servicios en Progreso</h2>
            <div className="frame">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Serie</th>
                            <th>Folio</th>
                            <th>Operador</th>
                            <th>Naviera</th>
                            <th>Consignatario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map(orden =>{
                            return(
                                <tr key={`${orden.serie} ${orden.folio}`} className="row">
                                    <td onClick={()=> openOrden(orden.serie, orden.folio)} className="pointer">Abrir</td>
                                    <td>{orden.serie}</td>
                                    <td>{orden.folio}</td>
                                    <td>{orden.operador.nombres} {orden.operador.primer_apellido} {orden.operador.segundo_apellido}</td>
                                    <td>{orden.naviera.razon_social}</td>
                                    <td>{orden.consignatario.razon_social}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}