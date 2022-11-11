import React, { useState } from "react";
import "./Registration.css";
import regImage from "./register.png";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function Registration() {
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("userData")) || []
  );

  const gotoPage = useNavigate();
  const emailIDError = "This Email-id is already registered";

  // Registration Error---------------------------------------------------
  let errorName = document.getElementsByClassName("regError");

  function displayRegError() {
    errorName[0].style.visibility = "visible";
    errorName[0].innerText = emailIDError;
  }
  function eraseRegError() {
    errorName[0].style.visibility = "hidden";
  }
  // destructuring ---------------------------------------------------
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    var isEmailPresent = false;

    for (let i = 0; i < localData.length; i++) {
      if (localData[i].mail === data.mail) {
        // here we are checking mail id entered by user
        isEmailPresent = true; // validating email are present
        displayRegError();
        return; // if user already registered then it will return from here
      }
    }

    if (isEmailPresent === false) {
      localStorage.setItem("userData", JSON.stringify([...localData, data])); // if given email not present data stored to localStorage
      setLocalData(JSON.parse(localStorage.getItem("userData")));
      eraseRegError();
      gotoPage("/auth/login"); // id data added then user redirected to log in page
    }

    setLocalData(JSON.parse(localStorage.getItem("userData")));
  };

  // errorneous output styling--------------------------------------
  const error = {
    color: "red",
    fontSize: "12px",
    textShadow: "1px 1px 0px black",
  };


  return (
    <div>
      <div className="RegPage d-flex justify-content-center">
        <div className="leftCol-RegPage d-flex justify-content-center">
          <img className="regImg " src={regImage} alt="registration-img" />
        </div>

        <div className="rightCol-RegPage d-flex justify-content-center align-items-center">
          {/* Registration Form */}
          <form
            className="regForm d-flex justify-content-center align-items-center flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 style={{ textDecoration: "underline" }}>Registration Form</h2>

            {/* name field */}
            <h6>Enter Name</h6>
            <input
              type="text"
              placeholder="Enter Name"
              {...register("name", {
                required: true,
                pattern: {
                  value: /^[A-Z]{1,}$/i,
                  message: "Only character allowed in name",
                },
              })}
            />
            {errors.name?.type === "required" && (
              <p style={error}>First name is mandatory</p>
            )}
            {errors.name?.type === "pattern" && (
              <p style={error}> {errors.name.message} </p>
            )}

            {/* Company name field */}
            <h6>Enter Company Name</h6>
            <input
              type="text"
              placeholder="Enter Company name"
              {...register("companyName", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9 ]{1,}$/i,
                  message: "character & numbers allowed ",
                },
              })}
            />
            {errors.companyName?.type === "required" && (
              <p style={error}>Company name is mandatory</p>
            )}
            {errors.companyName?.type === "pattern" && (
              <p style={error}> {errors.companyName.message}</p>
            )}

            {/* mail id field */}
            <h6>Enter Mail Id</h6>
            <input
              type="Mail"
              placeholder="Enter Mail"
              {...register("mail", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter Valid mail ID",
                },
              })}
            />
            {errors.mail?.type === "required" && (
              <p style={error}>Email-ID is mandatory</p>
            )}
            {errors.mail?.type === "pattern" && (
              <p style={error}> {errors.mail.message}</p>
            )}

            {/* password field */}

            <h6>Enter Password</h6>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 8,
                pattern: {
                  value: /^[A-Z0-9]{1,}$/i,
                },
              })}
            />
            {errors.password?.type === "required" && (
              <p style={error}>Enter password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={error}>password must between 4-8 character</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p style={error}>password must less than 8 character</p>
            )}

            <h6>Enter ConfirmPassword</h6>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("confirmPassword", {
                required: true,
                minLength: 4,
                maxLength: 8,
                pattern: {
                  value: /^[A-Z0-9]{1,}$/i,
                },
                validate: (value) => value === watch("password"),
              })}
            />
            {errors.confirmPassword?.type === "validate" && (
              <p style={error}>password do not match</p>
            )}
            <hr></hr>

            <button type="submit" className="regButton ">
              Register
            </button>
            <hr></hr>


            <Link to="/auth/login">
              <h6>existing user ?</h6>
            </Link>
          <div className="regError">{/* {emailIDError} */}</div>

          </form>
        </div>
      </div>
      {/* <div className="regError"> */}
      {/* {emailIDError} */}
      {/* </div> */}
    </div>
  );
}
