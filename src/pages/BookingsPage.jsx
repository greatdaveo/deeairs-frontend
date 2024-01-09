import React, { useState, useEffect } from "react";
import DashboardPage from "./DashboardPage";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../components/Bookings/BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/bookings", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        console.log(response);

        const data = await response.json();
        console.log(data);

        setBookings(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <DashboardPage />

      <div>
        {bookings?.length > 0 &&
          bookings.map((booking, i) => (
            <div
              key={i}
              className="flex gap-4 bg-gray-200 mt-5 rounded-2xl overflow-hidden"
            >
              <Link to={`/dashboard/bookings/${booking._id}`}>
                <div className="w-40">
                  <img
                    src={`http://localhost:4000/uploads/${booking.location.addedPhotos[0]}`}
                    alt={booking.location.title}
                    className="aspect-square object-cover"
                  />
                </div>
              </Link>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.location.title}</h2>

                <BookingDates booking={booking} />

                <div>
                  <div className="flex gap-1 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Total price: ${booking.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
