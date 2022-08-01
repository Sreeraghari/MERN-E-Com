import React from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deliverOrder, getOrderDetail, payOrder } from "../Actions/OrderAction";
import { useEffect, useState } from "react";
import axios from "axios";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../Constants/OrderConst";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const OrderId = id;
  const [sdkready, setSdkready] = useState(false);

  const orderDetail = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo} = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDel = useSelector((state) => state.orderDeliver);
  const { loading: loadingDel, success: successDel } = orderDel;

  if (!loading) {
    const Dec = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = Dec(
      order.orderItems.reduce((tot, mul) => tot + mul.price * mul.qty, 0)
    );
  }

  useEffect(() => {
    const paypalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://localhost:5000/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkready(true);
      document.body.appendChild(script);
    };
    if (!order || successPay || successDel) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetail(OrderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        paypalScript();
      } else {
        sdkready(true);
      }
    }
  }, [dispatch, OrderId, successPay,successDel,order]);

  const handlePaymenSuccess = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(OrderId, paymentResult));
  };

  const deliverHandle = () => {
    dispatch(deliverOrder(order._id))
  };

  return loading ? (
    <h2>LOADING....</h2>
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <>
      <h3>Order Id : {order._id}</h3>
      <Row>
        <Col md={8}>
          <ListGroup varient="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>

              <p>
                <strong>Email:</strong>
                <a href={`mail to :${order.user.email}`}>
                  {order.user.email}
                </a>{" "}
                <br />
              </p>

              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postal}, {order.shippingAddress.country},
              </p>
              <p>
                {order.isDelivered ? (
                  <h3> Delivered on {order.delveredAt}</h3>
                ) : (
                  <h3>Not delivered</h3>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              <p>
                {order.isPaid ? (
                  <h3> Paid on {order.paidAt}</h3>
                ) : (
                  <h3>Not Paid</h3>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Item</h2>
              {order.orderItems.length === 0 ? (
                <h2>your Order is empty</h2>
              ) : (
                <ListGroup>
                  {order.orderItems.map((val, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={val.image} alt={val.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${val.product}`}>{val.name}</Link>
                        </Col>
                        <Col md={5}>
                          {val.qty} X {val.price} = ${val.qty * val.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summery</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <h2>Loading....</h2>}
                  {!sdkready ? (
                    <h2>Loading...</h2>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={handlePaymenSuccess}
                    />
                  )}
                </ListGroupItem>
              )}
              {loadingDel&&<h2>deliver Loading...</h2>}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroupItem>
                  <Button
                    type="button"
                    className="bt btn-block"
                    onClick={deliverHandle}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
