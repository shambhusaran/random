import { Col, Row } from "react-bootstrap"

export const LoadingComponent = ()=>{
    return (
        <Row>
            <Col className="text-center">
            <h4>Loading<i className="fa-solid fa-spinner fa-spin ms-2"></i></h4>
            </Col>
        </Row>
    )
}