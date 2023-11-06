import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';
import toast from 'react-hot-toast';
import { NavDropdown } from 'react-bootstrap';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handlelogOut = () => {
        logOut()
            .then(() => {
                // localStorage.removeItem('access-token')
                return toast.error(`Hello ${user?.displayName}! You successfully log out`)

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


                    </Nav>
                    {user && <NavDropdown className='text-white' title={`Hello ${user?.displayName}`} id="basic-nav-dropdown">
                        <Link className='px-3 py-1 d-block  text-decoration-none  text-white ' to="/dashboard">
                            Dashboard
                        </Link>
                        <div style={{ cursor: 'pointer' }} className='px-3 py-1 d-block  text-decoration-none  text-white ' onClick={handlelogOut}>
                            Sign Out
                        </div>

                    </NavDropdown>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;