import {
    Container,
    Dropdown,
    Nav,
    NavDropdown,
    Navbar,
    NavbarCollapse,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { clearUser } from "../store";

export const CmsMenu = () => {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user-token");

        dispatch(clearUser());
    };

    return (
        user && (
            <Navbar bg="dark" data-bs-theme="dark" expand="lg">
                <Container>
                    <Link to='/' className="navbar-brand">Ecommerce</Link>
                    <Navbar.Toggle />
                    <NavbarCollapse>
                        <Nav className="me-auto">
                            {user.access == "admin"? <Nav.Item>
                                <NavLink className="nav-link" to="/staffs">
                                    <i className="fa-solid fa-user-tie me-2"> </i>Staffs
                                </NavLink>
                            </Nav.Item>: ""}
                            <Nav.Item>
                                <NavLink className="nav-link" to="">
                                    Link 2
                                </NavLink>
                            </Nav.Item>
                        
                        </Nav>
                        <Nav>
                            <NavDropdown
                                title={
                                    <>
                                        <i className="fa-regular fa-user me-2"></i>
                                        {user.name}
                                    </>
                                }
                                align="end"
                            >
                                <Link className="dropdown-item" to="/profile/edit">
                                    Edit Profile <i className="fa-solid fa-user-edit ms-2" />
                                </Link>
                                <Link className="dropdown-item" to="/password/edit">
                                    Change Password <i className="fa-solid fa-key ms-2"></i>
                                </Link>
                                <Dropdown.Divider />
                                <Link className="dropdown-item" onClick={handleLogout}>
                                    Logout{" "}
                                    <i className="fa-solid fa-arrow-right-from-bracket ms-2"></i>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        )
    );
};
