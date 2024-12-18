import React from 'react';
import { Box, Button } from '@mui/material';
import './Home.scss';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/UserProvider';

const HomePage = () => {
  const { userName } = useUser();

  return (
    <Box className="home-page">
      <Box
        component="img"
        src="/images/moveToPermanent.jpg"
        alt="Background"
        className="background-image"
        sx={{
          height: {
            xs: '50vh', 
            sm: '75vh', 
            md: '100vh',
          },
        }}
      />

      <Button
        variant="outlined"
        className="appointment-button"
        component={Link}
        to={userName ? "/ChoiceTreatment" : "/Auth"}
        >
        קביעת תור
      </Button>

    </Box>
  );
};

export default HomePage;



// import * as React from 'react';
// import { Box, ButtonBase, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles'; // ייבוא ה-hook של useTheme
// import './Home.scss'; // ייבוא קובץ ה-SCSS

// export default function ButtonBaseDemo() {
//   const theme = useTheme(); // שימוש ב-hook כדי לגשת ל-theme

//   return (
//     <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
//       <ButtonBase
//         focusRipple
//         key={"קביעת תור"}
//         className="imageButton" // השתמש ב-class SCSS
//         sx={{
//           [theme.breakpoints.down('sm')]: {
//             width: '100%',  // רוחב עבור מסכים קטנים
//             height: 100,    // גובה עבור מסכים קטנים
//           },
//         }}
//       >
//         <span className="imageSrc" style={{ backgroundImage: `url('/images/moveToPermanent.jpg')` }} />
//         {/* <span className="image"> */}
//           <Typography
//             component="span"
//             variant="subtitle1"
//             color="inherit"
//             sx={{
//               position: 'relative',
//               p: 4,
//               pt: 2,
//               pb: 2,
//             }}
//           >
//             {"קביעת תור"}
//             <span className="imageMarked" />
//           </Typography>
//         {/* </span> */}
//       </ButtonBase>
//     </Box>
//   );
// }
