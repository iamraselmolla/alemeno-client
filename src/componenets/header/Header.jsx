import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';
import toast from 'react-hot-toast';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handlelogOut = () => {
        logOut()
            .then(() => {
                // localStorage.removeItem('access-token')
                toast.error(`Hello ${user?.displayName}! You successfully log out`)

            })
            .catch(() => { })
    }

    return (



        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary py-3">
            <Container>
                <Link className='text-decoration-none' to="/" ><Navbar.Brand>Course Store</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <NavLink
                            to="/"
                            className={`text-decoration-none px-3 font-weight-bold text-white  ${({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                                }`}
                        >
                            Home
                        </NavLink>
                        {!user && <> <NavLink
                            to="/login"
                            className={`text-decoration-none px-3 font-weight-bold text-white  ${({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                                }`}
                        >
                            Login
                        </NavLink>
                            <NavLink
                                to="/register"
                                className={`text-decoration-none px-3 font-weight-bold text-white  ${({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                    }`}
                            >
                                Register
                            </NavLink> </>}
                        {
                            user && <>
                                <p onClick={handlelogOut} className="text-white pointer-event ">
                                    Signout
                                </p>
                            </>
                        }

                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;