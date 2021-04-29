import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MainWindow from './Components/MainWindow'

function Routes () {
    return(
    <Router>
        <Route path="/" exact component={MainWindow}/>
        <Route path="/" exact component=""/>
        <Route path="/" exact component=""/>
    </Router>
    )
}

export default Routes