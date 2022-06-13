import React, {Component, useState} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import MyModalComponent from "./MyModalComponent";
import FormCategorias from "./FormCategorias";

class Categorias extends Component {

    state = {
        show: false,
        title: '',
        body: '',
        footer:'',
        categorias: []


    }
    //Peticiones al servidor antes de render
    componentDidMount() {
        this.refresh();
    }

    deleteModal = (row) => {
        this.setState({
            show: true,
            title: 'Eliminar Categoria',
            body:  'Desea eliminar el categoria?',
            footer: <div>
                        <Button variant="danger" onClick={() => this.delete(row)} >Eliminar</Button>
                        <Button variant="primary" onClick={() => this.handleClose()} >Cerrar</Button>
                    </div>
        });
    };
    editModal = (row) => {
        this.setState({
            show: true,
            title: 'Editar Categoria',
            body:   <FormCategorias
                    id={row.id}
                    Cerrar={this.handleClose}
                    refresh={this.refresh()}
                    />,
        });
    };
    newModal = () => {
        this.setState({
            show: true,
            title: 'Nuevo Categoria',
            body:   <FormCategorias
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
        axios.get(`http://localhost:8080/categorias/rest`)
            .then(res => {
                const categorias = res.data;
                this.setState({ categorias });
                console.log(this.state.categorias);
            })
    };

    delete = (row) => {
        axios({
            method: 'delete',
            url: `http://localhost:8080/categorias/rest/delete/` + row.id,
        }).then(res => {
            console.log(res.status)
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
                        name: 'Nombre',
                        selector: row => row.nombre,
                    },
                    {
                        name: 'Descripcion',
                        selector: row => row.descripcion,
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

                const data = this.state.categorias;

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

export default Categorias;