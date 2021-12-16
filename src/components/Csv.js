import React, {Component} from 'react';
import {CSVLink} from 'react-csv';

class Csv extends Component {

   constructor(props) {
      super(props);
      this.state = {
         data: []
      }

      this.csvLine = React.createRef();
      this.headers = [
         {label: 'First Name', key: 'firstname'},
         {label: 'Lastname', key: 'astname'},
         {label: 'Streetaddress', key: 'streetaddress'},
         {label: 'Postcode', key: 'postcode'},
         {label: 'City', key: 'city'},
         {label: 'Email', key: 'email'},
         {label: 'Phone', key: 'phone'}
      ]
   }

   getCustomers = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
   }

   downloadCustomers = async () => {
      const data = await this.getCustomers();
      this.setState({data: data, loading: false}, () => {
         setTimeout(() => {
         this.csvLine.current.link.click();
         });
      });
   }

   render() {
      const {data, loading} = this.state;
      return (
      <div>
         <input
            type='button'
            value={loading? 'Downloading...' : 'Export to csv'}
            onClick={this.downloadCustomers}
            disabled={loading}
         />
         <CSVLink 
            headers={this.CSVLink}
            data={data}
            filename='Customers.csv'
            ref={this.csvLine}
         />
      </div>
      );
   }
}

export default Csv;