import React, { Component } from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net-buttons-bs4');

export class TblCliente extends Component {

    constructor(props) {
        super(props);
        this.tableAPI = null;
    }

    componentDidMount() {
        console.log(this.el);
        this.$el = $(this.el);      

        this.tableAPI = this.$el.DataTable(
            {
                data: this.props.data,
                columns: [
                    { 'title': 'CUIT', 'data': 'idCliente' },
                    { 'title': 'R. Social', 'data': 'razonSocialCliente' },
                    { 'title': 'Apellido', 'data': 'apellidoCliente' },
                    { 'title': 'Nombre', 'data': 'nombreCliente' },
                    { 'title': 'Dirección', 'data': 'direccionCliente' },
                    { 'title': 'Teléfono', 'data': 'telefonoCliente' },
                    { 'title': 'E-Mail', 'data': 'emailCliente' },
                    {
                        'sortable': false,
                        'render': function (data, type, row) {
                            return '<button type="button" id="btnEdit" class="btn btn-warning" data-toggle="modal" data-id="' + row.idCliente + '" data-target="#exampleModalCenter" onclick="console.log(' + row.idCliente + ')"> <span class="fa fa-edit"></span> <span class="hidden-xs"> Editar</span></button >';
                        }
                        
                    },

                ],
                language: {
                    'url': '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
                },

            },
                
        )

        function btnEditar(idBtn) {
            $(document).on("click", idBtn, function () {
                var dataId = $(this).attr("data-id");                
                $('.modal-title').text('Editar CUIT: ' + dataId);
            })
            
        }

        btnEditar('#btnEdit');
    }

    componentDidUpdate() {
        this.tableAPI.clear();
        this.tableAPI.rows.add(this.props.data);
        this.tableAPI.draw()
    }

    UNSAFE_componentWillUnmount() {
        this.$el.DataTable().destroy(true);
    }

    render() {

        return (
            <div>
                <table id="tblCliente" className="table-sm table-striped table-hover" width="100%" ref={el => this.el = el}>
                </table>
                
                {/* Bootstrap Modal */}
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Editar Cliente</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                
                             </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
        )
    }

}