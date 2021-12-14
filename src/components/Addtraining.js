import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Addtraining(props) {
	const [open, setOpen] = useState(false);
	const [customers, setCustomers] = React.useState([]);
	const [training, setTraining] = useState({
		date: '', duration: '', activity: '', customer: props.customerId
	});

	const getCustomers = () => {
		fetch("https://customerrest.herokuapp.com/api/customers")
			.then((response) => response.json())
			.then((data) => setCustomers(data.content))
			.catch((err) => console.error(err));
	};

	const handleClickOpen = () => {
		setOpen(true);
		getCustomers();
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = event => {
		setTraining({ ...training, [event.target.name]: event.target.value });
	};

	const handleListItemClick = (value) => {
		setTraining({ ...training, customer: value.links[0].href });
		handleClose();
	};

	const saveTraining = () => {
		props.addTraining(training);
		handleClose();
	};

	return (
		<div >
			<input
            type='button'
            value='Add training'
            onClick={handleClickOpen}
         />
			<Dialog open={open} onClose={handleClose}>
				<DialogContent >
					<TextField
						margin="dense"
						name="date"
						value={training.date}
						onChange={e => handleInputChange(e)}
						label="Date"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="duration"
						value={training.duration}
						onChange={e => handleInputChange(e)}
						label="Duration"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						name="activity"
						value={training.activity}
						onChange={e => handleInputChange(e)}
						label="Activity"
						fullWidth
					/>
					<TextField
						id="outlined-basic"
						select
						margin="dense"
						variant="outlined"
						label="Customer"
						onChange={(e) => handleInputChange(e)}
						name="customer"
						value={training.activity}
						SelectProps={{
							native: true
						}}
					>
						{customers.map((index) => (
							<option onClick={() => handleListItemClick(index)} key={index}>
								{index.links[0].href}
							</option>
						))}
					</TextField>
				</DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>
               <Button onClick={saveTraining} color="primary">
                  Save
               </Button>
            </DialogActions>
			</Dialog>
		</div>
	);
}
