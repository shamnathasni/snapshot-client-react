import React, { useEffect, useRef, useState } from "react";
import { Input, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from 'react-day-picker';
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const Calendar = ({ selected, onSelect }) => {
  const [date, setDate] = useState(selected);
  const ref = useRef()

  ref.current = selected;

  return (
    <Popover placement="bottom">
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
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              // Format the newDate before setting it
              const formattedDate = format(newDate, "yyyy-MM-dd");
              setDate(newDate);
              onSelect(formattedDate);
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
