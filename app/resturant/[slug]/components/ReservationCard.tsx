'use client';

import { partySize, times } from '../../../../data';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

const ReservationCard = ({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) return setSelectedDate(date);
  };

  const filterTimes = () => {
    const timesInWindow: string[] = [];

    let isWithinWindow = false;

    times.forEach(({ time }) => {
      if (time === openTime) {
        isWithinWindow = true;
      }

      if (isWithinWindow) {
        timesInWindow.push(time);
      }

      if (time === closeTime) {
        isWithinWindow = false;
      }
    });

    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');

      return `${Number(hours)}:${minutes} ${Number(hours) > 12 ? 'PM' : 'AM'}`;
    };

    return timesInWindow.map((time) => formatTime(time));
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map(({ value, label }) => (
            <option value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[20%]">
          <label htmlFor="">Date</label>
          <DatePicker
            className="py-3 border-b font-light text-reg w-28"
            dateFormat={'MMMM d'}
            wrapperClassName="w-[20%]"
            selected={new Date()}
            onChange={handleChangeDate}
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light">
            {filterTimes().map((time) => (
              <option value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
