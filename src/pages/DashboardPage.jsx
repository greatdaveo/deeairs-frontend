import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link, useParams } from "react-router-dom";

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
    let linkClassName = "py-2 px-6";

    if (linkType === sub_page) {
      linkClassName += " bg-primary text-white rounded-full";
    }

    return linkClassName;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={activeLink("profile")} to={"/dashboard"}>
          My profile:
        </Link>

        <Link className={activeLink("bookings")} to={"/dashboard/bookings"}>
          My bookings:
        </Link>
        <Link className={activeLink("locations")} to={"/dashboard/locations"}>
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
    </div>
  );
};

export default DashboardPage;
