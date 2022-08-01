import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import FormComponent from "../Components/FormComponent";
import { saveShippingAddress } from "../Actions/CartAction";
import CheckoutSteps from "../Components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postal, setPostal] = useState(shippingAddress.postal);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postal, country }));
    navigate("/payment");
  };
  return (
    <FormComponent>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandle}>
        <h1>Shipping</h1>
        <FormGroup controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postal">
          <FormLabel>Postal</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter postal"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormComponent>
  );
};

export default ShippingScreen;
