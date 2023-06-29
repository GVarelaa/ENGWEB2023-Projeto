import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, ListGroup, ListGroupItem, Modal, Button, Container } from 'react-bootstrap'
import { Eye, Pencil, Trash3, Heart, HeartFill } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'
import axios from 'axios'
import env from '../config/env'


function Accordions({ data, setData, favorites, setFavorites, token, page }) {
    const [showModal, setShowModal] = useState(false);
    const [deleteItemID, setDeleteItemID] = useState(null);

    const handleFavorite = async (event, id) => {
        try {
            if (favorites.includes(id)) {
                await axios.delete(env.authAccessPoint + `/${token.username}/favorites/${id}?token=${localStorage.token}`)

                setFavorites(current => {
                    return current.filter((item) => item !== id)
                })

                toast.success('O acórdão foi removido da lista de favoritos com sucesso!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            else {
                await axios.post(env.authAccessPoint + `/${token.username}/favorites?token=${localStorage.token}`, { favorite: id })

                setFavorites(current => [...current, id])

                toast.success('O acórdão foi adicionado à lista de favoritos com sucesso!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Não foi possível adicionar o acórdão à lista de favoritos!', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }


    const handleShowModal = (event, id) => {
        setDeleteItemID(id)
        setShowModal(true)
    }


    const handleHideModal = () => {
        setShowModal(false)
        setDeleteItemID(null)
    }


    const handleDelete = async (event, id) => {
        try {
            await axios.delete(env.apiAcordaosAccessPoint + `/${id}?token=${localStorage.token}`)

            setData(current => {
                return current.filter((item) => item._id !== id)
            })

            toast.success('O acórdão foi removido com sucesso!', {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            toast.error('Não foi possível remover o acórdão!', {
                position: toast.POSITION.TOP_CENTER
            })
        }

        handleHideModal();
    }
    

    return (
        <Accordion className='mb-4'>
            {data.map((obj, index) => {
                return (
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                            <Container><b>Processo: </b>{obj.Processo}</Container>
                            <Container className='d-flex justify-content-end px-3'>
                                <Link to={`/${obj._id}?returnStart=${data[0]._id}`}> <Eye size={20} color='black' className='mx-3' /> </Link>
                                {favorites.includes(obj._id)
                                    ? <Link> <HeartFill size={20} color='black' className='mx-3' onClick={(event) => handleFavorite(event, obj._id)} /> </Link>
                                    : <Link> <Heart size={20} color='black' className='mx-3' onClick={(event) => handleFavorite(event, obj._id)} /> </Link>
                                }
                                <Link to={"/edit/" + obj._id}> <Pencil size={20} color='black' className='mx-3' /> </Link>
                                {token.level === 100 &&
                                    <>
                                        <Link><Trash3 size={20} color='black' className='mx-3' onClick={(event) => handleShowModal(event, obj._id)} /></Link>
                                        <Modal show={showModal} onHide={handleHideModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmação de Remoção</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="alert alert-danger">Tem a certeza que pretende remover este acórdão?</div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="default" onClick={handleHideModal}>Cancelar</Button>
                                                <Button variant="danger" onClick={(event) => handleDelete(event, deleteItemID)}>Remover</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                }
                            </Container>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <ListGroupItem><b>Data: </b>{obj["Data do Acordão"]}</ListGroupItem>
                                <ListGroupItem><b>Relator: </b>{obj.Relator}</ListGroupItem>
                                <ListGroupItem><b>Descritores: </b>
                                    <ListGroup className='list-group-flush'>
                                        {obj.Descritores.map((content) => { return (<ListGroupItem>{content}</ListGroupItem>) })}
                                    </ListGroup>
                                </ListGroupItem>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}

export default Accordions