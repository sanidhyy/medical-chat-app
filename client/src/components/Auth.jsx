import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signInImage from "../assets/signup.jpg";

// create cookies instance
const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

// Both Authentication forms logic
const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    var img = str.match(/\.(jpeg|jpg|gif|png)$/);
    return !!pattern.test(str) && img != null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, confirmPassword, phoneNumber, avatarURL } =
      form;

    // change server address in production
    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios
      .post(`${URL}/${isSignup ? "signup" : "login"}`, {
        username,
        password,
        confirmPassword,
        fullName: form.fullName,
        phoneNumber,
      })
      .catch((error) => setError(error?.response?.data?.message));

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", validURL(avatarURL) ? avatarURL : "");
      cookies.set("hashedPassword", hashedPassword);
    }

    // Reload page after authentication
    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setError(null);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <small
            style={{ color: "red", fontFamily: "Helvetica Neue, sans-serif" }}
          >
            {error || ""}
          </small>
          <form onSubmit={handleSubmit} autoCapitalize="off" autoComplete="off">
            {/* Full Name */}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="John Doe"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Username */}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="johndoe"
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone No */}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone No *</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="+1 000-xxx-xxxx"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Avatar URL */}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  id="avatarURL"
                  placeholder="https://website.com/image.png"
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Password */}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="**********"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Signin/Signup button */}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? "Sign in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signInImage} alt="Sign in" />
      </div>
    </div>
  );
};

export default Auth;
