import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userList, userDelete } from "../Actions/userAction";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userslist = useSelector((state) => state.userLists);
  const { users, error, loading } = userslist;

  const userDel = useSelector((state) => state.userDelete);
  const { success: delSuccess } = userDel;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userList());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, delSuccess, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(userDelete(id));
    }
  };

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
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mail to${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
