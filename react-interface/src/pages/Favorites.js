import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Eye, Pencil, Trash3, Heart } from 'react-bootstrap-icons'
import { Pagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../components/NavBar';
import axios from 'axios';
import env from '../config/env'
import jwt_decode from 'jwt-decode'


function Favorites() {
  //const [favorites, setFavorites] = useState([])
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      var favorites = []
      var decodedToken = jwt_decode(localStorage.getItem('token'));
      try {
        const response = await axios.get(env.authAccessPoint + `/${decodedToken.username}` + "/favorites");
        favorites = response.data.favorites
      } catch (error) {
        toast.error('Não foi possível obter a lista de favoritos!', {
          position: toast.POSITION.TOP_CENTER
        })
      }

      if (favorites.length > 0) {
        var queryString = "?"
        for (var i = 0; i < favorites.length; i++) {
          queryString += "_id=" + favorites[i] + "&"
        }

        try {
          const response = await axios.get(env.apiAccessPoint + queryString);
          setPagesNumber(Math.ceil(response.data.length / 25))
          setData(response.data)
        } catch (error) {
          toast.error('Não foi possível obter a lista de favoritos!', {
            position: toast.POSITION.TOP_CENTER
          })
        }
      }
    }

    fetchData()
  }, [])


  const handleFavorite = () => {

  }


  const handleChangePage = async (event, page) => {
    setPage(page)
    window.scrollTo(0, 0);
  }


  return (
    <>
      <ToastContainer />
      <NavBar />
      <Container className='mt-4'>
        <Accordion className='mb-4'>
          {data.map((obj, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <Container><b>Processo:</b>{obj.Processo}</Container>
                  <Container className='d-flex justify-content-end px-3'>
                    <Link to={obj._id}> <Eye size={20} color='black' className='mx-3' /> </Link>
                    <Link to="#"> <Heart size={20} color='black' className='mx-3' onClick={handleFavorite} /> </Link>
                    <Link to="#"> <Pencil size={20} color='black' className='mx-3' /> </Link>
                    <Link to="#"> <Trash3 size={20} color='black' className='mx-3' /> </Link>
                  </Container>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    <ListGroupItem><b>Data:</b>{obj.Data}</ListGroupItem>
                    <ListGroupItem><b>Relator:</b>{obj.Relator}</ListGroupItem>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>

        <Container className='d-flex justify-content-center mb-4'>
          <Pagination page={page} onChange={handleChangePage} count={pagesNumber} shape="rounded" />
        </Container>
      </Container>
    </>
  );
}

export default Favorites;