import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, FloatingLabel , Dropdown} from 'react-bootstrap';
import axios from 'axios';

var env = require('../config/env')

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [filiacao, setFiliacao] = useState("");
  const [nivel, setNivel] = useState("Consumidor");
  const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = (event) => {
  event.preventDefault();
  let nivel;

  if (nivel === 'Consumidor') nivel = 1;
  else if (nivel === 'Produtor') nivel = 2;
  
  axios.post('http://localhost:8072/register', {
      nome: nome,
      email: email,
      username: username,
      password: password,
      nivel: nivel,
    })
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsSubmitted(true);
      // setAuthToken
    })
    .catch(error => {
      setUsername('');
      setPassword('');
      setNome('');
      setEmail('');
      console.log(error);
    });
};

  const registerForm = (
        <div style={{ background: 'linear-gradient(to right, rgba(250,244,49,1), rgba(237,204,6,1))' }}>
          <Container>
            <Row className="vh-100 d-flex align-items-center justify-content-center">
              <Col md={8} lg={5} xs={8}>
                <Card className="shadow-lg">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2">Acordãos</h2>
                      <p className=" mb-5">Por favor insira os seus dados para se registar.</p>

                      <Form onSubmit={handleSubmit}>
                        <FloatingLabel  className="mb-3 form-outline" label="Nome">
                          <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        </FloatingLabel>

                        <FloatingLabel  className="mb-3 form-outline" label="Email">
                          <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </FloatingLabel>
                        
                        <FloatingLabel className="mb-3 form-outline" label="Username">
                          <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </FloatingLabel>

                        <FloatingLabel  className="mb-3 form-outline" label="Password">
                          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </FloatingLabel>

                        <div className="d-flex align-items-center mb-3">
                            <label className="form-label me-2">Nível:</label>
                            <Dropdown onSelect={(e) => setNivel(e)}>
                            <Dropdown.Toggle variant="outline-primary" id="dropdown-nivel" style={{backgroundColor: 'white', color: 'black', borderColor: '#ced4da'}}>
                                {nivel || 'Selecione'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Consumidor">Consumidor</Dropdown.Item>
                                <Dropdown.Item eventKey="Produtor">Produtor</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="d-flex justify-content-center">
                          <Button type="submit" variant="outline-warning">Registar</Button>
                        </div>
                      </Form>

                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Já possui conta? {" "}
                          <a href="/login" className="text-warning fw-bold">
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
        </div>
  );

  return (
      <>
        {isSubmitted ? <Navigate to="/"/> : registerForm}
      </>
  );
}


export default Register;