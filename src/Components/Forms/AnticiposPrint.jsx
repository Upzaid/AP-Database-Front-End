import React, {useState} from 'react'
import {printAnticipos, getAnticiposRange} from '../../Useful Functions/Anticipo'

export default function AnticiposPrint(){

    const [anticipos, setAnticipos] = useState([])

    async function Search(){
        const start = document.getElementById('start').value
        const end = document.getElementById('end').value
        setAnticipos(await getAnticiposRange(start, end))
    }

    return(
        <div className="login">
            <h1 className="title">Imprimir Antcipos</h1>
            <form className="form">
                <label >De:</label>
                <input type="date" id="start" />
                <label >a:</label>
                <input type="date" id="end" />
                <button onClick={()=> Search()} type="button" className='btn'>Buscar</button>
                <br />
                <table>
                    <thead>
                        <th></th>
                        <th>Serie</th>
                        <th>Folio</th>
                        <th>Fecha</th>
                    </thead>
                    <tbody>
                        {anticipos.map(anticipo =>{
                            return(
                                <tr key={`${anticipo.serie} ${anticipo.folio}`}>
                                    <td>Abrir</td>
                                    <td>{anticipo.serie}</td>
                                    <td>{anticipo.folio}</td>
                                    <td>{anticipo.fecha.split('T')[0]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />
                <button type="button" onClick={()=> printAnticipos(anticipos)} className="btn">PDF</button>
            </form>
        </div>
    )
}