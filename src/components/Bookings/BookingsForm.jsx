import React, { useState, useEffect, useContext } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const BookingsForm = ({ locationData }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
    }
  }, [userInfo]);

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function handleBooking(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          location: locationData._id,
          checkIn,
          checkOut,
          maxGuests,
          name,
          mobile,
          price: numberOfNights * location.price,
        }),
      });

      const data = await response.json();
      const bookingId = data._id;

      // console.log(data);
      // console.log(bookingId);

      navigate(`/dashboard/bookings/${bookingId}`);
    } catch (err) {
      throw new Error(err.message);
      console.log(err.message);
    }
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl text-center">
      <h2 className="text-xl">Price: ${locationData.price} / per night</h2>
      <div className="border rounded-2xl mt-4 text-left">
        <div className="flex">
          <div className="py-2 px-2 rounded-2xl">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="py-2 px-4 rounded border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="py-2 px-2 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
          />
        </div>

        {numberOfNights > 0 && (
          <div className="py-2 px-2 rounded border-t">
            <label>Your full name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />

            <label>Phone number: </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="080123345678"
            />
          </div>
        )}
      </div>

      <button className="btn mt-4" onClick={handleBooking}>
        Book for:
        {numberOfNights > 0 && (
          <span> ${numberOfNights * locationData.price}</span>
        )}
      </button>
    </div>
  );
};

export default BookingsForm;
