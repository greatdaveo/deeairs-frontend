import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import LocationsPage from "../components/LocationsInfoComponent/LocationsPage";

const DashboardPage = () => {
  const { userInfo, setUserInfo, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  // For Active Link Classes
  let { sub_page } = useParams();

  if (sub_page === undefined) {
    sub_page = "profile";
  }

  // To set the API endpoint logout function
  async function handleLogout() {
    await fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });

    alert("Thank you! We look forward to seeing you again 😉");
    navigate("/");
    setUserInfo(null);
  }

  // To check the loading state when user logs in and navigate to the dashboard page
  if (!isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isLoading && !userInfo) {
    return navigate("/login");
  }

  // For Active Link Classes
  function activeLink(linkType = null) {
    let linkClassName = "inline-flex gap-1 py-2 px-6 rounded-full";

    if (linkType === sub_page) {
      linkClassName += " bg-primary text-white";
    } else {
      linkClassName += " bg-gray-200";
    }

    return linkClassName;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={activeLink("profile")} to={"/dashboard"}>
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My profile:
        </Link>

        <Link className={activeLink("bookings")} to={"/dashboard/bookings"}>
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
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My bookings:
        </Link>
        <Link className={activeLink("locations")} to={"/dashboard/locations"}>
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
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          My accommodation:
        </Link>
      </nav>

      {sub_page === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          You are logged in as: {userInfo.name} ({userInfo.email})
          <br />
          <button className="btn max-w-sm mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {sub_page === "locations" && (
        <div>
          <LocationsPage />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
