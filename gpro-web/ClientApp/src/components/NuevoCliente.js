import React, { Component } from 'react';
import { clienteService } from './cliente.service';
import { authenticationService } from './authentication.service';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../custom.css';
import swal from 'sweetalert';



export class NuevoCliente extends Component {
    static displayName = NuevoCliente.name;
    constructor(props) {
        super(props);
        document.body.style.backgroundColor = '#FFFFFF';        
        this.state = {
            consulta: [],
            post: null
        };
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{ idcliente: '', razonsocialcliente: '', apellidocliente: '', nombrecliente: '', direccioncliente: '', telefonocliente: '', emailcliente: '' }}

                    validationSchema={Yup.object().shape(
                        {
                            idcliente: Yup.string().required('Campo requerido.'),

                            //razonsocialcliente: Yup.string()
                            //    .when('razonsocialcliente', {
                            //        is: (val) => val == undefined,
                            //        then: Yup.string().required('Campo requerido.')
                            //    }),

                            //apellidocliente: Yup.string()
                            //    .when('apellidocliente', {
                            //        is: (val) => val == undefined,
                            //        then: Yup.string().required('Campo requerido.')
                            //    }),

                            //nombrecliente: Yup.string()
                            //    .when('nombrecliente', {
                            //        is: (val) => val == undefined,
                            //        then: Yup.string().required('Campo requerido.')
                            //    }),

                            direccioncliente: Yup.string().required('Campo requerido.'),

                            telefonocliente: Yup.string().required('Campo requerido.'),

                            emailcliente: Yup.string().required('Campo requerido.')

                        })}

                    onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                        setStatus();

                        clienteService.getById(values.idcliente)
                            .then(
                                consulta => {
                                    this.setState({ consulta: [consulta], mostrar: true });
                                    setSubmitting(false);
                                },
                                error => {
                                    setSubmitting(false);

                                    if (error === 'Not Found') {
                                        clienteService.newCliente(values).then(
                                            cli => {
                                                return cli;
                                            },
                                            error => {
                                                setSubmitting(false);
                                                setStatus(error);
                                            });
                                        if (error === 'Not Found') {
                                            swal({
                                                title: "Guardado con éxito",
                                                text: "Presione aceptar",
                                                icon: "success",
                                                button: "Aceptar"
                                            });
                                            error = '';
                                            this.post = 'ok';
                                            
                                        }
                                    }
                                    resetForm();
                                    setStatus(error);
                            });
                        if (this.post !== 'ok') {
                            setStatus('Found');
                            this.post = null;
                        }
                    }
                    }>
                    {({ errors, status, touched, isSubmitting }) => (

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Form>
                                        <div className="form-group">
                                            CUIT:
                                                        <Field name="idcliente" type="text" className={'form-control' + (errors.idcliente && touched.idcliente ? ' is-invalid' : '')} />
                                            <ErrorMessage name="idcliente" component="div" className="invalid-feedback" />
                                            Razón Social:
                                                        <Field name="razonsocialcliente" type="text" className={'form-control'} />
                                            <ErrorMessage name="razonsocialcliente" component="div" className="invalid-feedback" />
                                            Apellido:
                                                        <Field name="apellidocliente" type="text" className={'form-control'} />
                                            <ErrorMessage name="apellidocliente" component="div" className="invalid-feedback" />
                                            Nombre:
                                                        <Field name="nombrecliente" type="text" className={'form-control'} />
                                            <ErrorMessage name="nombrecliente" component="div" className="invalid-feedback" />
                                            Domicio:
                                                        <Field name="direccioncliente" type="text" className={'form-control' + (errors.direccioncliente && touched.direccioncliente ? ' is-invalid' : '')} />
                                            <ErrorMessage name="direccioncliente" component="div" className="invalid-feedback" />
                                            Teléfono:
                                                        <Field name="telefonocliente" type="text" className={'form-control' + (errors.telefonocliente && touched.telefonocliente ? ' is-invalid' : '')} />
                                            <ErrorMessage name="telefonocliente" component="div" className="invalid-feedback" />
                                            e-mail:
                                                        <Field name="emailcliente" type="text" className={'form-control' + (errors.emailcliente && touched.emailcliente ? ' is-invalid' : '')} />
                                            <ErrorMessage name="emailcliente" component="div" className="invalid-feedback" />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">Guardar</button>
                                        </div>
                                        {status &&
                                            <div className={'alert alert-danger'}>El CUIT ya existe en la Base de Datos.</div>
                                        }
                                    </Form>

                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        );
    }
}
