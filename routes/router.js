const express = require("express");
const router = express.Router();
const trips = require("../models/tripSchema");

// register trip
router.post("/register", async (req, res) =>
{
  const {
    departureCity,
    arrivalCity,
    departureTime,
    arrivalTime,
    seats,
    price,
  } = req.body;

  if (
    !departureCity ||
    !arrivalCity ||
    !departureTime ||
    !arrivalTime ||
    !seats ||
    !price
  )
    return res.status(422).json("plz fill the data");
  try {
    const departure_date = departureTime.slice(0, 10);
    const addtrip = new trips({
      departureCity,
      arrivalCity,
      departureTime,
      departureDate: departure_date,
      arrivalTime,
      seats,
      price,
    });
    await trips.create(addtrip);
    res.status(201).json(addtrip);
  } catch (error) {
    res.status(432).json(error);
  }
});

// get trip data
router.get("/getdata", async (req, res) =>
{
  try {
    const tripdata = await trips.find();
    res.status(201).json(tripdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual trip
router.get("/gettrip/:id", async (req, res) =>
{
  try {
    const { id } = req.params;
    const tripindividual = await trips.findById({ _id: id });
    res.status(201).json(tripindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update trip data

router.patch("/updatetrip/:id", async (req, res) =>
{
  try {
    const { id } = req.params;
    const updatedtrip = await trips.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedtrip);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete trip
router.delete("/deletetrip/:id", async (req, res) =>
{
  try {
    const { id } = req.params;
    const delettrip = await trips.findByIdAndDelete({ _id: id });
    res.status(201).json(delettrip);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;