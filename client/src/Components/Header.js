import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'

const Header = () => {
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
                          <LinkContainer to="/signin">
                            <Nav.Link ><i className='fas fa-user'></i>Sign in</Nav.Link>
                          </LinkContainer>  
                          <LinkContainer to="/cart">
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