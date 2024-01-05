import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/locations", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        // console.log(data);
        setLocationData(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-5 grid gap-5 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {locationData.length > 0 &&
        locationData.map((location) => (
          <>
            <Link to={"/location/" + location._id} key={location._id}>
              <div className="bg-gray-500 rounded-2xl flex mb-2">
                {location.addedPhotos?.[0] && (
                  <img
                    src={
                      "http://localhost:4000/uploads/" +
                      location.addedPhotos?.[0]
                    }
                    className="rounded-2xl object-cover aspect-square"
                    alt={location.title}
                  />
                )}
              </div>

              <h2 className="font-bold">{location.address}</h2>
              <h3 className="text-sm truncate text-gray-500">
                {location.title}
              </h3>

              <div className="mt-2">
                <span className="font-bold">${location.price} per night</span>
              </div>
            </Link>
          </>
        ))}
    </div>
  );
};

export default HomePage;
