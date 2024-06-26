import { Container, Nav, NavDropdown, Navbar, NavbarCollapse } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"

export const CmsMenu = ()=>{
    const user = useSelector(state=>state.user.value)
    return user && <Navbar bg = "dark" data-bs-theme = "dark" expand = "lg">
        <Container>
            <Link className = "navbar-brand">Ecommerce</Link>
            <Navbar.Toggle/>
            <NavbarCollapse>
                <Nav className= "me-auto">
                    <Nav.Item>
                        <NavLink className = "nav-link" to="">Link 1</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className = "nav-link" to="">Link 2</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className = "nav-link" to="">Link 3</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className = "nav-link" to="">Link 4</NavLink>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <NavDropdown title = "Demo User" align= "end">
                        <Link className= "dropdown-item">Dropdown Link</Link>
                    </NavDropdown>
                </Nav>
            </NavbarCollapse>

        </Container>
    </Navbar>
}