import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Container, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Eye, Pencil, Trash3, Heart } from 'react-bootstrap-icons'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import NavBar from '../components/NavBar';
import axios from 'axios';
import env from '../config/env'
import jwt_decode from 'jwt-decode'


function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      var decodedToken = jwt_decode(localStorage.getItem('token'));
      try{
        const response = await axios.get(env.authAcessPoint + `/${decodedToken.username}` +  "/favorites");
        setFavorites(response.data.favorites)
      } catch (error){
        console.log(error)
      }
    }

    fetchData()
  }, [])

  console.log(favorites)

  return (
    <>
      <NavBar/>

    </>
  );
}

export default Favorites;