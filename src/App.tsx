
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import VendorsPage from "./pages/VendorsPage";
import ContainersPage from "./pages/ContainersPage";
import DocumentsPage from "./pages/DocumentsPage";
import AdminDashboard from "./pages/AdminDashboard";
import BlogListPage from "./pages/BlogListPage";
import BlogEditorPage from "./pages/BlogEditorPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogListPublicPage from "./pages/BlogListPublicPage";
import NewShipmentPage from "./pages/NewShipmentPage";
import NewVendorPage from "./pages/NewVendorPage";
import NewDocumentPage from "./pages/NewDocumentPage";
import UserSettingsPage from "./pages/UserSettingsPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" />
        
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Blog Public Routes */}
              <Route path="/blog" element={<BlogListPublicPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              
              {/* Dashboard Routes - Authenticated */}
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard requireAuth={true}>
                    <DashboardPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/shipments" 
                element={
                  <AuthGuard requireAuth={true}>
                    <ShipmentsPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/shipments/new" 
                element={
                  <AuthGuard requireAuth={true}>
                    <NewShipmentPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/vendors" 
                element={
                  <AuthGuard requireAuth={true}>
                    <VendorsPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/vendors/new" 
                element={
                  <AuthGuard requireAuth={true}>
                    <NewVendorPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/containers" 
                element={
                  <AuthGuard requireAuth={true}>
                    <ContainersPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/documents" 
                element={
                  <AuthGuard requireAuth={true}>
                    <DocumentsPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/documents/new" 
                element={
                  <AuthGuard requireAuth={true}>
                    <NewDocumentPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/settings" 
                element={
                  <AuthGuard requireAuth={true}>
                    <UserSettingsPage />
                  </AuthGuard>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/dashboard/admin" 
                element={
                  <AuthGuard requireAuth={true} requireAdmin={true} redirectTo="/dashboard">
                    <AdminDashboard />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/blog" 
                element={
                  <AuthGuard requireAuth={true} requireAdmin={true} redirectTo="/dashboard">
                    <BlogListPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/blog/new" 
                element={
                  <AuthGuard requireAuth={true} requireAdmin={true} redirectTo="/dashboard">
                    <BlogEditorPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard/blog/:id/edit" 
                element={
                  <AuthGuard requireAuth={true} requireAdmin={true} redirectTo="/dashboard">
                    <BlogEditorPage />
                  </AuthGuard>
                } 
              />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
