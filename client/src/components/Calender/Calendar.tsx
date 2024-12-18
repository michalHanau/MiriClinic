import React, {useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Tooltip from '@mui/material/Tooltip'; // ייבוא Tooltip
import { toJewishDate, toHebrewJewishDate} from "jewish-date";
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';
import { Link, useParams } from 'react-router-dom';
import './Calendar.scss';

interface CalenderProps {

}



const Calender = (props: CalenderProps) => {
  const { treatmentId } = useParams<{ treatmentId: string }>();
  const calendarRef = useRef<FullCalendar>(null);

  const [selectedDate, setSelectedDate] = useState<string>()

  const getJewishDateString = (date: Date) => {
    const jewishDate = toJewishDate(date);
    return toHebrewJewishDate(jewishDate);
  };



  const handleDatesSet = (info: any) => {
    info.view.el.querySelectorAll('.fc-daygrid-day').forEach((dayCell: any) => {
      const dateStr = dayCell.getAttribute('data-date');
      if (dateStr) {
        const date = new Date(dateStr);
        const jewishDateStr = getJewishDateString(date);
       dayCell.querySelector('.fc-daygrid-day-number').innerHTML += ` <span class="${jewishDateStr.day.length > 2 ? 'hebrew-date' : 'hebrew-date-short' }">${jewishDateStr.day}</span>`;

      }
    });
    const toolbarTitle = info.view.el.querySelector('.fc-toolbar-title')
    if (toolbarTitle) {
      const dateStr = info.view.el.querySelector('.fc-daygrid-day').getAttribute('data-date')
      const date = new Date(dateStr)
      const jewishDateStr = getJewishDateString(date)
      toolbarTitle.innerHTML = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()} <span class="hebrew-month-year">(${jewishDateStr.monthName} ${jewishDateStr.year})</span>`;

    }


  };

  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  const availableDates = [];
  let date = new Date(today);

  while (date <= nextWeek) {
    if (date.getDay() !== 6) {
      availableDates.push({
        start: date.toISOString().split('T')[0],
        display: 'background',
        backgroundColor: '#A4E7A4', // צבע רקע לתאריכים שניתן ללחוץ
      });
    }
    date.setDate(date.getDate() + 1);
  }

  const isSelectable = (date: Date) => {
    date.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    return date >= today && date <= nextWeek && date.getDay() !== 6;
  };

  const handleDateClick = (arg: any) => {
    const date = new Date(arg.dateStr);
    if (isSelectable(date)) {
      setSelectedDate(arg.dateStr)
    } else {
      alert('התאריך אינו זמין להזמנת תור');
    }
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
        backgroundColor: '#E1CECD',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: '3%',
        paddingTop: '2%'
      }}
    >
      <div
        style={{
          height: '480px',
          padding: '25px',
          borderRadius: '5px',
          marginTop: '30px',
          maxWidth: '500px', // צמצום רוחב הלוח שנה
          width: '100%', // כדי שייראה טוב גם במסכים קטנים
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' // הוספת צל למראה טוב יותר
        }}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="65vh"
          fixedWeekCount={false} // מוודא שהחודש לא יכפה 6 שבועות אם יש פחות ימים
          initialDate={new Date()} // מגדיר את היום הנוכחי
          dateClick={handleDateClick}
          events={availableDates}

          headerToolbar={{
            left: '',   // מבטל את הכפתורים בצד שמאל
            center: 'title',   // מציג רק את שם החודש בתצוגה המרכזית
            right: '',  // מבטל את הכפתורים בצד ימין
          }}

          //משמש לשינוי תצוגה בימים מסויימים ועשיתי את זה כבר בפונקציה למעלה
          // dayCellClassNames={(date) => {
          //   const selectedDate = new Date(date.date);
          //   return selectedDate < today || selectedDate > nextWeek ? 'unavailable-date' : '';
          // }}
          dayCellContent={(arg) => {
            const cellDate = new Date(arg.date);
            const isDateSelectable = isSelectable(cellDate);

            return (
              <Tooltip arrow title={isDateSelectable ? '' : 'התאריך אינו זמין להזמנת תור'}>
                <span>{arg.dayNumberText}</span>
              </Tooltip>

            );
          }}
        />


      </div>
      {selectedDate && (
        <AvailableAppointments selectedDate={selectedDate} treatmentId={treatmentId} />
      )}

    </div>

  );
};

export default Calender;
