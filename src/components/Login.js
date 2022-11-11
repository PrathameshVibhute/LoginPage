import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logInPhoto from "./logInAnimatedPhoto.png";

export default function Login() {

    const goto = useNavigate()
    var loginErr = document.getElementsByClassName("loginErr")
    var localData = JSON.parse(localStorage.getItem("userData")) || [];
  
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // errorneous output styling--------------------------------------
  const error = {
    color: "red",
    fontSize: "12px",
  };

  const onSubmit = (data) => {
   
    const {mail,password} = data;

    var isUser = false ;

    for(let i=0; i<localData.length; i++){
         if((localData[i].mail === mail ) && (localData[i].password === password)){
                isUser = true;
                console.log("succesfull logged in ");
                localStorage.setItem("activeProfile",JSON.stringify(localData[i]))

                goto("/MyProfile")
         }
    }

    loginErr[0].innerText =  isUser ? "" : "log in unsuccessful"; 
  }

  return (
    <div className="logInPage d-flex justify-content-center">
      <div className="leftCol">
        <img src={logInPhoto} alt="login-img" />
      </div>

      <div className="rightCol flex-column d-flex">
      <h2 style={{textDecoration: "underline"}}>
            LogIn Form
          </h2>
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <h6>Enter Mail</h6>
          <input
            type="text"
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

          <h6>Enter Password</h6>
          <input
            type="Password"
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

          <hr></hr>
          <button type="submit">Log In</button>

          <hr></hr>
          <Link to="/auth/registration"> {<p style={{color:"blue", fontSize:"14px"}}>new user Register</p>}</Link>
        </form>
        <div className="loginErr">
                
        </div>
      </div>
    </div>
  );
}
