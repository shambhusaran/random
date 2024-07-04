import { LoadingComponent } from "../../components";
import http from "../../http";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
export const List = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getStaffs = () => {
    setLoading(true);
    http
      .get("cms/staffs")
      .then(({ data }) => setStaffs(data))
      .catch((err) => {})
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getStaffs();
  }, []);

  const deleteHandler = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this staff?",
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger btn-sm text-bg-danger ",
          onClick: () => {
            setLoading(true);
            http
              .delete(`cms/staffs/${id}`)
              .then(() => {
                getStaffs();
              })
              .catch(() => {})
              .finally(() => setLoading(false));
          },
        },
        {
          className: "btn btn-primary btn-sm text-bg-primary",
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <Col className="bg-white my-3 py-3 rounded-2 shadow-sm">
      <Row>
        <Col>
          <h1>Staffs</h1>
        </Col>
        <Col xs="auto">
          <Link to="/staffs/create" className="btn btn-dark ">
            <i className="fa-solid fa-plus me-2"> </i>Add Staff
          </Link>
        </Col>
      </Row>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Row>
          <Col>
            {staffs.length > 0 ? (
              <Table size="sm" striped="columns" hover bordered responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Access</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffs.map((staff) => (
                    <tr key={staff._id}>
                      <td>{staff.name}</td>
                      <td>{staff.email}</td>
                      <td>{staff.contact}</td>
                      <td>{staff.address}</td>
                      <td>{staff.status ? "Active" : "Inactive"}</td>
                      <td>{staff.access}</td>
                      <td>
                        {dayjs(staff.createdAt).format("MMM D, YYYY h:mm A")}
                      </td>
                      <td>
                        {dayjs(staff.updatedAt).format("MMM D, YYYY h:mm A")}
                      </td>
                      <td>
                        <Link
                          to={`/staffs/edit/${staff._id}`}
                          className="btn btn-primary btn-sm ms-3 "
                        >
                          Edit{" "}
                          <i className="fa-regular fa-pen-to-square ms-1" />
                        </Link>

                        <Button
                          size="sm"
                          variant="danger"
                          type="button"
                          className="ms-3"
                          onClick={() => deleteHandler(staff._id)}
                        >
                          Delete<i className="fa-solid fa-trash  ms-1"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h4 className="text-muted">Staffs not found</h4>
            )}
          </Col>
        </Row>
      )}
    </Col>
  );
};
