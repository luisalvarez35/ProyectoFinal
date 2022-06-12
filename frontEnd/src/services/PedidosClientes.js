import React, {Component, useState} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import MyModalComponent from "./MyModalComponent";
import FormPedidosClientes from "./FormPedidosClientes";


class PedidosClientes extends Component {

    state = {
        show: false,
        title: '',
        body: '',
        footer:'',
        pedidosClientes: []


    }
    //Peticiones al servidor antes de render
    componentDidMount() {
        this.refresh();
    }

    deleteModal = (row) => {
        this.setState({
            show: true,
            title: 'Eliminar Pedido',
            body:  'Desea eliminar el pedido?',
            footer: <div>
                        <Button variant="danger" onClick={() => this.delete(row)} >Eliminar</Button>
                        <Button variant="primary" onClick={() => this.handleClose()} >Cerrar</Button>
                    </div>
        });
    };

    editModal = (row) => {
        this.setState({
            show: true,
            title: 'Editar Pedido',
            body:   <FormPedidosClientes
                    id={row.id}
                    Cerrar={this.handleClose}
                    refresh={this.refresh()}
                    />,
        });
    };


    newModal = () => {
        this.setState({
            show: true,
            title: 'Nuevo Pedido',
            body:   <FormPedidosClientes
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
        axios.get(`http://localhost:8080/pedidosClientes/rest`)
            .then(res => {
                const pedidosClientes = res.data;
                this.setState({ pedidosClientes });
                console.log(this.state.pedidosClientes);
            })
    };

    delete = (row) => {
            axios({
                method: 'delete',
                url: `http://localhost:8080/pedidosClientes/rest/delete/`+ row.id,
            }).then(res => {
                this.refresh();
                this.handleClose();
            });

    };

    
    render() {

                const columns = [
                    {
                        name: 'Id',
                        selector: row => row.id,
                    },
                    {
                        name: 'Cliente',
                        selector: row => row.clientes.nombre,
                    },
                    {
                        name: 'Fecha',
                        selector: row => row.fecha,
                    },
                    {
                        name: 'Descripcion',
                        selector: row => row.descripcion,
                    },
                    {
                        name: 'Base Imponible',
                        selector: row => row.baseImponible,
                    },
                    {
                        name: 'IVA',
                        selector: row => row.iva,
                    },
                    {
                        name: 'Total',
                        selector: row => row.total,
                    },
                    {
                        name: 'Empleado',
                        selector: row => row.empleados.nombre,
                    },
                    {   name: 'Detalles',
                        cell: (row) =>  <div>
                                            <Button href={"/LineasPedido/"+row.id}  className="btn btn-secondary" title="Detalles" >Detalles</Button>
                                        </div>
                    ,
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    },
                    {   name: 'Editar',
                        cell: (row) => <div>
                            <Button className="btn btn-info" title="Editar" onClick={() => this.editModal(row)}>Editar</Button>

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

                const data = this.state.pedidosClientes;

        return (
            <div>
                <Button variant="primary" onClick={this.newModal}>Nuevo</Button>
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

export default PedidosClientes;