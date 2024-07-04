import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingComponent } from "../components";

export const SecuredRoutes = ({ element }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!user) {
      toast.error("Please login to proceed.");
      navigate("/login");
    }
  }, [user]);
  return user? element : <LoadingComponent/>;
};
