import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./Layout.css"
import { Outlet } from "react-router-dom"
import { CmsMenu } from "./CmsMenu"
import { Container, Row } from "react-bootstrap"
export const Layout =()=>{
    return <>
    <CmsMenu/>
<Container>
    <Row>
        <Outlet/>
    </Row>
</Container>
    </>
}