import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import ListAdmin from "./page/admin/product/list";
import Add from "./page/admin/product/add";
import Edit from "./page/admin/product/edit";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWebsite />,
     children: [
      { path: "home", index: true, element: ( <div>Home page </div> )}
     ]
  },
  {
    path: 'admin',
    element: <LayoutAdmin />,
     children: [
      { index: true, element:  <div>Home page </div> },
      { path: "products", element: <ListAdmin/> },
      { path: "products/add", element: <Add/> },
      { path: "products/:id/edit", element: <Edit/> }
     ]
  },
  {
    path: '*',
    element: <div>Page not found </div>
  }
])