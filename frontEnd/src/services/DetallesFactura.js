import React, {Component} from 'react';
import axios from 'axios';

class DetallesFactura extends Component {


    state = {
        factura: [],
        lineasFactura: []
    }


    //Peticiones al servidor antes de render
    componentDidMount() {
        this.refresh();
    }


    refresh = () =>{

        axios.get(`http://localhost:8080/lineasFacturas/rest/`+ this.props.match.params.idFactura)
            .then(res => {
                const lineasFactura = res.data;
                this.setState({ lineasFactura });
                console.log(this.state.lineasFactura);
            })

        axios.get(`http://localhost:8080/facturas/rest/`+ this.props.match.params.idFactura)
            .then(res => {
                const factura = res.data;
                this.setState({ factura });
                console.log(this.state.factura);
            })

    };

    renderTableData() {
        return this.state.lineasFactura.map((linea, index) => {
            const { id, producto, descripcion, precio, cantidad, total } = linea
            return (
                <tr key={id}>
                    <td>{producto}</td>
                    <td>{descripcion}</td>
                    <td>{precio}</td>
                    <td>{cantidad}</td>
                    <td>{precio*cantidad}</td>
                </tr>
            )
        })
    }


    
    render() {
        if (window?.location.pathname === '/detallesFactura/'+ this.props.match.params.idFactura)
            require('../factura.css')

        return (


                <div>
                <header>
                    <h1>Factura</h1>
                    <address>
                        <p>{this.state.factura.direccionCliente}</p>
                    </address>
                </header>
                <article>
                    <h1>Recipient</h1>
                    <address>
                        <p>GESTION APP</p>
                    </address>
                    <table className="meta">
                        <tr>
                            <th>Factura #</th>
                            <td>{this.state.factura.id}</td>
                        </tr>
                        <tr>
                            <th>Fecha</th>
                            <td>{this.state.factura.fecha}</td>
                        </tr>
                    </table>
                    <table className="inventory">
                        <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                    <table className="balance">
                        <tr>
                            <th>Base Imponible</th>
                            <td>{this.state.factura.baseImponible}</td>
                        </tr>
                        <tr>
                            <th>IVA</th>
                            <td>{this.state.factura.iva}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>{this.state.factura.total}</td>
                        </tr>
                    </table>
                </article>
                <aside>
                    <h1>Notas</h1>
                    <div>
                        <p>
                            {this.state.factura.descripcion}
                        </p>
                    </div>
                </aside>
                </div>


        )
    }
}

export default DetallesFactura;