import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  FormFile,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormComponent from "../Components/FormComponent";
import { listProductDetails, updateProduct } from "../Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../Constants/Constants";
import axios from "axios";
const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imgUpload, setImgUpload] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = id;

  const ProductDetail = useSelector((state) => state.ProductDetail);
  const { loading, error, product } = ProductDetail;

  const productUpdated = useSelector((state) => state.productUpdated);
  const {
    loading: loadingUp,
    error: errorUp,
    succss: successUp,
    product: productUp,
  } = productUpdated;

  useEffect(() => {
    if (successUp) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setImage(product.image);
      }
    }
  }, [dispatch, navigate, productId, product, successUp, productUp]);

  const uploadHandle = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(`image`, file);
    // console.log(formData);
    setImgUpload(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } =await axios.post(
        "http://localhost:5000/upload",
        formData,
        config
      );

      setImage(data);
      setImgUpload(false);
    } catch (error) {
      console.log(error);
      setImgUpload(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        category,
        brand,
        countInStock,
        description,
        image,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        GO Back
      </Link>
      <FormComponent>
        <h1>Update</h1>
        {loadingUp && <h3>Update Loading...</h3>}
        {errorUp && <h3>{errorUp}</h3>}
        {loading ? (
          <h2>loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="price">
              <FormLabel>Price</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="image">
              <FormLabel>Image</FormLabel>
              <FormControl
                type="text"
                placeholder="upload image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></FormControl>
              <input
                id="img-file"
                type="file"
                label="Choose File"
                onChange={uploadHandle}
              ></input>
              {imgUpload && <h1>Uploding..</h1>}
            </FormGroup>
            <FormGroup controlId="brand">
              <FormLabel>Brand</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="category">
              <FormLabel>Category</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="countInStock">
              <FormLabel>Count In Stock</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="description">
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></FormControl>
            </FormGroup>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormComponent>
    </>
  );
};

export default ProductEditScreen;
