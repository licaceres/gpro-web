import React, { Component } from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class TblUsuario extends Component {

    componentDidMount() {
        console.log(this.el);
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                data: this.props.data,
                columns: [
                    { 'title': 'Id Usuario', 'data': 'id' },
                    { 'title': 'Nombre de Usuario', 'data': 'username' },
                    { 'title': 'Id Rol', 'data': 'idRol' },
                    { 'title': 'Id Empleado', 'data': 'idEmpleado' },
                    { 'title': 'Apellido', 'data': 'apellidoEmpleado' },
                    { 'title': 'Nombre', 'data': 'nombreEmpleado' },
                    { 'title': 'DNI', 'data': 'dni' },

                ]
            }
        )
    }

    componentWillUnmount() {
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }

    render() {
        return (
            <div>
                <table className="display" width="100%" ref={el => this.el = el}>
                </table>
            </div>
        )
    }

}