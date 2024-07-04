import { useFormik } from "formik";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import http from "../../http";
import YupPassword from "yup-password";
import { useNavigate } from "react-router-dom";
import { InputField, SubmitButton } from "../../components";
import { handleValidation } from "../../lib";

import Switch from "react-switch";
import { useState } from "react";
import { StaffForm } from "./StaffForm";
YupPassword(Yup);

export const CreateStaff = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      address: "",
      email: "",
      status: true,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      contact: Yup.string()
        .required()
        .max(15, "Contact must not be more than 15 characters"),
      address: Yup.string().required(),
      email: Yup.string().required().email(),
      status: Yup.boolean().required(),
      password: Yup.string()
        .required()
        .min(8)
        .max(20)
        .minNumbers(1)
        .minLowercase(1)
        .minUppercase(1)
        .minSymbols(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")]),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("/cms/staffs", values)
        .then(() => navigate("/staffs"))
        .catch(({ response }) => handleValidation(response, formik))
        .finally(() => setSubmitting(false));
    },
  });
  return  <Col
  // xl={10}
  // lg={10}
  // md={12}
  // sm={12}
  className=" mx-auto bg-white my-3 py-5 px-5 rounded-2 shadow-sm"
>
  <Row>
    <Col>
      <h1>Create Staff</h1>
    </Col>
  </Row>
  <StaffForm formik={formik}/>
  </Col>

};
