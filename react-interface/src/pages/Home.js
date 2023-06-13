import { useState, useEffect} from 'react'
import NavBar from '../components/NavBar';
import { Container, Accordion, ListGroup, ListGroupItem, Pagination } from 'react-bootstrap';
import axios from 'axios';
var env = require('../config/env')


function Home() {
  const [data, setData] = useState([]);
  var nItems = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(env.apiAcessPoint + `?skip=0&limit=${nItems}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(data)

  return (
    <>
      <NavBar/>
      <Container>
        <Accordion>
          {data.map((obj, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header><b>Processo:</b>{obj.Processo}</Accordion.Header>
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
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
      </Container>
    </>
  );
}

/*
      <NavBar />
      <Container>
        <Table>
          <thead>
            <tr>
              <th scope='col'>Data Sessão</th>
              <th scope='col'>Nº Processo</th>
              <th scope='col'>Relator</th>
            </tr>
          </thead>

          <tbody>

          </tbody>
        </Table>
      </Container>
*/


export default Home;