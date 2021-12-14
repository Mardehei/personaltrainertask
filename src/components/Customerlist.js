import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@mui/material/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';
import Csv from './Csv';

export default function Customerlist() {
   const [customer, setCustomer] = useState([]);


   useEffect(() => fetchData(), []);

   const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomer(data.content))
   }

   const deleteCustomer = (link) => {
      if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(res => fetchData())
      .catch(err => console.error(err))
      }
   }

   const saveCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(customer)
      }) 
      .then(res => fetchData())
      .catch(err => console.error(err))
   }
   
   const saveTraining = (training) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(training)
      }) 
      .then(res => fetchData())
      .catch(err => console.error(err))
   }
   
   const updateCustomer = (customer, link) => {
      fetch(link, {
         method: 'PUT', 
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(customer)
      }) 
      .then(res => fetchData())
      .catch(err => console.error(err))
   }

   const columns = [
      {
         Header: 'Firstname',
         accessor: 'firstname'
      },
      {
         Header: 'Lastname',
         accessor: 'lastname'
      },
      {
         Header: 'Streetaddress',
         accessor: 'streetaddress'
      },
      {
         Header: 'Postcode',
         accessor: 'postcode'
      },
      {
         Header: 'City',
         accessor: 'city'
      },
      {
         Header: 'Email',
         accessor: 'email'
      },
      {
         Header: 'Phone',
         accessor: 'phone'
      },
      {
         sortable: false,
         filterable: false,
         width: 100,
         Cell: row => <Button variant="contained" color='secondary' size='small'>
         <Editcustomer updateCustomer ={updateCustomer} customer={row.original}/>
         </Button>
      },
      {
         sortable: false,
         filterable: false,
         width: 100,
         accessor: 'links[0].href',
         Cell: row => <Button variant="contained" color='error' size='big'
          onClick={() => deleteCustomer(row.value)}>Delete</Button>
      },
      {
         sortable: false,
         filterable: false,
         width: 0,
         header: '',
         field: 'links.0.href',
         width: 150,
         cellRendererFramework: params  =>
         <Addtraining 
             link={params.value} 
             training={params.data} 
             saveTraining={saveTraining}
             customerId={params.value}
         />
      }
   ]

   return(
      <div>
         <h1>Customers</h1>
         <Addcustomer saveCustomer={saveCustomer}/>
         <Addtraining />
         <Csv />
         <br />
         <ReactTable filterable={true} data = {customer} columns={columns} />
      </div>
   )
}
