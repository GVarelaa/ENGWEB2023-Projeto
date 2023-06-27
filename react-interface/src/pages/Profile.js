import React, { useState, useEffect, createRef, useRef } from "react";
import { Navigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import { Check, Pencil, Trash3 } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import "./Profile.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import env from "../config/env";

function Profile() {
  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [email, setEmail] = useState("");
  const [passwordAtual, setPasswordAtual] = useState("");
  const [passwordNova, setPasswordNova] = useState("");
  const [filiacao, setFiliacao] = useState("");
  const [nivel, setNivel] = useState("");
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [FileURL, setFileURL] = useState();
  var FileInput = createRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        var decodedToken = jwt_decode(localStorage.getItem("token"));
      } catch {
        return <Navigate to="/login" />;
      }

      try {
        const response = await axios.get(
          env.authAccessPoint +
            `/${decodedToken.username}?token=${localStorage.token}`
        );
        if (response.data) {
          setUsername(response.data.username);
          setNome(response.data.name);
          setApelido(response.data.surname);
          setEmail(response.data.email);
          setFiliacao(response.data.filiation);
          setNivel(response.data.level);
          setFileURL(
            env.authAccessPoint +
              `/i_${response.data.username}?token=${localStorage.token}`
          );
        }
      } catch {
        toast.error("Não foi obter as informações do utilizador!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    fetchData();
  }, []);

  const handlePassword = () => {
    setShowPasswordInputs(true);
  };

  function iteratorToDictionary(iterator) {
    const dictionary = {};

    for (const item of iterator) {
      const [key, value] = item;
      dictionary[key] = value;
    }

    return dictionary;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (showPasswordInputs) {
      if (passwordAtual != null && passwordNova != null) {
        axios
          .post(
            env.authAccessPoint + `/changepassword?token=${localStorage.token}`,
            {
              username: username,
              oldpassword: passwordAtual,
              newpassword: passwordNova,
            }
          )
          .then((response) => {
            toast.success("A password foi alterada com sucesso!", {
              position: toast.POSITION.TOP_CENTER,
            });

            axios
              .put(
                env.authAccessPoint +
                  "/" +
                  username +
                  `?token=${localStorage.token}`,
                {
                  name: nome,
                  surname: apelido,
                  username: username,
                  filiation: filiacao,
                }
              )
              .then((response) => {
                toast.success("As alterações foram efetuadas com sucesso!", {
                  position: toast.POSITION.TOP_CENTER,
                });
              })
              .catch((error) => {
                toast.error("Não foi possível efetuar as alterações!", {
                  position: toast.POSITION.TOP_CENTER,
                });
              });
          })
          .catch((error) => {
            toast.error("Não foi possível alterar a password!", {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      }
    } else {
      axios
        .put(
          env.authAccessPoint + "/" + username + `?token=${localStorage.token}`,
          {
            name: nome,
            surname: apelido,
            username: username,
            filiation: filiacao,
          }
        )
        .then((response) => {
          toast.success("As alterações foram efetuadas com sucesso!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((error) => {
          toast.error("Não foi possível efetuar as alterações!", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
    URL.revokeObjectURL(FileURL);
    var data = new FormData();
    data.set("image", FileInput.current.files[0]);
    if (!FileURL.match(env.authAccessPoint)) {
      await axios
        .post(
          env.authAccessPoint +
            `/image/${username}?token=${localStorage.token}`,
          data
        )
        .then((response) => response.json())
        .catch((error) => {
          // Handle error
        });
    }
  };

  const handleRemoveImage = (event) => {
    FileInput.current.value = null;
    URL.revokeObjectURL(FileURL);
    setFileURL("");
  };

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Container>
        <hr className="mt-4 mb-4" />
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={3}>
              <Card className="mb-4 mb-xl-0">
                <Card.Body className="text-center">
                  {/*rounded-circle*/}
                  <img
                    className="img-account-profile img-fluid mb-2"
                    src={FileURL}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        env.authAccessPoint +
                        `/default-image.jpg?token=${localStorage.token}`;
                    }}
                    style={{
                      width: "300px",
                      height: "300px",
                      "object-fit": "cover",
                    }}
                  />
                  <div className="small font-italic text-muted mb-4">
                    Insira um ficheiro JPG or PNG até 5 MB
                  </div>
                  <Link>
                    <Trash3
                      size={20}
                      color="black"
                      className="mx-3"
                      onClick={(e) => handleRemoveImage(e)}
                    />
                  </Link>
                  <label className="custom-file-label">
                    <input
                      className="x-small font-italic text-muted mb-4"
                      type="file"
                      name="image"
                      ref={FileInput}
                      onChange={(e) => {
                        URL.revokeObjectURL(FileURL);
                        setFileURL(URL.createObjectURL(e.target.files[0]));
                      }}
                      style={{ "font-Size": "13px" }}
                    />
                  </label>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Card className="mb-4">
                <Card.Body>
                  <Row className="gx-3 mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1">
                          {" "}
                          Username{" "}
                        </Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          placeholder="Username"
                          value={username}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1"> Email </Form.Label>
                        <Form.Control
                          disabled
                          type="email"
                          placeholder="Email"
                          value={email}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="gx-3 mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1"> Nome </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nome"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1">
                          {" "}
                          Apelido{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Apelido"
                          value={apelido}
                          onChange={(e) => setApelido(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {!showPasswordInputs && (
                    <Form.Group className="mb-3">
                      <Form.Label className="small mb-1">Password:</Form.Label>
                      <div className="d-flex flex-column align-items-start">
                        <Button
                          variant="outline-dark"
                          startIcon={<Pencil />}
                          onClick={handlePassword}
                        >
                          Editar Password
                        </Button>
                      </div>
                    </Form.Group>
                  )}

                  {showPasswordInputs && (
                    <Row className="gx-3 mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small mb-1">
                            Password Atual
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password Atual"
                            onChange={(e) => setPasswordAtual(e.target.value)}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small mb-1">
                            Nova Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Nova Password"
                            onChange={(e) => setPasswordNova(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}

                  <Row className="gx-3 mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1">
                          {" "}
                          Filiação{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Filiação"
                          value={filiacao}
                          onChange={(e) => setFiliacao(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small mb-1"> Nível </Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          placeholder="Nível"
                          value={nivel}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      className="mx-2"
                      variant="outline-dark"
                      startIcon={<Check />}
                    >
                      Salvar Alterações
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default Profile;
