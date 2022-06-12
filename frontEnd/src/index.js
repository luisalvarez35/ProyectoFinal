import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import './style.css';
import Empleados from "./services/Empleados";
import Clientes from "./services/Clientes";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Switch } from 'react-router-dom'
import Proveedores from "./services/Proveedores";
import Categorias from "./services/Categorias";
import Productos from "./services/Productos";
import PedidosClientes from "./services/PedidosClientes";
import LineasPedido from "./services/LineasPedido";
import Facturas from "./services/Facturas";
import DetallesFactura from "./services/DetallesFactura";
import Bar from "./components/Bar";

ReactDOM.render(<React.StrictMode>
                                <Router>
                                    <Switch>
                                        <Route exact path="/" component={Bar} />
                                        <Route exact path="/empleados" component={Bar} />
                                        <Route exact path="/clientes" component={Bar} />
                                        <Route exact path="/proveedores" component={Bar} />
                                        <Route exact path="/categorias" component={Bar} />
                                        <Route exact path="/productos" component={Bar} />
                                        <Route exact path="/pedidosClientes" component={Bar} />
                                        <Route exact path="/lineasPedido/:idPedido" component={Bar} />
                                        <Route exact path="/facturas" component={Bar} />
                                    </Switch>
                                </Router>

                </React.StrictMode>, document.getElementById('nav'));

ReactDOM.render(<React.StrictMode>
                                <Router>
                                    <Switch>
                                        <Route exact path="/empleados" component={Empleados} />
                                        <Route exact path="/clientes" component={Clientes} />
                                        <Route exact path="/proveedores" component={Proveedores} />
                                        <Route exact path="/categorias" component={Categorias} />
                                        <Route exact path="/productos" component={Productos} />
                                        <Route exact path="/pedidosClientes" component={PedidosClientes} />
                                        <Route exact path="/lineasPedido/:idPedido" component={LineasPedido} />
                                        <Route exact path="/detallesFactura/:idFactura" component={DetallesFactura} />
                                        <Route exact path="/facturas" component={Facturas} />
                                    </Switch>
                                </Router>
                </React.StrictMode>, document.getElementById('content'));

reportWebVitals();
