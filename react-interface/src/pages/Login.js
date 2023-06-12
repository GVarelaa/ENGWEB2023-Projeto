import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, FloatingLabel } from "react-bootstrap";
import axios from 'axios';

var env = require('../config/env')

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (event) => {
    
    console.log(username)
    console.log(password)
    axios.post('http://localhost:8072/login', {username:username, password:password})
      .then(response => {
        const token = response.data.token

        localStorage.setItem('token', token)
        setIsSubmitted(true);
        //setAuthToken
      })
      .catch(error => {
        setUsername("");
        setPassword("");
        setIsInvalid(true);
        console.log(error)
      }) 

      event.preventDefault()
  }

  const loginForm = (
        <div style={{ background: 'linear-gradient(to right, rgba(250,244,49,1), rgba(237,204,6,1))' }}>
          <Container>
            <Row className="vh-100 d-flex align-items-center justify-content-center">
              <Col md={8} lg={5} xs={8}>
                <Card className="shadow-lg">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2">Acordãos</h2>
                      <p className=" mb-5">Por favor insira os seus dados para iniciar sessão.</p>

                      <Form onSubmit={handleSubmit}>
                        <FloatingLabel className="mb-3 form-outline" label="Username">
                          <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </FloatingLabel>

                        <FloatingLabel  className="mb-3 form-outline" label="Password">
                          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </FloatingLabel>

                        {isInvalid && 
                          <p className="mb-0  text-center mb-3 text-warning">Os dados introduzidos estão incorretos.</p>
                        }

                        <div className="d-flex justify-content-center">
                          <Button type="submit" variant="outline-warning">Login</Button>
                        </div>
                      </Form>

                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Não possui conta? {" "}
                          <a href="/" className="text-warning fw-bold">
                            Registar
                          </a>
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
  );

  return (
      <>
        {isSubmitted ? <Navigate to="/"/> : loginForm}
      </>
  );
}


export default Login;