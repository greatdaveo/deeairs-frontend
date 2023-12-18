import React from "react";

const TimeTaken = ({
  checkIn,
  checkOut,
  maxGuests,
  setCheckIn,
  setCheckOut,
  setMaxGuests,
}) => {
  return (
    <div className="grid sm:grid-cols-3 gap-2">
      <div>
        <h3 className="mt-2 -mb-1">Check in time: </h3>
        <input
          type="time"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div>
        <h3 className="mt-2 -mb-1">Check out time: </h3>
        <input
          type="time"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div>
        <h3 className="mt-2 -mb-1">Max number of guests: </h3>
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TimeTaken;
