import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown, NavDropdownItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../Actions/userAction'

const Header = () => {
    const dispatch = useDispatch()

    const userlogin = useSelector(state => state.userLogin)

    const { userInfo } = userlogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>My Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to='/profile' >
                                        <NavDropdown.Item >Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}  >Log out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link ><i className='fas fa-user'></i>Sign in</Nav.Link>
                                </LinkContainer>
                            )}
                            <LinkContainer to="/cart/items">
                                <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header