import React, { useState } from "react";

const TimeTaken = ({ selected, handleTimeAndGuest }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const handleCheckIn = (e) => {
    setCheckIn(e.target.value);
  };

  const handleCheckOut = (e) => {
    setCheckOut(e.target.value);
  };

  const handleMaxGuests = (e) => {
    setMaxGuests(parseInt(e.target.value, 10));
  };

  function handleTimeAndGuest(selectedTimeAndGuest) {
    const selectedTimeAndGuest = {
      checkIn,
      checkOut,
      maxGuests,
    };

    setSelectedTimeAndGuest(selectedTimeAndGuest);
  }

  return (
    <div className="grid sm:grid-cols-3 gap-2">
      <div>
        <h3 className="mt-2 -mb-1">Check in time: </h3>
        <input type="time" value={checkIn} onChange={handleCheckIn} />
      </div>

      <div>
        <h3 className="mt-2 -mb-1">Check out time: </h3>
        <input type="time" value={checkOut} onChange={handleCheckOut} />
      </div>

      <div>
        <h3 className="mt-2 -mb-1">Max number of guests: </h3>
        <input type="number" value={maxGuests} onChange={handleMaxGuests} />
      </div>
    </div>
  );
};

export default TimeTaken;
