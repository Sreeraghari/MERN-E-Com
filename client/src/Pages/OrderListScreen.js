import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { orderAdminList } from "../Actions/OrderAction";

const OrderListScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderlist = useSelector((state) => state.orderAdmin);
  const { Order, error, loading } = orderlist;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(orderAdminList())
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);


  return (
    <div>
      {loading ? (
        <h2>loading..</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>TOTAL</th>
              <th>DATE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {Order.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user&&order.user.name}</td>
                <td>{order.totalPrice}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>
                  {!order.isPaid? (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                    ) : (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  )}
                </td>
                
                <td>
                  {order.isDelivered? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                    ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
Details                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;
