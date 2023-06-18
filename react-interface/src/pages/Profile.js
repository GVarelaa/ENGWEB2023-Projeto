import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormControl, Image, Card, Button} from 'react-bootstrap'
import { Pencil } from 'react-bootstrap-icons'
import NavBar from '../components/NavBar'
import axios from 'axios'
import env from '../config/env'
import jwt_decode from 'jwt-decode'
import './Profile.css';

function Profile() {
  const [username, setUsername] = useState('')
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filiacao, setFiliacao] = useState('')
  const [nivel, setNivel] = useState('');
  const [emailExists, setEmailExists] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      var decodedToken = jwt_decode(localStorage.getItem('token'));

      try {
        const response = await axios.get(env.authAcessPoint + `/${decodedToken.username}`)
        if (response.data) {
          setUsername(response.data.username)
          setNome(response.data.name)
          setApelido(response.data.surname)
          setPassword(response.data.password)
          setEmail(response.data.email)
          setFiliacao(response.data.filiation)
          setNivel(response.data.level)
        }
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.put(env.authAcessPoint + '/' + username, {
      name: nome,
      surname: apelido,
      username: username,
      password: password,
      filiation: filiacao
    })
      .then( response => {})
      .catch(error => { console.log(error) })
  }

  return (
    <>
      <NavBar/>
      <Container>
        <hr className="mt-4 mb-4" />
        <Row>
          <Col md={3}>
            <Card className="mb-4 mb-xl-0">
              <Card.Body className="text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  alt=""
                />
                <div className="small font-italic text-muted mb-4">Insira um ficheiro JPG or PNG até 5 MB</div>
                <Button variant="outline-dark">Carregar Foto</Button>
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
                        <div className="form-control-plaintext" style={{ marginLeft: '10px' }}>{username}</div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1"> Email </Form.Label>
                        { /* <Form.Control type="email" placeholder="Email" value={email} /> */ }
                        <div className="form-control-plaintext" style={{ marginLeft: '10px' }}>{email}</div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="gx-3 mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1"> Nome </Form.Label>
                        <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1"> Apelido </Form.Label>
                        <Form.Control type="text" placeholder="Apelido" value={apelido} onChange={(e) => setApelido(e.target.value)} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="gx-3 mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1"> Password </Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </Form.Group>
                    </Col>
                  </Row>

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
                        <div className="form-control-plaintext" style={{ marginLeft: '10px' }}>{nivel}</div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="outline-dark" type="submit"> Salvar alterações </Button>

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