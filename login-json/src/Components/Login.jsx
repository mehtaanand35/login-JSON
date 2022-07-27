import React, { useState } from "react";

function Login(props) {
  const [input, setInput] = useState({ email: "", password: "" });
  const [check, setCheck] = useState(undefined);

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    (async () => {
      const details = await fetch(
        "http://localhost:8080/users?email=" + input.email
      );
      const accInfo = await details.json();
      // console.log(accInfo[0]);
      if (accInfo[0]) {
        if (accInfo[0].pass === input.password) {
          props.acc({ auth: true, userType: accInfo[0].type });
        } else {
          setCheck(false);
          setInput((prev) => ({ ...prev, password: "" }));
        }
      } else {
        setCheck(false);
        setInput({ email: "", password: "" });
      }
    })();
  }

  return (
    <div>
      <div className="mb-3 row pt-5">
        {check === false && (
          <p className="warning">Please Enter Correct UserName and Password</p>
        )}
        <label
          htmlFor="exampleFormControlInput1"
          className="col-sm-2 col-form-label"
        >
          Email address
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            onChange={handleChange}
            value={input.email}
            name="email"
            id="exampleFormControlInput1"
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            onChange={handleChange}
            value={input.password}
            name="password"
            id="inputPassword"
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-primary"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
