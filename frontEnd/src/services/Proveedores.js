import React, {Component, useState} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import MyModalComponent from "./MyModalComponent";
import FormProveedores from "./FormProveedores";

class Proveedores extends Component {

    state = {
        show: false,
        title: '',
        body: '',
        footer:'',
        proveedores: []


    }
    //Peticiones al servidor antes de render
    componentDidMount() {
        this.refresh();
    }

    deleteModal = (row) => {
        this.setState({
            show: true,
            title: 'Eliminar Proveedor',
            body:  'Desea eliminar el proveedor?',
            footer: <div>
                        <Button variant="danger" onClick={() => this.delete(row)} >Eliminar</Button>
                        <Button variant="primary" onClick={() => this.handleClose()} >Cerrar</Button>
                    </div>
        });
    };
    editModal = (row) => {
        this.setState({
            show: true,
            title: 'Editar Proveedor',
            body:   <FormProveedores
                    id={row.id}
                    Cerrar={this.handleClose}
                    refresh={this.refresh()}
                    />,
        });
    };
    newModal = () => {
        this.setState({
            show: true,
            title: 'Nuevo Proveedor',
            body:   <FormProveedores
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
        axios.get(`http://localhost:8080/proveedores/rest`)
            .then(res => {
                const proveedores = res.data;
                this.setState({ proveedores });
                console.log(this.state.proveedores);
            })
    };

    delete = (row) => {
            axios({
                method: 'delete',
                url: `http://localhost:8080/proveedores/rest/delete/`+ row.id,
            }).then(res => {
                this.refresh();
                this.handleClose();
            }).catch(function (error) {
                console.log(error.response.status);
                if(error.response.status==500){
                    alert("Este campo no se puede eliminar. Existen campos que dependen de el")
                }

            });

    };


    
    render() {

                const columns = [
                    {
                        name: 'Id',
                        selector: row => row.id,
                    },
                    {
                        name: 'Codigo Proveedor',
                        selector: row => row.codProveedor,
                    },
                    {
                        name: 'Nombre',
                        selector: row => row.nombre,
                    },
                    {
                        name: 'Direccion',
                        selector: row => row.direccion,
                    },
                    {
                        name: 'Pais',
                        selector: row => row.pais,
                    },
                    {
                        name: 'NIF/CIF',
                        selector: row => row.nifCif,
                    },
                    {
                        name: 'Contacto',
                        selector: row => row.contacto,
                    },
                    {
                        name: 'Email',
                        selector: row => row.email,
                    },
                    {
                        name: 'Comentarios',
                        selector: row => row.comentarios,
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

                const data = this.state.proveedores;

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

export default Proveedores;