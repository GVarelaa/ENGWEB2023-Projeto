import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { Check, Pencil } from 'react-bootstrap-icons'
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../components/NavBar'
import './Profile.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import env from '../config/env'

function Profile() {
    const [username, setUsername] = useState('')
    const [nome, setNome] = useState('');
    const [apelido, setApelido] = useState('');
    const [email, setEmail] = useState('');
    const [passwordAtual, setPasswordAtual] = useState('');
    const [passwordNova, setPasswordNova] = useState('');
    const [filiacao, setFiliacao] = useState('')
    const [nivel, setNivel] = useState('');
    const [showPasswordInputs, setShowPasswordInputs] = useState(false);
    const [image, setImage] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                var decodedToken = jwt_decode(localStorage.getItem('token'))
            }
            catch {
                return (<Navigate to="/login" />)
            }

            try {
                const response = await axios.get(env.authAccessPoint + `/${decodedToken.username}?token${localStorage.token}`)
                if (response.data) {
                    setUsername(response.data.username)
                    setNome(response.data.name)
                    setApelido(response.data.surname)
                    setEmail(response.data.email)
                    setFiliacao(response.data.filiation)
                    setNivel(response.data.level)
                }
            }
            catch {
                toast.error('Não foi obter as informações do utilizador!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        }

        fetchData();
    }, []);

    const uploadImage = async e=>{
        e.preventDefault()
    }


    const handlePassword = () => {
        setShowPasswordInputs(true)
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        if (showPasswordInputs){
            if (passwordAtual != null && passwordNova != null) {
                axios.post(env.authAccessPoint + `/changepassword?token=${localStorage.token}`, {
                    username: username,
                    oldpassword: passwordAtual,
                    newpassword: passwordNova
                })
                    .then(response => {
                        toast.success('A password foi alterada com sucesso!', {
                            position: toast.POSITION.TOP_CENTER
                        })

                        axios.put(env.authAccessPoint + '/' + username, {
                            name: nome,
                            surname: apelido,
                            username: username,
                            filiation: filiacao
                        })
                            .then(response => {
                                toast.success('As alterações foram efetuadas com sucesso!', {
                                    position: toast.POSITION.TOP_CENTER,
                                })
                            })
                            .catch(error => {
                                toast.error('Não foi possível efetuar as alterações!', {
                                    position: toast.POSITION.TOP_CENTER
                                })
                            })
                    })
                    .catch(error => {
                        toast.error('Não foi possível alterar a password!', {
                            position: toast.POSITION.TOP_CENTER
                        })
                    })
            }
        }

        else{
            axios.put(env.authAccessPoint + '/' + username + `?token${localStorage.token}`, {
                name: nome,
                surname: apelido,
                username: username,
                filiation: filiacao
            })
                .then(response => {
                    toast.success('As alterações foram efetuadas com sucesso!', {
                        position: toast.POSITION.TOP_CENTER,
                    })
                })
                .catch(error => {
                    toast.error('Não foi possível efetuar as alterações!', {
                        position: toast.POSITION.TOP_CENTER
                    })
                })
        }
    }

    function handleChange(e) {
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <ToastContainer />
            <NavBar />
            <Container>
                <hr className="mt-4 mb-4" />
                <Row>
                    <Col md={3}>
                        <Card className="mb-4 mb-xl-0">
                            <Card.Body className="text-center">
                               <Form>
                                <img
                                    className="img-account-profile rounded-circle mb-2"
                                    src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                                    alt=""
                                />
                                <div className="small font-italic text-muted mb-4">Insira um ficheiro JPG or PNG até 5 MB</div>
                                <label class="w3-text-pink">
                                <b>Select File</b> </label>
                                <input type="file" name="image"/>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="gx-3 mb-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small mb-1"> Username </Form.Label>
                                                <Form.Control disabled type="text" placeholder="Username" value={username} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small mb-1"> Email </Form.Label>
                                                <Form.Control disabled type="email" placeholder="Email" value={email} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="gx-3 mb-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small mb-1"> Nome </Form.Label>
                                                <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small mb-1"> Apelido </Form.Label>
                                                <Form.Control type="text" placeholder="Apelido" value={apelido} onChange={(e) => setApelido(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {!showPasswordInputs && (
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small mb-1">Password:</Form.Label>
                                            <div className="d-flex flex-column align-items-start">
                                                <Button variant="outline-dark" startIcon={<Pencil />} onClick={handlePassword}>Editar Password</Button>
                                            </div>
                                        </Form.Group>
                                    )}

                                    {showPasswordInputs && (
                                        <Row className="gx-3 mb-3">
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="small mb-1">Password Atual</Form.Label>
                                                    <Form.Control type="password" placeholder="Password Atual" onChange={(e) => setPasswordAtual(e.target.value)} />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="small mb-1">Nova Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Nova Password" onChange={(e) => setPasswordNova(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )}

                                    <Row className="gx-3 mb-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small mb-1"> Filiação </Form.Label>
                                                <Form.Control type="text" placeholder="Filiação" value={filiacao} onChange={(e) => setFiliacao(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small mb-1"> Nível </Form.Label>
                                                <Form.Control disabled type="text" placeholder="Nível" value={nivel} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-end">
                                        <Button type="submit" className="mx-2" variant="outline-dark" startIcon={<Check />}>Salvar Alterações</Button>
                                    </div>

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile;