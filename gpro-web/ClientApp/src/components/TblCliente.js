import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

        var tableAPI = this.$el.DataTable(
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
                            return '<button type="button" id="btnEdit" class="btn btn-warning" data-toggle="modal" data-id="' + row.idCliente +'" data-target="#exampleModalCenter" onclick="console.log(' + row.idCliente + ')"> <span class="fa fa-edit"></span> <span class="hidden-xs"> Editar</span></button >';
                        }

                    },

                ],
                language: {
                    'url': '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
                },

            },

        )

        function btnEditar(tbody, idBtn) {
            $(tbody).on("click", idBtn, function () {
                var data = tableAPI.row($(this).parents("tr")).data();
                $('#idclienteinput').val(data.idCliente);
                $('#razonsocialclienteinput').val(data.razonSocialCliente);
                $('#apellidoclienteinput').val(data.apellidoCliente);
                $('#nombreclienteinput').val(data.nombreCliente);
                $('#direccionclienteinput').val(data.direccionCliente);
                $('#telefonoclienteinput').val(data.telefonoCliente);
                $('#emailclienteinput').val(data.emailCliente);
            })

        }

        btnEditar('#tblCliente tbody', '#btnEdit');
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
            <div className="border rounded p-2 mt-4">
                <h5 className="border-bottom pb-2 mb-3">Resultados</h5>
                <table id="tblCliente" className="table-sm table-striped table-hover" width="100%" ref={el => this.el = el}>
                </table>

                {/* Bootstrap Modal */}
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Editar [ Cliente ]</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* Formulario */}
                            <Formik
                                initialValues={{ idcliente: '', razonsocialcliente: '', apellidocliente: '', nombrecliente: '', direccioncliente: '', telefonocliente: '', emailcliente: '' }}
                                validationSchema={Yup.object().shape(
                                    {
                                        idcliente: Yup.string().required('Campo requerido.'),
                                        direccioncliente: Yup.string().required('Campo requerido.'),
                                        telefonocliente: Yup.string().required('Campo requerido.'),
                                        emailcliente: Yup.string().required('Campo requerido.')
                                    })}
                                onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                                    setStatus();

                                    {/* completar */ }

                                }}>
                                {({ errors, status, touched, isSubmitting }) => (
                                    <Form>
                                        <div className="modal-body">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col mr-4 mr-4">
                                                        <div className="form-group row">
                                                            <label htmlFor="idcliente" className="col-sm-3 col-form-label">CUIT:</label>
                                                            <div class="col-sm-9">
                                                                <Field id="idclienteinput" name="idcliente" type="text" className={'form-control' + (errors.idcliente && touched.idcliente ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="idcliente" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="razonsocialcliente" className="col-sm-3 col-form-label">Razón Social:</label>
                                                            <div class="col-sm-9">
                                                                <Field id="razonsocialclienteinput" name="razonsocialcliente" type="text" className={'form-control'} />
                                                                <ErrorMessage name="razonsocialcliente" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="apellidocliente" className="col-sm-3 col-form-label">Apellido:</label>
                                                            <div class="col-sm-9">
                                                                <Field id="apellidoclienteinput" name="apellidocliente" type="text" className={'form-control'} />
                                                                <ErrorMessage name="apellidocliente" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="nombrecliente" className="col-sm-3 col-form-label">Nombre:</label>
                                                            <div class="col-sm-9">
                                                                <Field id="nombreclienteinput" name="nombrecliente" type="text" className={'form-control'} />
                                                                <ErrorMessage name="nombrecliente" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col ml-4 mr-4">
                                                        <div className="form-group row">
                                                            <label htmlFor="direccioncliente" className="col-sm-3 col-form-label">Dirección:</label>
                                                            <div class="col-sm-9">
                                                                <Field id="direccionclienteinput" name="direccioncliente" type="text" className={'form-control' + (errors.direccioncliente && touched.direccioncliente ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="direccioncliente" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="telefonocliente" className="col-sm-3 col-form-label">Teléfono:</label>
                                                            <div class="col-sm-9">
                                                                <Field id="telefonoclienteinput" name="telefonocliente" type="text" className={'form-control' + (errors.telefonocliente && touched.telefonocliente ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="telefonocliente" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="emailcliente" className="col-sm-3 col-form-label">E-Mail:</label>
                                                            <div class="col-sm-9">
                                                                <Field id="emailclienteinput" name="emailcliente" type="text" className={'form-control' + (errors.emailcliente && touched.emailcliente ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="emailcliente" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Cerrar</button>
                                                <button type="submit" className="btn btn-primary ml-2" disabled={isSubmitting}>Guardar cambios</button>
                                            </div>
                                                {status && <div className={'alert alert-danger'}>El CUIT ya existe en la Base de Datos.</div>}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            {/* Fin Formulario */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}