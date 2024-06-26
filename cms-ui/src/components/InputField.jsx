import { Form } from "react-bootstrap"


export const InputField = ({label, type = "text", formik, name}) => {
  return (
    <Form.Group className="mb-3">
    <Form.Label htmlFor={name}> {label}</Form.Label>
    <Form.Control
      type= {type}
      name={name}
      id={name}
      value={type == 'password'? undefined: formik.values[name]}
      required
      isInvalid={formik.touched[name] && formik.errors[name]}
      onChange={formik.handleChange}
      onBlur = {formik.handleBlur}
    />
    {formik.touched[name] && formik.errors[name] && <Form.Control.Feedback type="invalid">{formik.errors[name]}</Form.Control.Feedback>}
  </Form.Group>
  )
}
