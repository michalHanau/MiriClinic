import React, { FC, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toJewishDate, formatJewishDate, toHebrewJewishDate, formatJewishDateInHebrew, toGregorianDate, JewishMonth, } from "jewish-date";
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';
import { Link, useParams } from 'react-router-dom';

interface CalenderProps {

}



const Calender = (props: CalenderProps) => {
  const { treatmentId } = useParams<{ treatmentId: string }>();
  const calendarRef = useRef<FullCalendar>(null);

  const [selectedDate, setSelectedDate] = useState<string>()

  const getJewishDateString = (date: Date) => {
    const jewishDate = toJewishDate(date);
    //console.log("jewishDate  ", jewishDate)
    return toHebrewJewishDate(jewishDate);
  };

  const handleDatesSet = (info: any) => {
    info.view.el.querySelectorAll('.fc-daygrid-day').forEach((dayCell: any) => {
      const dateStr = dayCell.getAttribute('data-date');
      //console.log(dateStr)
      if (dateStr) {
        const date = new Date(dateStr);
        //console.log("date  ", date)
        const jewishDateStr = getJewishDateString(date);
        dayCell.querySelector('.fc-daygrid-day-number').innerHTML += `<br>(${jewishDateStr.day})`;
      }
    });
    const toolbarTitle = info.view.el.querySelector('.fc-toolbar-title')
    if (toolbarTitle) {
      const dateStr = info.view.el.querySelector('.fc-daygrid-day').getAttribute('data-date')
      const date = new Date(dateStr)
      //console.log("date  ", date)
      const jewishDateStr = getJewishDateString(date)
      toolbarTitle.innerHTML += `<br>(${jewishDateStr.monthName} ${jewishDateStr.year})`
    }


  };

  const handleDateClick = (arg: any) => {
    const date = arg.dateStr;
    setSelectedDate(date)
  };

  useEffect(() => {
    const initialize = async () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        await handleDatesSet({ view: calendarApi });
      }
    };

    initialize();
  }, []);



  return (
    <div
      style={{
        backgroundImage: 'url(/images/shutterstock_2474829587.jpg)',
        backgroundSize: 'cover', // מכסה את כל הרקע
        backgroundPosition: 'center', // ממרכז את התמונה
        height: '100vh', // גובה כל הדף
        width: '100vw', // רוחב כל הדף
        display: 'flex', // שימוש ב-Flexbox למיקום הלוח שנה
        alignItems: 'center', // ממרכז את הלוח שנה בגובה
        justifyContent: 'flex-start', // ממקם אותו בצד ימין
        padding: '20px' // ריווח מהקצה
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px', // צמצום רוחב הלוח שנה
          width: '100%', // כדי שייראה טוב גם במסכים קטנים
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' // הוספת צל למראה טוב יותר
        }}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          //datesSet={handleDatesSet}
          //dateClick={handleDatesSet}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
        // events={[
        //   { title: 'Event 1', date: '2024-10-01' },
        //   { title: 'Event 2', date: '2024-09-16' }
        // ]}
        // הוסיפי כאן עוד הגדרות לפי הצורך
        />


      </div>
      {/* {clickedDate ? (
            <Link to={/AvailableAppointments?treatmentId=${props.treatmentId}}>
              קביעת תור
            </Link>
          ) : null} */}
      {/* {selectedDate && (
        <Link
          to={`/AvailableAppointments?treatmentId=${treatmentId}`}
          state={{ selectedDate }}
          style={{ color: 'white', textDecoration: 'underline' }}
        >
          ראה תורים פנויים
        </Link>
        )} */}
      {selectedDate && (
        <AvailableAppointments selectedDate={selectedDate} treatmentId={treatmentId} />
      )}
      
    </div>

  );
};

export default Calender;
