import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Order from "./pages/order";
import User from "./pages/user";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import Login from "./pages/auth/Login";
import Product from "./pages/product";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import Category from "./pages/category";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import Color from "./pages/color";
import AddColor from "./pages/color/AddColor";
import EditColor from "./pages/color/EditColor";
import Size from "./pages/size";
import AddSize from "./pages/size/AddSize";
import EditSize from "./pages/size/EditSize";
import Banners from "./pages/banners";
import AddBanners from "./pages/banners/AddBanners";
import EditBanners from "./pages/banners/EditBanners";

import Blog from "./pages/blog";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";

const App = () => {
  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/order" element={<Order />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/edit/:id" element={<EditCategory />} />
          <Route path="/color" element={<Color />} />
          <Route path="/color/add" element={<AddColor />} />
          <Route path="/color/edit/:id" element={<EditColor />} />
          <Route path="/size" element={<Size />} />
          <Route path="/size/add" element={<AddSize />} />
          <Route path="/size/edit/:id" element={<EditSize />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/banners" element={<Banners />} />
          <Route path="/banners/add" element={<AddBanners />} />
          <Route path="/banners/edit/:id" element={<EditBanners />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/add" element={<AddBlog />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
        </Routes>
      </Layout>
    </div>
  );
};
export default App;
