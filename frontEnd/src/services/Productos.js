import React, {Component, useState} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import MyModalComponent from "./MyModalComponent";
import FormProductos from "./FormProductos";

class Productos extends Component {

    state = {
        show: false,
        title: '',
        body: '',
        footer:'',
        productos: []


    }
    //Peticiones al servidor antes de render
    componentDidMount() {
        this.refresh();
    }

    deleteModal = (row) => {
        this.setState({
            show: true,
            title: 'Eliminar Producto',
            body:  'Desea eliminar el producto?',
            footer: <div>
                        <Button variant="danger" onClick={() => this.delete(row)} >Eliminar</Button>
                        <Button variant="primary" onClick={() => this.handleClose()} >Cerrar</Button>
                    </div>
        });
    };
    editModal = (row) => {
        this.setState({
            show: true,
            title: 'Editar Producto',
            body:   <FormProductos
                    id={row.id}
                    Cerrar={this.handleClose}
                    refresh={this.refresh()}
                    />,
        });
    };
    newModal = () => {
        this.setState({
            show: true,
            title: 'Nuevo Producto',
            body:   <FormProductos
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
        axios.get(`http://localhost:8080/productos/rest`)
            .then(res => {
                const productos = res.data;
                this.setState({ productos });
                console.log(this.state.productos);
            })
    };

    delete = (row) => {
            axios({
                method: 'delete',
                url: `http://localhost:8080/productos/rest/delete/`+ row.id,
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
                        name: 'Nombre',
                        selector: row => row.nombre,
                    },
                    {
                        name: 'Descripcion',
                        selector: row => row.descripcion,
                    },
                    {
                        name: 'Precio Compra',
                        selector: row => row.precioCompra,
                    },
                    {
                        name: 'Precio Venta',
                        selector: row => row.precioVenta,
                    },
                    {
                        name: 'Stock',
                        selector: row => row.stock,
                    },
                    {
                        name: 'Categoria',
                        selector: row => row.categorias.nombre,
                    },
                    {
                        name: 'Proveedor',
                        selector: row => row.proveedores.nombre,
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

                const data = this.state.productos;

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

export default Productos;