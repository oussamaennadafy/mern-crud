import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useHistory } from 'react-router-dom';


const Details = () => {

    const [gettripdata, settripdata] = useState([]);
    console.log(gettripdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();


    const getdata = async () => {

        const res = await fetch(`http://localhost:5050/gettrip/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            settripdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deletetrip = async (id) => {

        const res2 = await fetch(`http://localhost:5050/deletetrip/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("trip deleted");
            history.push("/");
        }

    }
/*
        departureCity: "",
        arrivalCity: "",
        departureTime: "",
        arrivalTime: "",
        seats: "",
        price: "",
*/
    return (
        <div className="container mt-3">
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${gettripdata._id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deletetrip(gettripdata._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">departure City: <span >{gettripdata.departureCity}</span></h3>
                            <h3 className="mt-3">arrival City: <span >{gettripdata.arrivalCity}</span></h3>
                            <p className="mt-3">departure Time: <span>{gettripdata.departureTime}</span></p>
                            <p className="mt-3">arrival Time: <span>{gettripdata.arrivalTime}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">
                            <p className="mt-5">seats: <span>+91 {gettripdata.seats}</span></p>
                            <p className="mt-3">price: <span>{gettripdata.price}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details
