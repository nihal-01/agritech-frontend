import { Route, Routes } from "react-router-dom";

import { Header, Footer } from "./components/customer";
import { Admin404Page, AdminHomePage, AdminProductsPage } from "./pages/admin";
import {
  AboutPage,
  ContactPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductsPage,
  ResetPasswordPage,
  SignupPage,
  SingleProductPage,
} from "./pages/customer";
import { AdminSidebar, AdminNavbar } from "./components/admin";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/*" element={<Customer />} />
    </Routes>
  );
}

const Customer = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route
            path="/my-account/lost-password"
            element={<ResetPasswordPage />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const Admin = () => {
  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/products" element={<AdminProductsPage />}></Route>
          <Route path="*" element={<Admin404Page />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
