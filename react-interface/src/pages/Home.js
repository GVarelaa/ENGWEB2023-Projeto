import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Eye, Pencil, Trash3, Heart, TelephoneMinus } from 'react-bootstrap-icons'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../components/NavBar'
import axios from 'axios'
import env from '../config/env'
import jwt_decode from 'jwt-decode'


function Home() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [pagesNumber, setPagesNumber] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(env.apiAccessPoint + '?skip=0&limit=100')
        setData(response.data)
      } catch (error) {
        toast.error('Não foi possível obter a lista de acórdãos!', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    };

    const fetchPagesNumber = async () => {
      try {
        const response = await axios.get(env.apiAccessPoint + '/number')
        setPagesNumber(response.data)
      } catch (error) {
        toast.error('Não foi possível obter a lista de acórdãos!', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    };

    fetchData()
    fetchPagesNumber()
  }, []);


  const handleChangePage = async (page) => {
    setPage(page)
    const skip = (page - 1) * 100

    try {
      const response = await axios.get(env.apiAccessPoint + `?skip=${skip}&limit=100`)
      setData(response.data)
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error('Não foi possível obter a lista de acórdãos!', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }


  const handleFavorite = async (event, id) => {
    var decodedToken = jwt_decode(localStorage.getItem('token'))

    try {
      await axios.post(env.authAccessPoint + `/${decodedToken.username}/favorites`, { favorite: id })
      toast.success('O acórdão foi adicionado à lista de favoritos com sucesso!', {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      toast.error('Não foi adicionar o acórdão à lista de favoritos!', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }


  const handleDelete = async (event, id) => {
    try {
      await axios.delete(env.apiAccessPoint + `/${id}`)

      setData(oldState => {
        return oldState.filter((item) => item._id !== id)
      })      

      toast.success('O acórdão foi removido com sucesso!', {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      toast.error('Não foi possível remover o acordão!', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  console.log(data)

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Container className='mt-4'>
        <PaginationControl page={page}
          between={4}
          total={pagesNumber}
          limit={100}
          changePage={handleChangePage}
          ellipsis={1} />

        <Accordion className='mb-4'>
          {data.map((obj, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <Container><b>Processo: </b>{obj.Processo}</Container>
                  <Container className='d-flex justify-content-end px-3'>
                    <Link to={obj._id}> <Eye size={20} color='black' className='mx-3' /> </Link>
                    <Link to="#"> <Heart size={20} color='black' className='mx-3' onClick={(event) => handleFavorite(event, obj._id)} /> </Link>
                    <Link to={"/edit/" + obj._id}> <Pencil size={20} color='black' className='mx-3' /> </Link>
                    <Link> <Trash3 size={20} color='black' className='mx-3' onClick={(event) => handleDelete(event, obj._id)} /> </Link>
                  </Container>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    <ListGroupItem><b>Data: </b>{obj.Data}</ListGroupItem>
                    <ListGroupItem><b>Relator: </b>{obj.Relator}</ListGroupItem>
                    <ListGroupItem><b>Descritores: </b>
                      <ListGroup className='list-group-flush'>
                        {obj.Descritores.map((content) => {return(<ListGroupItem>{content}</ListGroupItem>)})}
                      </ListGroup>
                    </ListGroupItem>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
        <PaginationControl page={page}
          between={4}
          total={pagesNumber}
          limit={100}
          changePage={handleChangePage}
          ellipsis={1} />
      </Container>
    </>
  );
}


export default Home;