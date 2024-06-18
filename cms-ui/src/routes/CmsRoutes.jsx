import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Layout } from "@/components"
import * as Pages from "@/pages"

export const CmsRoutes = () =>{
    return <BrowserRouter>
    <Routes>
        <Route path= "/" element = {<Layout/>}>
            <Route index element = {<Pages.Dashboard.List/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
}