import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider } from "react-redux";
import store from "./store";
import { CmsRoutes } from "./routes/CmsRoutes";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition="bounce"
      /> */}
      <ToastContainer/>
      <CmsRoutes />
    </Provider>
  </React.StrictMode>
);
