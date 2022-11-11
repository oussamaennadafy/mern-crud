import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";

const Edit = () => {
  const { updata, setUPdata } = useContext(updatedata);
  const history = useHistory("");
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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:5050/gettrip/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const {
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = inpval;

    const res2 = await fetch(`http://localhost:5050/updatetrip/${id}`, {
      method: "PATCH",
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

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      history.push("/");
      setUPdata(data2);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home2</NavLink>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputdepartureCity1" class="form-label">
              departure City
            </label>
            <input
              type="text"
              value={inpval.departureCity}
              onChange={setdata}
              name="departureCity"
              class="form-control"
              id="exampleInputdepartureCity1"
              aria-describedby="departureCityHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputarrivalCity1" class="form-label">
              arrival City
            </label>
            <input
              type="text"
              value={inpval.arrivalCity}
              onChange={setdata}
              name="arrivalCity"
              class="form-control"
              id="exampleInputarrivalCity1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputdepartureTime1" class="form-label">
              departure Time
            </label>
            <input
              type="datetime-local"
              value={inpval.departureTime}
              onChange={setdata}
              name="departureTime"
              class="form-control"
              id="exampleInputdepartureTime1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputarrivalTime1" class="form-label">
              arrival Time
            </label>
            <input
              type="datetime-local"
              value={inpval.arrivalTime}
              onChange={setdata}
              name="arrivalTime"
              class="form-control"
              id="exampleInputarrivalTime1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputseats1" class="form-label">
              seats
            </label>
            <input
              type="text"
              value={inpval.seats}
              onChange={setdata}
              name="seats"
              class="form-control"
              id="exampleInputseats1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputprice1" class="form-label">
              Price
            </label>
            <input
              type="text"
              value={inpval.price}
              onChange={setdata}
              name="price"
              class="form-control"
              id="exampleInputprice1"
            />
          </div>

          <button type="submit" onClick={updateuser} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
