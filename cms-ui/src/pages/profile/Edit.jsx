import { handleValidation } from "../../lib";
import { InputField, SubmitButton } from "../../components";
import { useFormik } from "formik";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import http from "../../http";
import { setUser } from "../../store";

export const Edit = () => {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: user.name,
            contact: user.contact,
            address: user.address,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            contact: Yup.string().required().max(15, "Contact must not be more than 15 characters"),
            address: Yup.string().required(),
        }),
        onSubmit: (values, { setSubmitting }) => {
            http
                .patch(`cms/profile/edit/${params.id}`, values)
                .then(() => http.get('/staffs')
                .then(({data})=>dispatch(setUser(data)))
            )
                .catch(({response}) => handleValidation(response, formik) )
                .finally(() => setSubmitting(false));
        },
    });
    return (
        <Col className="bg-white my-3 py-3 rounded-2 shadow-sm">
            <Row>
                <Col>
                    <h1>Welcome to edit page</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form onSubmit={formik.handleSubmit} >
                    <InputField name ="name" label = "Full name" required formik={formik}/>
                    <InputField name ="contact" label = "Contact" required formik={formik}/>
                    <InputField name ="address" as= "textarea" label = "Address" required formik={formik}/>
                    <FormGroup>
                        <SubmitButton disabled= {formik.isSubmitting} icon=""/>
                    </FormGroup>

                </Form>
                </Col>
            </Row>
        </Col>
    );
};
