// import React, { FC, useEffect, useState } from 'react';
// //import './ChoiceTreatment.scss';
// import TreatmentService from '../../services/treatment.service';
// import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
// import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';
// import Calender from '../Calender/Calendar';
// import { Link, useNavigate } from 'react-router-dom';

// interface ChoiceTreatmentProps { }

// interface Treatment {
//   id: number;
//   name: string;
// }

// const ChoiceTreatment = (props: ChoiceTreatmentProps) => {

//   const [treatmentNames, setTreatmentNames] = useState<Treatment[]>([])
//   const [selectedTreatment, setSelectedTreatment] = useState<number>()
//   const [selectedDate, setSelectedDate] = useState<string>();
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)

//   const _navigate = useNavigate();

//   useEffect(() => {
//     const fetchTreatmentNames = async () => {
//       try {
//         const treatmentNamesList = await TreatmentService.getTreatmentName()
//         setTreatmentNames(treatmentNamesList)
//       } catch (err) {
//         setError('Failed to fetch treatment names');
//       } finally {
//         setLoading(false)
//       }
//     };

//     fetchTreatmentNames();
//   }, [])

//   useEffect(() => {
//     if (selectedDate) {
//       alert(selectedDate)

//       _navigate(`/AvailableAppointments/${selectedTreatment}`, {
//         state: { selectedDate },
//       });
//     }
//   }, [selectedDate, selectedTreatment, _navigate]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const handleChange = (event: SelectChangeEvent<number>) => {
//     console.log("handleChange", Number(event.target.value))
//     setSelectedTreatment(Number(event.target.value));
//     alert(selectedTreatment)
//   }

//   const handleDateSelect = (date: string) => {
//     alert("חזרנו עם היום")
//     alert(date)

//     setSelectedDate(date);

//   };



//   return (
//     <div>
//      <Box
//       sx={{
//         backgroundImage: 'url(/images/shutterstock_2474829587.jpg)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         color: 'white',
//         textAlign: 'center',
//         padding: 2,
//       }}
//     >
//       <Container maxWidth="sm">
//         <Typography variant="h2" component="h1" gutterBottom>Choice of Treatment</Typography>
//         <FormControl fullWidth variant="outlined" color="secondary">
//           <InputLabel focused>בחרי טיפול</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             onChange={handleChange}
//           >
//             {treatmentNames.map((treatment) => (
//               <MenuItem key={treatment.id} value={treatment.id}>
//                 {treatment.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//       </Container>
//     </Box>

//     {selectedTreatment && (
//         <Calender onDateSelect={handleDateSelect} />
//       )}

//       {selectedDate && (
//         <Link
//           to={`/AvailableAppointments?treatmentId=${selectedTreatment}`}
//           state={{ selectedDate }}></Link>
//       )}
//     </div>
//   );
// };

// export default ChoiceTreatment;

import React, { FC, useEffect, useState } from 'react';
import TreatmentService from '../../services/treatment.service';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Typography, Container } from '@mui/material';
import Calender from '../Calender/Calendar';
import { Link, useNavigate } from 'react-router-dom';

interface ChoiceTreatmentProps { }

interface Treatment {
  id: number;
  name: string;
}

const ChoiceTreatment = (props: ChoiceTreatmentProps) => {
  const [treatmentNames, setTreatmentNames] = useState<Treatment[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const _navigate = useNavigate();

  useEffect(() => {
    const fetchTreatmentNames = async () => {
      try {
        const treatmentNamesList = await TreatmentService.getTreatmentName();
        setTreatmentNames(treatmentNamesList);
      } catch (err) {
        setError('Failed to fetch treatment names');
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentNames();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      _navigate(`/AvailableAppointments/${selectedTreatment}`, {
        state: { selectedDate },
      });
    }
  }, [selectedDate, selectedTreatment, _navigate]);

  useEffect(() => {
    if (selectedTreatment) {
      _navigate(`/Calender/${selectedTreatment}`);
    }
  }, [selectedTreatment]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6">{error}</Typography>;

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedTreatment(Number(event.target.value));
    // _navigate(`/Calender/${selectedTreatment}`);
  };



  // const handleDateSelect = (date: string) => {
  //   setSelectedDate(date);
    
  // };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/shutterstock_2474829587.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>Choice of Treatment</Typography>
        <FormControl fullWidth variant="outlined" color="secondary">
          <InputLabel focused>בחרי טיפול</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
          >
            {treatmentNames.map((treatment) => (
              <MenuItem key={treatment.id} value={treatment.id}>
                {treatment.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* {selectedTreatment && (
          <Link
          to={`/Calender`}
          ></Link>
        )}

        {selectedDate && (
          <Link
            to={`/AvailableAppointments?treatmentId=${selectedTreatment}`}
            state={{ selectedDate }}
            style={{ color: 'white', textDecoration: 'underline' }}
          >
            ראה תורים פנויים
          </Link>
        )} */}
      </Container>
    </Box>
  );
};

export default ChoiceTreatment;
