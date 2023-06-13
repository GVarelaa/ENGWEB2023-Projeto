import { useState, useEffect} from 'react'
import NavBar from '../components/NavBar';
import { Container, Accordion, ListGroup, ListGroupItem, Pagination } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import axios from 'axios';
var env = require('../config/env')


function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(env.apiAcessPoint + '?skip=0&limit=100');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPagesNumber = async () => {
      try {
        const response = await axios.get(env.apiAcessPoint + '/number');
        setPagesNumber(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchPagesNumber();
    fetchData();
  }, []);


  const handleChangePage = async (page) => {
    setPage(page)

    const skip = (page-1) * 100;

    try {
      const response = await axios.get(env.apiAcessPoint + `?skip=${skip}&limit=100`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <NavBar/>
      <Container className='mt-4'>
        <PaginationControl  page={page}  
                            between={4}
                            total={pagesNumber}
                            limit={100}
                            changePage={handleChangePage}
                            ellipsis={1}/>

        <Accordion className='mb-4'>
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
        <PaginationControl  page={page}  
                            between={4}
                            total={pagesNumber}
                            limit={100}
                            changePage={handleChangePage}
                            ellipsis={1}/>
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