import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LocationNav = () => {
  const [locationFormData, setLocationFormData] = useState([]);

  // To GET THE LOCATION FORM DATA TO DISPLAY IN THE BROWSER
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/locations", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("Fetched data:", data);
        setLocationFormData(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/dashboard/locations/new"}
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
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add new location
        </Link>
      </div>

      <div className="mt-4">
        {locationFormData.length > 0 &&
          locationFormData.map((locationData, i) => (
            <Link
              to={"/dashboard/locations/" + locationData._id}
              key={i}
              className=" flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl my-2"
            >
              <div className="w-32 h-32 bg-gray-300 grow shrink-0">
                {locationData.addedPhotos.length > 0 && (
                  <img
                    src={locationData.addedPhotos[0]}
                    alt={locationData.title}
                  />
                )}
              </div>

              <div className="grow-0 shrink">
                <h2 className="text-xl font-bold">{locationData.title}</h2>
                <p className="text-sm mt-2">{locationData.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default LocationNav;
