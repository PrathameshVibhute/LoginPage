import React from "react";
import logo from "./coder.png";
import './MyProfile.css'
import emailLogo from './gmailLogo.png'
import {useNavigate} from "react-router-dom"

export default function MyProfile() {

  const gotoPage = useNavigate();

  const activeProfile = JSON.parse(localStorage.getItem("activeProfile"));
  // console.log(activeProfile);
  function logOut(){
    localStorage.removeItem("activeProfile");

    gotoPage("/auth/login")
  }

  return (

    
    <div className="mainDiv d-flex justify-content-center align-items-center"  >

      <div
        className="card mb-3 "
        style={{ maxWidth: "500px" }}
      >
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-danger d-flex justify-content-center" style={{width:"70px"}} onClick={logOut}>Logout</button>
        </div>

        <div className="row g-0 p-2 border rounded">
          <div className="col-md-4  p-1">
            <img src={logo} className="img-fluid  " alt="..." />
          </div>
          <div className="col-md-8 ">
            <div className="card-
            dy">
              <h5 className="card-name ">
                <p>{activeProfile.name}</p>
              </h5>
              <h6>
                <p className="card-mail"> <img className="mailLogo" src={emailLogo}></img>  {activeProfile.mail}</p>
              </h6>
              <p className="card-compName">
                <p>comp Name :{activeProfile.companyName} </p>
              </p>
              {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
