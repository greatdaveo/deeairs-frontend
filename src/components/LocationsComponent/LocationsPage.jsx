import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeaturesLabel from "../LocationsComponent/FeaturesLabel";
import LocationNav from "./LocationNav";
// import TimeTaken from "../LocationsComponent/TimeTaken";

const LocationsPage = () => {
  const { id, action } = useParams();
  console.log(id);

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

  // To add photo by link
  async function addPhotoByLink(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/upload-by-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ link: photoLink }),
      });

      const photoUrlData = await response.json();

      setAddedPhotos((prev) => {
        return [...prev, photoUrlData];
      });
      // console.log(photoUrlData);
    } catch (err) {
      alert(err.message);
    }
    setPhotoLink("");
  }

  // To handle uploaded photo files
  async function handleUploadPhoto(e) {
    e.preventDefault();
    const photoFiles = e.target.files;
    // console.log(photoFiles);
    const formData = new FormData();

    for (let i = 0; i < photoFiles.length; i++) {
      formData.append("photos", photoFiles[i]);
    }

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const uploadedFiles = await response.json();

      setAddedPhotos((prev) => {
        return [...prev, ...uploadedFiles];
      });
      console.log(uploadedFiles);
    } catch (err) {
      alert(err.message);
    }
  }

  // TO SUBMIT THE LOCATION FORM
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          address,
          addedPhotos,
          description,
          features,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
        }),
      });

      const locationData = await response.json();
      // console.log(locationData);
    } catch (err) {
      alert(err.message);
    }

    navigate("/dashboard/locations");
  }

  return (
    <div className="">
      {action !== "new" && (
        <div>
          <LocationNav />
        </div>
      )}

      {action === "new" && (
        <div>
          <form onSubmit={handleSubmit}>
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
              <button
                className="bg-gray-200 px-4 my-2 text-primary rounded-2xl "
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((imageLink, i) => (
                  <div key={i} className="h-32 flex">
                    <img
                      src={"http://localhost:4000/uploads/" + imageLink}
                      className="rounded-2xl w-full object-cover"
                      alt=""
                    />
                  </div>
                ))}

              <label className="h-32 cursor-pointer flex gap-1 justify-center items-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleUploadPhoto}
                />
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
              </label>
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

            <FeaturesLabel selected={features} onChange={setFeatures} />

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
