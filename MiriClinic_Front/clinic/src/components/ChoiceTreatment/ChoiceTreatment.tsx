import React, { FC, useEffect, useState } from 'react';
import './ChoiceTreatment.scss';
import TreatmentService from '../../services/treatment.service'; 
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';
import Calender from '../Calender/Calendar';
import { Link, useNavigate } from 'react-router-dom';

interface ChoiceTreatmentProps {}

interface Treatment {
  id: number;
  name: string;
}

const ChoiceTreatment = (props: ChoiceTreatmentProps) => {

  const [treatmentNames, setTreatmentNames] = useState<Treatment[]>([])
  const [selectedTreatment ,setSelectedTreatment] = useState<number>()
  const [selectedDate, setSelectedDate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const _navigate = useNavigate();

  useEffect(() => {
    const fetchTreatmentNames = async () => {
      try {
        const treatmentNamesList = await TreatmentService.getTreatmentName()
        setTreatmentNames(treatmentNamesList) 
      } catch (err) {
        setError('Failed to fetch treatment names');
      } finally {
        setLoading(false)
      }
    };

    fetchTreatmentNames();
  }, [])

  useEffect(() => {
    if (selectedDate) {
      alert(selectedDate)

      _navigate(`/AvailableAppointments/${selectedTreatment}`, {
        state: { selectedDate },
      });
    }
  }, [selectedDate, selectedTreatment, _navigate]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedTreatment(Number(event.target.value));
  }

  const handleDateSelect = (date: string) => {
    alert("חזרנו עם היום")
    alert( date)

    setSelectedDate(date);

  };



  return (
    <div className="choice-treatment">
      <h1>Choice of Treatment</h1>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">בחרי טיפול</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        //value={selectedTreatment}
        label="Treatment"
        onChange={handleChange}
      >
        {treatmentNames.map((treatment, index) => (
          <MenuItem key={index} value={treatment.id}>
            {treatment.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {selectedTreatment && (
        <Calender onDateSelect={handleDateSelect} />
      )}

      {selectedDate && (
        <Link 
        to={`/AvailableAppointments?treatmentId=${selectedTreatment}`} 
        state={{ selectedDate }}></Link>
      )}
    </div>
  );
};

export default ChoiceTreatment;
