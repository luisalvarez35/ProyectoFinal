import React, { Component } from 'react';

class Bar extends Component {

    componentDidMount() {

    }

    render() {
        return(
            <div>

                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a href="/"  className="nav_logo"> <i className='fa fa-g nav_logo-icon'></i>

                    </a>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a href="/empleados"  className="nav-link color">
                                <i className="fa fa-user nav_icon"></i>
                                <span className="nav_name">Empleados</span>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a href="/clientes"  className="nav-link color">
                                <i className="fa fa-address-book nav_icon"></i>
                                <span className="nav_name">Clientes</span>

                            </a>
                        </li>

                        <li className="nav-item active">
                            <a href="/proveedores"  className="nav-link color">
                                <i className="fa fa-dolly nav_icon"></i>
                                <span className="nav_name">Proveedores</span>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a href="/productos"  className="nav-link color">
                                <i className="fa fa-barcode nav_icon"></i>
                                <span className="nav_name">Productos</span>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a href="/categorias"  className="nav-link color">
                                <i className="fa fa-tags nav_icon"></i>
                                <span className="nav_name">Categorias</span>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a href="/pedidosClientes"  className="nav-link color">
                                <i className="fa fa-cart-flatbed"></i>
                                <span className="nav_name">Pedidos</span>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a href="/facturas"  className="nav-link color">
                                <i className="fa fa-file-invoice nav_icon"></i>
                                <span className="nav_name">Facturas</span>
                            </a>
                        </li>

                    </ul>
                </nav>

            </div>

        );
    }
}
export default Bar;