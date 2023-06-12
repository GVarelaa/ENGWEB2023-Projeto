import NavBar from '../components/NavBar';
import { Table } from 'react-bootstrap';
import axios from 'axios';
var env = require('../config/env')


function Home() {
  var records;
  var nItems = 50;

  axios.get(env.apiAcessPoint + '?skip=0&limit=' + nItems)
    .then(response => {
      records = response.data;
    })
    .catch(error => {
      console.log(error)
    })


  return (
    <>
      <NavBar />
      <Table>
        <thead>
          <tr>
            <td>Data Sessão</td>
            <td>Nº Processo</td>
            <td>Relator</td>
          </tr>
        </thead>

        <tbody>

        </tbody>
      </Table>
    </>
  );
}

export default Home;