import React from "react";
import {Button} from "react-bootstrap"

export const SubmitButton = ({icon = 'fa-save', label = "Submit", variant = "dark", disabled= false}) => {
  return (
    <Button type="submit" variant={variant} disabled={disabled}>
      {label}
      <i
        className={`fa-solid ${
          disabled
            ? "fa-spin fa-spinner"
            : icon
        } ms-2`}
      ></i>
    </Button>
  );
};
