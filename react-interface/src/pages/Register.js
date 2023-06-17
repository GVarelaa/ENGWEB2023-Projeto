import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Col, Button, Row, Container, Card, Form, FloatingLabel, Dropdown } from 'react-bootstrap'
import { CheckCircleFill, ExclamationTriangleFill } from 'react-bootstrap-icons'
import ParticleLayout from '../components/ParticleLayout'
import axios from 'axios'

var env = require('../config/env')

function Register() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  //const [filiacao, setFiliacao] = useState("")
  const [nivel, setNivel] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailExists, setEmailExists] = useState(false) // Track if email already exists
  const [usernameExists, setUsernameExists] = useState(false)

  useEffect(() => {
    if (email) checkAccountExists(1)
    else setEmailExists(false)

    if (username) checkAccountExists(2)
    else setUsernameExists(false)
  }, [email, username])

  const checkAccountExists = (type) => {
    if (type === 1){
      axios.get(env.authAcessPoint + '/check-email/' + email)
        .then(response => {
          console.log(response)
          if (response.data != null) setEmailExists(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
    else if (type === 2){
      axios.get(env.authAcessPoint + '/check-username/' + username)
        .then(response => {
          if (response.data != null) setUsernameExists(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post(env.authAcessPoint + '/register', {
      name: nome,
      email: email,
      username: username,
      password: password,
      level: nivel,
    })
      .then(response => {
        const token = response.data.token

        if(token!=null){
          localStorage.setItem('token', token)
          setIsSubmitted(true)
        }
        else{
          // falhou
        }
        // setAuthToken
      })
      .catch(error => {
        setUsername('')
        setPassword('')
        setNome('')
        setEmail('')
        console.log(error)
      })
  }

  const registerForm = (
    <>
      <ParticleLayout/>
      <Container>
        <Row className="vh-100 d-flex align-items-center justify-content-center">
          <Col md={8} lg={5} xs={8}>
            <Card className="shadow-lg">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2">Acordãos</h2>
                  <p className=" mb-5">Por favor insira os seus dados para se registar.</p>

                  <Form onSubmit={handleSubmit}>
                    <FloatingLabel className="mb-3 form-outline" label="Nome">
                      <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel className="mb-3 form-outline" label="Email">
                      <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FloatingLabel>
                    {emailExists ? (
                      <div className="error-message">
                        <i ExclamationTriangleFill></i>
                        Já existe uma conta com esse e-mail!
                      </div>
                    ) : (
                      <div className="validation-message">
                        <i CheckCircleFill></i>
                      </div>
                    )}

                    <FloatingLabel className="mb-3 form-outline" label="Username">
                      <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FloatingLabel>
                    {usernameExists && <p>O username já está a ser utilizado!</p>}

                    <FloatingLabel className="mb-3 form-outline" label="Password">
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FloatingLabel>

                    <div className="d-flex align-items-center mb-3">
                      <label className="form-label me-2">Nível:</label>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-primary" id="dropdown-nivel" style={{ backgroundColor: 'white', color: 'black', borderColor: '#ced4da' }}>
                          {nivel === 1 ? 'Consumidor' : nivel === 2 ? 'Produtor' : null}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => setNivel(1)}>Consumidor</Dropdown.Item>
                          <Dropdown.Item onClick={() => setNivel(2)}>Produtor</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    <div className="d-flex justify-content-center">
                      <Button type="submit" variant="outline-dark">Registar</Button>
                    </div>
                  </Form>

                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Já possui conta? {" "}
                      <a href="/login" className="text-dark fw-bold">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )

  return (
    <>
      {isSubmitted ? <Navigate to="/" /> : registerForm}
    </>
  )
}


export default Register