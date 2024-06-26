import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./Layout.css"
import { Outlet } from "react-router-dom"
import { CmsMenu } from "./CmsMenu"
import { Container, Row } from "react-bootstrap"
import { List } from "../pages/dashboard"
import { CmsRoutes } from "../routes/CmsRoutes"
export const Layout = () => {
    return <>
        <CmsMenu />
        <Container>
   
            <Row>
                <Outlet />
                {/* <List /> */}
            </Row>

        </Container>
    </>
}