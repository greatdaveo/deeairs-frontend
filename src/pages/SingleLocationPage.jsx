import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingsForm from "../components/Bookings/BookingsForm";
import LocationsGallery from "../components/LocationsComponent/LocationsGallery";
import LocationAddressLink from "../components/LocationsComponent/LocationAddressLink";

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

      <LocationAddressLink>{locationData.address}</LocationAddressLink>

      <LocationsGallery locationData={locationData} />

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
