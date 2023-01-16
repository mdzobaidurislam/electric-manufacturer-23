import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
  const navigate = useNavigate();
  const handleNotFoundPage = () => {
    navigate("/");
  };
  return (
    <>
      <div className="notFound_section">
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404 mb-7">
              <h1>Oops!</h1>
            </div>
            <h2>404 - Page not found</h2>
            <p>
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </p>
            <button
              type="button"
              className="custom_btn btn btn-primary text-white"
              onClick={handleNotFoundPage}
            >
              Go To Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
