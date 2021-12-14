import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Editcustomer(props) {
   const [open, setOpen] = React.useState(false);
   const [customer, setCustomer] = React.useState({
      firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
   })

   const handleClickOpen = () => {
     console.log(props);
     setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress, 
      postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email, phone: props.customer.phone})
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };

   const handleInputChange = (e) => {
      setCustomer({...customer, [e.target.name]: e.target.value})
   };

   const updateCustomer = () => {
      props.updateCustomer(customer, props.customer.links[0].href);
      handleClose();
   }
   
   return(
      <div>
         <Button onClick={handleClickOpen}>
            Edit
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit customer</DialogTitle>
               <DialogContent>
               <TextField
                     autoFocus
                     margin="dense"
                     name="firstname"
                     value={customer.firstname}
                     onChange={e => handleInputChange(e)}
                     label="Firstname"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="lastname"
                     value={customer.lastname}
                     onChange={e => handleInputChange(e)}
                     label="Lastname"
                     fullWidth
                     variant="standard"
                  />
                   <TextField
                     margin="dense"
                     name="streetaddress"
                     value={customer.streetaddress}
                     onChange={e => handleInputChange(e)}
                     label="Streetaddress"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="postcode"
                     value={customer.postcode}
                     onChange={e => handleInputChange(e)}
                     label="Postcode"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="city"
                     value={customer.city}
                     onChange={e => handleInputChange(e)}
                     label="City"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="email"
                     value={customer.email}
                     onChange={e => handleInputChange(e)}
                     label="Email"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="phone"
                     value={customer.emailphone}
                     onChange={e => handleInputChange(e)}
                     label="Phone"
                     fullWidth
                     variant="standard"
                  />
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={updateCustomer}>Save</Button>
               </DialogActions>
         </Dialog>
      </div>
   )
}
