import { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/config/ProtectedRoute";
import { Home } from "./pages/Home";
import { PageNotFound } from "./pages/PageNotFound";
import { Productdetail } from "./pages/Product";
import { Category } from "./pages/Category";
import { AboutUs } from "./pages/AboutUs";
import { Sell } from "./pages/Sell";
import { Help } from "./pages/Help";
import { ContactUs } from "./pages/ContactUs";
import { PaymentMethods } from "./pages/PaymentMethods";
import { Terms } from "./pages/Terms";
import { Login } from "./pages/Login";
import { NoProtectedRoute } from "./components/config/NoProtectedRoute";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Cart } from "./pages/Cart";
import { MyPurchases } from "./pages/MyPurchases";
import { MyPurchasesDetail } from "./pages/MyPurchasesDetail";
import { Profile } from "./pages/Profile";
import { Address } from "./pages/Address";
import { Search } from "./pages/Search";
import { Offers } from "./pages/Offers";
import { Maintenance } from "./pages/Maintenance";
import { InactivateUser } from "./pages/InactivateUser";

interface Props {
  children?: ReactNode;
}
export const Routesgeneral = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mantenimiento" element={<Maintenance />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/vendeturopa" element={<Sell />} />
        <Route path="/ayuda" element={<Help />} />
        <Route path="/contactenos" element={<ContactUs />} />
        <Route path="/mediosdepago" element={<PaymentMethods />} />
        <Route path="/terminosycondiciones" element={<Terms />} />
        <Route path="/producto/:id" element={<Productdetail />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/mypurchases" element={<MyPurchases />} />
          <Route path="/mypurchases/:id" element={<MyPurchasesDetail />} />
          <Route path="/homeprotegido" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inactivateuser" element={<InactivateUser />} />
          <Route path="/address" element={<Address />} />
        </Route>
        <Route element={<NoProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
