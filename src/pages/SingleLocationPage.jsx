import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingsForm from "../components/Bookings/BookingsForm";

const SingleLocationPage = () => {
  const { id } = useParams();

  const [locationData, setLocationData] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  //   To fetch the data to the Single Location Page
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/location/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        console.log(data);
        setLocationData(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, [id]);

  if (!locationData) return "";

  //   To handle the show all button
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black min-h-screen">
        <div className="bg-black p-8 grid gap-2">
          <div>
            <h2 className="text-3xl text-white mr-48">
              Photos of: {locationData.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-7 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white"
            >
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>

          {locationData?.addedPhotos?.length > 0 &&
            locationData.addedPhotos.map((photo, i) => (
              <div key={i}>
                <img src={`http://localhost:4000/uploads/${photo}`} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{locationData.title}</h1>

      <a
        href={`https://maps.google.com/?q=${locationData.address}`}
        target="_blank"
        className="flex gap-1 my-2 block font-semibold underline"
      >
        <i>
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
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </i>
        {locationData.address}
      </a>

      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {locationData.addedPhotos?.[0] && (
              <div>
                <img
                  src={`http://localhost:4000/uploads/${locationData.addedPhotos[0]}`}
                  alt={locationData.title}
                  className="aspect-square object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid">
            <div>
              {locationData.addedPhotos?.[1] && (
                <img
                  src={`http://localhost:4000/uploads/${locationData.addedPhotos[1]}`}
                  alt={locationData.title}
                  className="aspect-square object-cover"
                />
              )}
            </div>

            <div className="overflow-hidden">
              {locationData.addedPhotos?.[2] && (
                <img
                  src={`http://localhost:4000/uploads/${locationData.addedPhotos[2]}`}
                  alt={locationData.title}
                  className="aspect-square object-cover relative top-2"
                />
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-2 bg-white rounded-2xl shadow shadow-md shadow-white-500  "
        >
          <i>
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </i>
          View more photos
        </button>
      </div>

      <div className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-xl">Description: </h2>
            {locationData.description}
          </div>
          Check-in: {locationData.checkIn} <br />
          Check-in: {locationData.checkOut} <br />
          Max number of guests: {locationData.maxGuests}
        </div>

        <BookingsForm locationData={locationData} />
      </div>

      <div className="my-8 -mx-8 py-8 px-8 text-sm text-gray-600 leading-6 bg-white border-t">
        <h2 className="font-semibold text-xl">Extra info: </h2>
        <p className="mb-4 mt-2">{locationData.extraInfo}</p>
      </div>
    </div>
  );
};

export default SingleLocationPage;
