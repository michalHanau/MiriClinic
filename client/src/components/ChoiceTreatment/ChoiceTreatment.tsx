import React, { useEffect, useState } from 'react';
import TreatmentService from '../../services/treatment.service';
import {  Box, Typography, Card, CardActionArea, CardMedia, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface ChoiceTreatmentProps { }

interface Treatment {
  id: number;
  name: string;
}

const ChoiceTreatment = (props: ChoiceTreatmentProps) => {
  const [treatmentNames, setTreatmentNames] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


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

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <Box
      sx={{
        backgroundColor: '#DDC8C5',
        minHeight: '100vh',             
        width: '100%',              
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',    
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2} sx={{ width: '70%', margin: '0 auto', marginTop:{ xs: '30%', sm: '10%' } }}>
        {treatmentNames.map((treatment) => (
          <Grid item xs={12} sm={6} md={4} key={treatment.id}>
            <Link to={`/Calender/${treatment.id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ width: '90%', height: '100%' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/images/logo.png"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {treatment.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      תיאור הטיפול כאן תיאור הטיפול כאן תיאור הטיפול כאן
                      תיאור הטיפול כאן תיאור הטיפול כאן תיאור הטיפול כאן
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ChoiceTreatment;
