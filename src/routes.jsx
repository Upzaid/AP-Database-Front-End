import React from 'react'
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom'
import MainWindow from './Components/MainWindow'
import LogInForm from './Components/Forms/LogInForm'
import ConfigWindow from './Components/ConfigWindow'
import Orden from './Components/Window/Orden'
import Anticipo from './Components/Window/Anticipo'
import Personal from './Components/Window/Personal'
import Naviera from './Components/Window/Naviera'
import Cliente from './Components/Window/Cliente'
import Liquidacion from './Components/Window/Liquidacion'
import Mantenimiento from './Components/Window/Mantenimiento'
import Factura from './Components/Window/Factura'
import Unidad from './Components/Window/Unidad'
import Users from './Components/Window/Users'
import AnticiposPrint from './Components/Forms/AnticiposPrint'

function Routes () {
    if (process.env.NODE_ENV === 'development'){
        return(
        <BrowserRouter>
            <Switch>
                <Route path="/mainwindow" exact component={MainWindow}/>
                <Route path="/" exact component={LogInForm}/>
                <Route path="/config" exact component={ConfigWindow}/>
                <Route path="/orden" exact component={Orden}/>
                <Route path="/anticipo" exact component={Anticipo}/>
                <Route path="/anticipo/print" exact component={AnticiposPrint}/>
                <Route path="/personal" exact component={Personal}/>
                <Route path="/naviera" exact component={Naviera}/>
                <Route path="/cliente" exact component={Cliente}/>
                <Route path="/liquidacion" exact component={Liquidacion}/>
                <Route path="/mantenimiento" exact component={Mantenimiento}/>
                <Route path="/factura" exact component={Factura}/>
                <Route path="/unidad" exact component={Unidad}/>
                <Route path="/users" exact component={Users}/>
            </Switch>
        </BrowserRouter>
        )
    }else {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/mainwindow" exact component={MainWindow}/>
                    <Route path="/" exact component={LogInForm}/>
                    <Route path="/config" exact component={ConfigWindow}/>
                    <Route path="/orden" exact component={Orden}/>
                    <Route path="/anticipo" exact component={Anticipo}/>
                    <Route path="/anticipo/print" exact component={AnticiposPrint}/>
                    <Route path="/personal" exact component={Personal}/>
                    <Route path="/naviera" exact component={Naviera}/>
                    <Route path="/cliente" exact component={Cliente}/>
                    <Route path="/liquidacion" exact component={Liquidacion}/>
                    <Route path="/mantenimiento" exact component={Mantenimiento}/>
                    <Route path="/factura" exact component={Factura}/>
                    <Route path="/unidad" exact component={Unidad}/>
                    <Route path="/users" exact component={Users}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default Routes