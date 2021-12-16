import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function Addtraining(props) {
	const [open, setOpen] = useState(false);
	const [customerId, setCustomerId] = useState([]);
	const [training, setTraining] = useState({
		date: '', duration: '', activity: '', customer: props.customerId
	});

	const handleClickOpen = () => {
		setOpen(true);

	};


	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = event => {
		setTraining({ ...training, [event.target.name]: event.target.value });
	};

	const addTraining = () => {
		fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomerId(data.content.links.href))
		props.saveTraining(training);
		handleClose();
	};

	return (
		<div >
			<Button
				color="error"
				size="medium"
            onClick={handleClickOpen}
			> 
         </Button>
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
				</DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>
               <Button onClick={addTraining} color="primary">
                  Save
               </Button>
            </DialogActions>
			</Dialog>
		</div>
	);
}
