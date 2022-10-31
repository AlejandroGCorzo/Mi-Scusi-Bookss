import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./ProblemReport.css";

export default function ProblemReport() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    subject: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const { loggedUser } = useSelector((state) => state.users);
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validations(e.target.name, e.target.value);
    if (errors.msg) {
      delete errors.msg;
      setErrors({ ...errors });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  function validations(name, value) {
    if (name === "fullname") {
      if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(value))
        return setErrors({
          ...errors,
          [name]:
            "Full name can't contain numbers or special characters. A whitespace between words is allowed.",
        });
      else {
        delete errors[name];
        return setErrors({ ...errors });
      }
    }
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+[^\.]$/.test(value))
        return setErrors({
          ...errors,
          [name]: "Must be a valid e-mail.",
        });
      else {
        delete errors[name];
        return setErrors({ ...errors });
      }
    }
    if (name === "subject") {
      if (!value.length)
        return setErrors({
          ...errors,
          [name]: "Subject is required.",
        });
      delete errors[name];
      return setErrors({ ...errors });
    }
    if (name === "description") {
      if (value.length < 30 || value.length > 300)
        return setErrors({
          ...errors,
          [name]: "Description must contain between 30 and 300 characters.",
        });
      delete errors[name];
      return setErrors({ ...errors });
    }
  }

  // useEffect(() => {
  //   if (Object.keys(loggedUser).length === 0) history.push("/");
  // }, [loggedUser]);

  return (
    <>
      <section className="sectionReport">
        <div className="divReport">
          <button className="closeBtn" type="button" onClick={(e) => history.push("/")}>X</button>
          <h1 style={{ fontSize: "1.8em" }}>
            <b>Report a problem</b>
          </h1>
          <form onSubmit={handleSubmit} className="formReport">
            <TextField
              sx={{ m: 2 }}
              className="inputReport"
              label="Full name"
              autoComplete="off"
              onChange={handleChange}
              name="fullname"
              type="text"
              value={input.name}
              placeholder="Full name"
              inputProps={{ maxLength: 40 }}
              error={errors.fullname ? true : false}
              helperText={errors.fullname ? `${errors.fullname}` : null}
            />
            <TextField
              sx={{ m: 2 }}
              className="inputReport"
              label="E-mail"
              autoComplete="off"
              onChange={handleChange}
              name="email"
              type="text"
              value={input.email}
              placeholder="E-mail"
              inputProps={{ maxLength: 40 }}
              error={errors.email ? true : false}
              helperText={errors.email ? `${errors.email}` : null}
            />
            <TextField
              sx={{ m: 2 }}
              className="inputReport"
              label="Subject"
              autoComplete="off"
              onChange={handleChange}
              name="subject"
              type="text"
              value={input.subject}
              placeholder="Reason for reporting"
              inputProps={{ maxLength: 50 }}
              error={errors.subject ? true : false}
              helperText={errors.subject ? `${errors.subject}` : null}
            />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              maxLength={300}
              placeholder="Description..."
              className="textareaAutosize"
              name="description"
              value={input.description}
              onChange={handleChange}
              // error={errors.description ? true : false}
              // helperText={errors.description ? `${errors.description}` : null}
              style={{ width: 500 }}
            />
            <div className="divBtnReport">
              <button
                disabled={
                  JSON.stringify(errors) !== "{}" ||
                  !input.fullname ||
                  !input.email ||
                  !input.subject ||
                  !input.description
                }
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}