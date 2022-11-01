import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { adddata } from "./context/ContextProvider";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);

  const history = useHistory();

  const [inpval, setINP] = useState({
    departureCity: "",
    arrivalCity: "",
    departureTime: "",
    arrivalTime: "",
    seats: "",
    price: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const {
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = inpval;

    const res = await fetch("http://localhost:5050/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        seats,
        price,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      history.push("/");
      setUdata(data);
      console.log("data added");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              departure City
            </label>
            <input
              type="text"
              value={inpval.departureCity}
              onChange={setdata}
              name="departureCity"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              arrivalCity
            </label>
            <input
              type="text"
              value={inpval.arrivalCity}
              onChange={setdata}
              name="arrivalCity"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              departureTime
            </label>
            <input
              type="datetime-local"
              value={inpval.departureTime}
              onChange={setdata}
              name="departureTime"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              arrival Time
            </label>
            <input
              type="datetime-local"
              value={inpval.arrivalTime}
              onChange={setdata}
              name="arrivalTime"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              seats
            </label>
            <input
              type="number"
              value={inpval.seats}
              onChange={setdata}
              name="seats"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Price
            </label>
            <input
              type="number"
              value={inpval.price}
              onChange={setdata}
              name="price"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" onClick={addinpdata} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
