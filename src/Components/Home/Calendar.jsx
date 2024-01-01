import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import {  isBookedDate, bookedDates } from "../../Api/UserApi";
import { toast } from "react-toastify";

const Calendar = (props) => {
  const { selected, onSelect, studioId } = props;
  const [date, setDate] = useState(selected);
  const [bookingDates, setBookingDates] = useState([]);
  const ref = useRef();

  ref.current = selected;
  

  useEffect(() => {
    bookedDates(studioId)
      .then((response) => {
        const dates = response.data.bookingdates;
        // const bookedDates = ()=>{
          //   const 
          // }
          const dateArray = []
          for(let i  of dates){
            dateArray.push(new Date(i.date))
          }
           setBookingDates(dates);
        console.log(dateArray, "bookingDates");
      })
      .catch((err) => console.log(err.message));
  }, [studioId]);

  const modifiersStyles = {
    disabled: {
      color: "red", // Change the text color of disabled days
      backgroundColor: "#ffffff", // Change the background color of disabled days
    },
  };

  return (
    <Popover placement="bottom-start">
      <PopoverHandler>
        <Input
          label="Select a Date"
          onChange={() => null}
          value={date ? format(date, "PPP") : ""}
        />
      </PopoverHandler>
      <PopoverContent className="w-56 m-2">
        <div className="modal-box" style={{ zIndex: 1000 }}>
          <DayPicker
            defaultMonth={new Date()}
            mode="single"
            selected={date}
            modifiersStyles={modifiersStyles}
            // hidden={bookingDates.map(bookingDate => new Date(bookingDate.date))}
            // modifiers={{
            //   disabled: (day) => isBookedDate(day),
            // }}
            disabled={bookingDates.map(bookingDate => new Date(bookingDate.date))}
            onSelect={async (newDate) => {
              const formattedDate = format(newDate, "yyyy-MM-dd");
              const response = await isBookedDate(formattedDate);
              if (response.data.status === true) {
                setDate(newDate);
                onSelect(formattedDate);
              } else {
                toast("Date is not available");
              }
            }}
            showOutsideDays
            className="border-0"
            components={{
              IconLeft: ({ ...props }) => (
                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
              ),
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Calendar;
