import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import http from "../../http";
import YupPassword from "yup-password";
import { useNavigate, useParams } from "react-router-dom";
import { handleValidation } from "../../lib";
import Switch from "react-switch";
import { StaffForm } from "./StaffForm";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components";
YupPassword(Yup);

export const EditStaff = () => {
  // http.get(`staff/${}`)
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    http
      .get(`/cms/staffs/${params.id}`)
      .then(({ data }) => {
        console.log(data);
        formik.setValues({
          name: data.name,
          contact: data.contact,
          address: data.address,
          status: data.status,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      address: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      contact: Yup.string()
        .required()
        .max(15, "Contact must not be more than 15 characters"),
      address: Yup.string().required(),
      status: Yup.boolean().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .patch(`/cms/staffs/${params.id}`, values)
        .then(() => navigate("/staffs"))
        .catch(({ response }) => handleValidation(response, formik))
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Col className="bg-white my-3 py-3 rounded-2 shadow-sm">
      <Row>
        <Col>
          <h1>Edit Staff</h1>
        </Col>
      </Row>

      {loading ? (
        <LoadingComponent />
      ) : (
        <StaffForm formik={formik} forEdit={true} />
      )}
    </Col>
  );
};
