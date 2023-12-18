import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FeaturesLabel from "./FeaturesLabel";
import TimeTaken from "./TimeTaken";

const LocationsPage = () => {
  const { action } = useParams();
  //   console.log(action);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  return (
    <div className="">
      {action !== "new" && (
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
      )}

      {action === "new" && (
        <div>
          <form action="">
            <h2 className="text-xl mt-4">Title: </h2>
            <p className="text-gray-400 text-sm">
              Ensure your location title should be short and simple for advert
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title e.g My lovely apartment"
            />
            <h2 className="text-xl mt-4">Address to this location: </h2>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="address"
            />
            <h2 className="text-xl mt-4">Photos: </h2>
            <p className="text-gray-400 text-sm">The more the better! </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="Add using a link e.g www.imageurl.jpg"
              />
              <button className="bg-gray-200 px-4 my-2 text-primary rounded-2xl ">
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-6 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </button>
            </div>

            <h2 className="text-xl mt-4">Description: </h2>
            <p className="text-gray-400 text-sm">Describe the location</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <h2 className="text-xl mt-4">Features: </h2>
            <p className="text-gray-400 text-sm">
              Kindly select the features related to your location
            </p>

            <FeaturesLabel />

            <h2 className="text-xl mt-4">Extra Info: </h2>
            <p className="text-gray-400 text-sm">
              Rules in the location environment
            </p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            <h2 className="text-xl mt-4">Check in & out time:</h2>
            <p className="text-gray-400 text-sm">
              Add check in and out times, the maximum number of occupants
            </p>

            <TimeTaken />

            <div className="mt-2">
              <button className="btn">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
