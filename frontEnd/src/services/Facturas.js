import React, {Component, useState} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import MyModalComponent from "./MyModalComponent";

class Facturas extends Component {

    state = {
        show: false,
        title: '',
        body: '',
        footer:'',
        facturas: []

    }
    //Peticiones al servidor antes de render
    componentDidMount() {
        this.refresh();
    }

    deleteModal = (row) => {
        this.setState({
            show: true,
            title: 'Eliminar Factura',
            body:  'Desea eliminar la factura?',
            footer: <div>
                        <Button variant="danger" onClick={() => this.delete(row)} >Eliminar</Button>
                        <Button variant="primary" onClick={() => this.handleClose()} >Cerrar</Button>
                    </div>
        });
    };


    handleClose = () => {
        this.setState({
            show: false,
            footer:''
        });

    };

    refresh = () =>{
        axios.get(`http://localhost:8080/facturas/rest`)
            .then(res => {
                const facturas = res.data;
                this.setState({ facturas });
                console.log(this.state.facturas);
            })
    };

    delete = (row) => {
            axios({
                method: 'delete',
                url: `http://localhost:8080/facturas/rest/delete/`+ row.id,
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
                        selector: row => row.cliente,
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
                        selector: row => row.empleado,
                    },
                    {   name: 'Imprimir',
                        cell: (row) =>  <div>
                            <Button href={"/detallesFactura/"+row.id}  className="btn btn-secondary" title="Imprimir" >Imprimir</Button>
                        </div>
                        ,
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
                    }
                ];

                const data = this.state.facturas;

        return (
            <div>
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

export default Facturas;