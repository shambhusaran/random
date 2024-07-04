import { handleValidation } from "../../lib";
import { InputField, SubmitButton } from "../../components";
import { useFormik } from "formik";
import { Col, Form, FormGroup, Row } from "react-bootstrap";

import * as Yup from "yup";
import YupPassword from "yup-password";
import http from "../../http";
import { setUser } from "../../store";
import { useDispatch, useSelector } from "react-redux";
YupPassword(Yup);

export const ChangePw = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .min(8)
        .max(20)
        .minNumbers(1)
        .minLowercase(1)
        .minUppercase(1)
        .minSymbols(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: (values, { setSubmitting, resetForm, setFieldValue }) => {

      http
        .patch("/profile/password", values)
        .then(() => resetForm())
        // .then(({data})=>{dispatch(setUser(data))
     
        // })
        .catch(({ response }) => {
          handleValidation(formik, response);
        })
        .finally(() => {
          setSubmitting(false);
         
        });
     
    },//Shambhu@123
  });
  return (
    <Col className="bg-white my-3 py-3 rounded-2 shadow-sm">
      <Row>
        <Col>
          <h1>Change Password</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <InputField
              name="oldPassword"
              label="Current Password"
              required
              formik={formik}
              type="password"
            />
            <InputField
              name="newPassword"
              label="New Password"
              required
              formik={formik}
              type="password"
            />
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              required
              formik={formik}
              type="password"
            />
            <FormGroup>
              <SubmitButton disabled={formik.isSubmitting} icon="" />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Col>
  );
};
