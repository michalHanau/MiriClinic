import React, { FC, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toJewishDate, formatJewishDate, toHebrewJewishDate, formatJewishDateInHebrew, toGregorianDate, JewishMonth, } from "jewish-date";
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';
import { Link } from 'react-router-dom';

interface CalenderProps {
  onDateSelect: (date: string) => void; 
}



const Calender = (props: CalenderProps) => {

  const calendarRef = useRef<FullCalendar>(null);

  // const [clickedDate, setClickedDate] = useState<string>()

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
    props.onDateSelect(date)
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
    <div>
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
      
      {/* {clickedDate ? (
            <Link to={`/AvailableAppointments?treatmentId=${props.treatmentId}`}>
              קביעת תור
            </Link>
          ) : null} */}
    </div>
  );
};

export default Calender;
