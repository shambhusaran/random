import http from "../../http";
import { InputField, SubmitButton } from "../../components";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { storeData } from "../../lib";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";


export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string("Enter a valid email address")
        .required("The email field cannot be empty")
        .email("Enter a valid email address"),
      password: Yup.string().required(),
    }),

    onSubmit: (values, { setSubmitting }) => {
      http
        .post("/auth/login", values)
        .then(({ data }) => {
          storeData("user-token", data.token, rememberMe);
          return http.get("/profile");
        })

        .then(({ data }) => {
          dispatch(setUser(data));
          navigate("/");
        })
        // .catch(({response})=>toast.error(response.data.errors[0]))

        .catch(({ response }) => {
          if ("errors" in response?.data) {
            // const {errors} = response.data
            // for(let k in errors){
            //   formik.setFieldError(k, errors[k])
            // }

            formik.setErrors(response.data.errors);
          }
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Col
      xl={3}
      lg={4}
      md={6}
      sm={8}
      className="mx-auto my-5 bg-white py-3 shadow-sm"
    >
      <Row>
        <Col className="text-center">
          <h1>Login Page</h1>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={formik.handleSubmit}>
          <InputField label="Email" name="email" type="email" formik={formik} />
          <InputField
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Form.Check className="mb-3">
            <Form.Check.Input
              name="remember"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
          </Form.Check>
          <div className="d-grid">
            <SubmitButton
              label="Login"
              variant="dark"
              disabled={formik.isSubmitting}
              icon="fa-arrow-right-to-bracket"
            />
          </div>
        </Form>
      </Row>
    </Col>
  );
};
