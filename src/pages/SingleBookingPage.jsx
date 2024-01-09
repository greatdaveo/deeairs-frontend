import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LocationAddressLink from "../components/LocationsComponent/LocationAddressLink";
import LocationsGallery from "../components/LocationsComponent/LocationsGallery";
import BookingDates from "../components/Bookings/BookingDates";

const SingleBookingPage = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/bookings", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      const foundBooking = data.find(({ _id }) => _id === id);

      if (foundBooking) {
        setBooking(foundBooking);
      }
    };
    fetchData();
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="mt-8">
      <h1 className="text-3xl">{booking.location.title}</h1>
      <LocationAddressLink className="my-2 block">
        {booking.location.address}
      </LocationAddressLink>

      <div className="bg-gray-200 p-4 my-4 rounded-2xl">
        <h2 className="text-xl">Your booking information: </h2>

        <BookingDates booking={booking} />

        <h2>Total price: ${booking.location.price}</h2>
      </div>

      <LocationsGallery locationData={booking.location} />
    </div>
  );
};

export default SingleBookingPage;
