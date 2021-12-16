import React, {useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
	const [trainings, setTrainings] = useState([]);
   useEffect(() => fetchTrainings(), []);

   const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
   };

   const trainingsList = trainings.map(treeni => {
      let date = new Date(treeni.date)
        
      const eventsDetails = {
         start: date,
         end: new Date(moment(date).add(treeni.duration, "minutes")),
         title: treeni.activity + ': ' + treeni.customer.firstname + ' ' + treeni.customer.lastname
      }
      return eventsDetails
	});

   return (
      <div>
         <Calendar
            localizer={localizer}
            events={trainingsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 650 }}
         />
      </div>
    );
}

