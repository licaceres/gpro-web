import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TblUsuario } from './TblUsuario';
import { userService } from './user.service';

export class Usuario extends Component {
    static displayName = Usuario.name;

    constructor(props) {
        super(props);
        this.state = {
            consulta: [],
            mostrar: false
        };
    }

    render() {
        const { consulta, mostrar } = this.state;

        return (
            <div>
                <Formik
                    initialValues={{ usuario: '', dni: '', apellido: '', nombre: '' }}

                    validationSchema={Yup.object().shape({

                    })}

                    onSubmit={(values, { setStatus, setSubmitting }) => {
                        setStatus();
                        userService.getByApyNom(values.apellido, values.nombre).then(
                            consulta => {
                                this.setState({ consulta, mostrar: true })
                                setSubmitting(false);
                            },
                            error => {
                                setSubmitting(false);
                                setStatus(error);
                            }
                        )
                    }
                    }
                >
                    {({ errors, status, touched, isSubmitting }) => (
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Form>
                                        <div className="form-group">
                                            Usuario:
                                            <Field name="usuario" type="text" className={'form-control'} />
                                            <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
                                            DNI:
                                            <Field name="dni" type="text" className={'form-control'} />
                                            <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                                            Apellido:
                                            <Field name="apellido" type="text" className={'form-control'} />
                                            <ErrorMessage name="apellido" component="div" className="invalid-feedback" />
                                            Nombre:
                                            <Field name="nombre" type="text" className={'form-control'} />
                                            <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Buscar</button>
                                            <button type="reset" className="btn btn-primary ml-4" onClick={this.limpiarPantalla} disabled={isSubmitting}>Limpiar</button>
                                        </div>
                                        {status &&
                                            <div className={'alert alert-danger'}>Búsqueda sin resultados.</div>
                                        }
                                    </Form>

                                </div>
                            </div>
                        </div>
                    )}
                </Formik>

                {mostrar &&
                    <TblUsuario data={consulta} className="table table-striped table-bordered dt-responsive nowrap">

                    </TblUsuario>
                }
            </div>
        );

    }
}

