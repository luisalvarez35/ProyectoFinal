import React, {Component, useState} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import MyModalComponent from "./MyModalComponent";
import FormLineasPedido from "./FormLineasPedido";

class LineasPedido extends Component {


    state = {
        show: false,
        title: '',
        body: '',
        footer:'',
        lineasPedido: []

    }


    //Peticiones al servidor antes de render
    componentDidMount() {
        this.refresh();
    }

    deleteModal = (row) => {
        this.setState({
            show: true,
            title: 'Eliminar Producto',
            body:  'Desea eliminar la Linea de Pedido?',
            footer: <div>
                        <Button variant="danger" onClick={() => this.delete(row)} >Eliminar</Button>
                        <Button variant="primary" onClick={() => this.handleClose()} >Cerrar</Button>
                    </div>
        });
    };
    editModal = (row) => {
        this.setState({
            show: true,
            title: 'Editar Linea de Pedido',
            body:   <FormLineasPedido
                    id={row.id}
                    idPedido={this.props.match.params.idPedido}
                    Cerrar={this.handleClose}
                    refresh={this.refresh()}
                    />,
        });
    };
    newModal = () => {
        this.setState({
            show: true,
            title: 'Nueva Linea de Pedido',
            body:   <FormLineasPedido
                    idPedido={this.props.match.params.idPedido}
                    Cerrar={this.handleClose}
                    refresh={this.refresh()}
                    />,
        });
    };

    handleClose = () => {
        this.setState({
            show: false,
            footer:''
        });

    };

    refresh = () =>{
        axios.get(`http://localhost:8080/lineasPedido/rest/detalles/`+ this.props.match.params.idPedido)
            .then(res => {
                const lineasPedido = res.data;
                this.setState({ lineasPedido });
                console.log(this.state.lineasPedido);
            })
    };

    delete = (row) => {
            axios({
                method: 'delete',
                url: `http://localhost:8080/lineasPedido/rest/delete/`+ row.id,
            }).then(res => {
                this.refresh();
                this.handleClose();
            });

    };

    generarFactura = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/facturas/rest/new/`+ this.props.match.params.idPedido,
        }).then(res => {
            //window.location = '/detallesFactura/'+ this.props.match.params.idPedido
            window.location = '/facturas'

        });

    };

    
    render() {

                const columns = [
                    {
                        name: 'Id',
                        selector: row => row.id,
                    },
                    {
                        name: 'Producto',
                        selector: row => row.productos.nombre,
                    },
                    {
                        name: 'Descripcion',
                        selector: row => row.descripcion,
                    },
                    {
                        name: 'Precio',
                        selector: row => row.productos.precioVenta,
                    },
                    {
                        name: 'Cantidad',
                        selector: row => row.cantidad,
                    },
                    {
                        name: 'Total',
                        selector: row => (row.productos.precioVenta * row.cantidad)
                    },
                    {   name: 'Editar',
                        cell: (row) => <div>

                                        <Button className="btn btn-info" title="Editar"  onClick={() => this.editModal(row)}>Editar</Button>
                                        </div>,
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    },
                    {   name: 'Borrar',
                        cell: (row) => <div>
                            <Button className="btn btn-danger" title="Borrar" onClick={() => this.deleteModal(row)}>Borrar</Button>

                        </div>,
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    },
                ];

                const data = this.state.lineasPedido;

        return (
            <div>
                <div>
                    <Button variant="primary" onClick={this.newModal}>Nuevo</Button>
                    <Button variant="info" onClick={this.generarFactura}>Generar Factura</Button>
                </div>
                <MyModalComponent
                    show={this.state.show}
                    title={this.state.title}
                    body={this.state.body}
                    footer={this.state.footer}
                    onClick={this.handleClose}
                    onHide={this.handleClose}
                    centered

                />
                <DataTable
                    columns={columns}
                    data={data}
                    striped
                    pagination
                />
            </div>
        )
    }
}

export default LineasPedido;