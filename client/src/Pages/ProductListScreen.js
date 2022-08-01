import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userList, userDelete } from "../Actions/userAction";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { createProduct, deleteProduct, listProducts } from "../Actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../Constants/Constants";

const ProductListScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const product = useSelector((state) => state.ProductList);
  const { products, error, loading } = product;

  const productDel = useSelector((state) => state.ProductDelete);
  const {loading:loadingDel,error:errorDel,success:successDel  } = productDel;

  const productCreated = useSelector((state) => state.ProductCreate);
  const {loading:loadingCreate,error:errorCreate,success:successCreate,product:CreatedProduct } = productCreated;

  useEffect(() => {
    dispatch({type:PRODUCT_CREATE_RESET})
    
    if (!userInfo.isAdmin) {
      navigate("/login");
    } 
    
    if( successCreate){
      navigate(`/admin/product/${CreatedProduct._id}/edit`)
    }
    else{
      
      dispatch(listProducts());
    }
  }, [dispatch, navigate, userInfo,successDel,successCreate,CreatedProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteProduct(id))
    }
  };

  const createProductHandler=()=>{
       dispatch(createProduct())
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>   Create Product
          </Button>
        </Col>
      </Row>
      
      {loadingDel&&<h2>Delete loading..</h2>}
      {errorDel&&<h3>{errorDel}</h3>}

      {loadingCreate&&<h2>Create loading..</h2>}
      {errorCreate&&<h3>{errorCreate}</h3>}

      {loading ? (
        <h2>loading..</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
