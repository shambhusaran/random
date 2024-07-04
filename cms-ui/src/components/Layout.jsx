import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { CmsMenu } from "./CmsMenu";
import { Container, Row } from "react-bootstrap";
import { List } from "../pages/dashboard";
import { CmsRoutes } from "../routes/CmsRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteFromStorage, readFromStorage } from "../lib";
import { setUser } from "../store";
import { LoadingComponent } from "./LoadingComponent";
import http from "../http";
import 'react-confirm-alert/src/react-confirm-alert.css';
export const Layout = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const userToken = readFromStorage("user-token");
      if (userToken) {
        setLoading(true);
            http
            .get("/profile")
            .then(({ data }) => {
              dispatch(setUser(data.user))})
            .catch((err) => deleteFromStorage('userToken'))
            .finally(()=>{setLoading(false)});
            
          
      }
      else{
        setLoading(false)
      }
    }
  }, [user]);

  return (
    <>
      <CmsMenu />
      <Container>
        {loading ?
       <LoadingComponent/>
         : 
          <Row>
            <Outlet />
          </Row>
        }
      </Container>
    </>
  );
};
