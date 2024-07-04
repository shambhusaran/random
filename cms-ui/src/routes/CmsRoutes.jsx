import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "@/components";
import * as Pages from "../pages";
import { SecuredRoutes } from "./SecuredRoutes";

export const CmsRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={<SecuredRoutes element={<Pages.Dashboard.List />} />}
                    />
                    <Route
                        path="/profile/edit"
                        element={<SecuredRoutes element={<Pages.Profile.Edit />} />}
                    />
                    <Route
                        path="/password/edit"
                        element={<SecuredRoutes element={<Pages.Profile.ChangePw />} />}
                    />
                    <Route path="staffs" element={<SecuredRoutes element={<Outlet />} />}>
                        <Route index element={<Pages.Staffs.List />} />
                        <Route path="create" element={<Pages.Staffs.CreateStaff />} />
                        <Route path="edit/:id" element={<Pages.Staffs.EditStaff />} />
                    </Route>
                    <Route path="/login" element={<Pages.Auth.Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
