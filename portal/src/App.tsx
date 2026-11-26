import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { StoreProvider, useStore } from "./data/store";
import { Toast } from "./ui/ui";
import Login from "./pages/Login";
import DelegateLayout from "./pages/delegate/Layout";
import DelegateHome from "./pages/delegate/Home";
import DelegateBadge from "./pages/delegate/Badge";
import DelegateReceipt from "./pages/delegate/Receipt";
import DelegateCertificate from "./pages/delegate/Certificate";
import DelegateAbstracts from "./pages/delegate/Abstracts";
import DelegateProfile from "./pages/delegate/Profile";
import AdminLayout from "./pages/admin/Layout";
import Overview from "./pages/admin/Overview";
import Registrations from "./pages/admin/Registrations";
import Payments from "./pages/admin/Payments";
import Abstracts from "./pages/admin/Abstracts";
import Attendance from "./pages/admin/Attendance";
import Communications from "./pages/admin/Communications";
import Certificates from "./pages/admin/Certificates";
import Reports from "./pages/admin/Reports";
import Activity from "./pages/admin/Activity";
import SettingsPage from "./pages/admin/Settings";

function Guard({ role, children }: { role: "delegate" | "admin"; children: ReactNode }) {
  const { session } = useStore();
  if (!session || session.role !== role) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<Guard role="delegate"><DelegateLayout /></Guard>}>
            <Route index element={<DelegateHome />} />
            <Route path="badge" element={<DelegateBadge />} />
            <Route path="receipt" element={<DelegateReceipt />} />
            <Route path="certificate" element={<DelegateCertificate />} />
            <Route path="abstracts" element={<DelegateAbstracts />} />
            <Route path="profile" element={<DelegateProfile />} />
          </Route>
          <Route path="/admin" element={<Guard role="admin"><AdminLayout /></Guard>}>
            <Route index element={<Overview />} />
            <Route path="registrations" element={<Registrations />} />
            <Route path="payments" element={<Payments />} />
            <Route path="abstracts" element={<Abstracts />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="communications" element={<Communications />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="reports" element={<Reports />} />
            <Route path="activity" element={<Activity />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
      <Toast />
    </StoreProvider>
  );
}
