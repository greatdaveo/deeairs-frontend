import React from "react";
import LocationNav from "./LocationNav";
import LocationsFormPage from "../../pages/LocationsFormPage";
import { useParams } from "react-router-dom";

const LocationsPage = () => {
  const { action } = useParams();

  return (
    <div className="">
      {action !== "new" && (
        <div>
          <LocationNav />
        </div>
      )}

      {action === "new" && (
        <div>
          <LocationsFormPage />
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
