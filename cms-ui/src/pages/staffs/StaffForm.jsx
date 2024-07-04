import { InputField, SubmitButton } from "../../components";
import { Col, Form, Row } from "react-bootstrap";
import Switch from "react-switch";

export const StaffForm = ({ formik, forEdit = false }) => {
  return (
   
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <InputField
              name="name"
              label="Full name"
              required
              formik={formik}
            />
            <InputField
              name="contact"
              label="Contact"
              required
              formik={formik}
            />
            {!forEdit ? <>
           <InputField name="email" label="Email" required formik={formik} />

            <InputField
              name="password"
              label="Password"
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
             </> : ""}
            <InputField
              name="address"
              as="textarea"
              label="Address"
              required
              formik={formik}
            />
            <Form.Group className="mb-3">
              <Form.Label htmlFor="status">Status</Form.Label>
              <br />
              <Switch
                id="status "
                onChange={() =>
                  formik.setFieldValue("status", !formik.values.status)
                }
                checked={formik.values.status}
              />
            </Form.Group>
            <Form.Group>
              <SubmitButton disabled={formik.isSubmitting} icon="" />
            </Form.Group>
          </Form>
        </Col>
      </Row>

  );
};
