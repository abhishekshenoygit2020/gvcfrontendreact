import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/components/Login/Login";
import Registration from "./pages/components/Login/Registration";
import ProtectedRoutes from "./protectedRoutes";
import ChangePassword from "./pages/components/Login/ChangePassword";


import HomeAdmin from "./pages/components/Home/AdminD";

import AddPersonalInformation from "./pages/components/Admin/Personal Information/AddPersonalInformation";
import ViewDealership from "./pages/components/Admin/Dealership/ViewDealership";
import AddDealership from "./pages/components/Admin/Dealership/AddDealership";
import Dashboard from "./pages/components/Admin/Dashboard/Dashboard";
import WarrantyProducts from "./pages/components/Admin/ManageWarantyProducts/WarrantyProducts";
import UserList from "./pages/components/User/UserList";
import BuildWarranty from "./pages/components/BuildWarranty/BuildWarranty";
import ViewPendingWarranty from "./pages/components/BuildWarranty/ViewPendingWarranty";
import ViewClosedWarranty from "./pages/components/BuildWarranty/ViewClosedWarranty";
import AddCategory from "./pages/components/Admin/Category/AddCategory";
import AddSubCategory from "./pages/components/Admin/SubCategory/AddSubCategory";
import ViewSubCategory from "./pages/components/Admin/SubCategory/ViewSubCategory";
import ViewCategory from "./pages/components/Admin/Category/ViewCategory";
import AddwarrantyPro from "./pages/components/Admin/WarrantyProtection/AddwarrantyPro";
import ViewwarrantyPro from "./pages/components/Admin/WarrantyProtection/ViewwarrantyPro";
import ViewWarrantyProduct from "./pages/components/Admin/ManageWarantyProducts/ViewWarrantyProduct";
import ForgotPassword from "./pages/components/Login/ForgotPassword";
import ForgotChangePassword from "./pages/components/Login/ForgotChangePassword";
import LogList from "./pages/components/BuildWarranty/ViewLogDetails";
import PDFgen from "./pages/components/BuildWarranty/PDF";
import AddSalesrep from "./pages/components/Admin/Salesrep/Addsalesrep";
import ViewInvoicingData from "./pages/components/BuildWarranty/ViewInvoicingData";
import ViewSalesrep from "./pages/components/Admin/Salesrep/Viewsalesrep";
import ViewCustomiseWarrantyProduct from "./pages/components/Admin/ManageWarantyProducts/ViewCustomiseWarrantyProduct";
import ViewDealershipWarrantyProduct from "./pages/components/Admin/ManageWarantyProducts/ViewDealershipWarrantyProduct";
import ViewSalesrepWarrantyProduct from "./pages/components/Admin/ManageWarantyProducts/ViewSalesrepWarrantyProduct";
import ViewWarrantyCommission from "./pages/components/BuildWarranty/ViewWarrantyCommision";
import ViewCommissionPerc from "./pages/components/BuildWarranty/ViewCommissionPerc";
import RelationshipUserList from "./pages/components/User/RelationshipUserList";
import RelationshipModelComponent from "./pages/components/User/RelationshipUserModelComponent";
import ViewRelationshipCommission from "./pages/components/BuildWarranty/ViewRelationshipCommision";
import ViewSalesrepCommission from "./pages/components/BuildWarranty/ViewSalesrepCommission";
import Commission from "./pages/components/Admin/Dealership/Commision";
import ViewSalesrepCommissionSP from "./pages/components/BuildWarranty/ViewSalesrepCommissionSP";
import ViewSalesrepGiftCommission from "./pages/components/BuildWarranty/ViewSalesrepGiftCommission";
import NotificationsPage from "./pages/components/Admin/Notifications/NotificationsPage";
import ViewRestoreWarranty from "./pages/components/BuildWarranty/ViewRestoreWarranty";
import ViewInvoicingDetailData from "./pages/components/BuildWarranty/ViewInvoicingDetailData";

const MainRoutes = () => {
  return (
    <Routes>
      <Route exact path="/Login" element={<Login />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/InitialPasswordChange" element={<ChangePassword />} />
      <Route path="/ForgotPasswordRequest" element={<ForgotPassword />} />
      <Route
        path="/ForgotPassword/:emailId"
        element={<ForgotChangePassword />}
      />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomeAdmin />}>
          <Route index element={<Navigate to="/Dashboard" />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/A" element={<Dashboard />} />
          <Route path="/BuildWarranty" element={<BuildWarranty />} />
          <Route
            path="/RelationshipUserList"
            element={<RelationshipUserList />}
          />
          <Route
            path="/Notifications"
            element={<NotificationsPage />}
          />

          <Route path="/LogList" element={<LogList />} />
          <Route path="/PDFGen" element={<PDFgen />} />
          <Route path="/Commission" element={<Commission />} />
          <Route
            path="/ViewPendingWarranty"
            element={<ViewPendingWarranty />}
          />
          <Route
            path="/ViewWarrantyCommission"
            element={<ViewWarrantyCommission />}
          />
          <Route
            path="/ViewRestoreWarranty"
            element={<ViewRestoreWarranty />}
          />
          <Route
            path="/ViewRelationshipCommission"
            element={<ViewRelationshipCommission />}
          />
          <Route
            path="/ViewSalesrepGiftCommission"
            element={<ViewSalesrepGiftCommission />}
          />
          <Route
            path="/ViewSalesrepCommission"
            element={<ViewSalesrepCommission />}
          />
          <Route path="/ViewClosedWarranty" element={<ViewClosedWarranty />} />
          <Route path="/ViewCommissionPerc" element={<ViewCommissionPerc />} />
          <Route path="/ViewInvoicingDetailData" element={<ViewInvoicingDetailData />} />
          <Route path="/WarrantyProducts" element={<WarrantyProducts />} />
          <Route
            path="/WarrantyCustomiseProducts"
            element={<ViewCustomiseWarrantyProduct />}
          />
          <Route path="/Users" element={<UserList />} />
          <Route
            path="/Personalinformation"
            element={<AddPersonalInformation />}
          />
          <Route
            path="/ViewWarrantyProduct"
            element={<ViewWarrantyProduct />}
          />
          <Route
            path="/ViewDealershipWarrantyProduct"
            element={<ViewDealershipWarrantyProduct />}
          />
          <Route
            path="/ViewSalesrepWarrantyProduct"
            element={<ViewSalesrepWarrantyProduct />}
          />
          <Route path="/ViewInvoicingData" element={<ViewInvoicingData />} />
          <Route path="/ViewDealership" element={<ViewDealership />} />
          <Route path="/AddDealership" element={<AddDealership />} />
          <Route path="/ViewSalesrep" element={<ViewSalesrep />} />
          <Route path="/AddSalesrep" element={<AddSalesrep />} />       
          <Route path="/AddSubCategory" element={<AddSubCategory />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/ViewCategory" element={<ViewCategory />} />
          <Route path="/ViewSubCategory" element={<ViewSubCategory />} />
          <Route path="/AddwarrantyPro" element={<AddwarrantyPro />} />
          <Route path="/ViewwarrantyPro" element={<ViewwarrantyPro />} />        
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Route>
      </Route>    
    </Routes>
  );
};

export default MainRoutes;

// rgb(139 92 246 /1)
