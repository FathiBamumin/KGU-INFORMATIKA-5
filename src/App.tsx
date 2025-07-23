import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { KelasPage } from "@/pages/KelasPage";
import { SiswaPage } from "@/pages/SiswaPage";
import { 
  TugasPage, 
  NilaiPage, 
  PresensiPage, 
  JurnalPage, 
  KegiatanPage, 
  BankSoalPage, 
  GamifikasiPage, 
  PengaturanPage 
} from "@/pages/OtherPages";
import { useToast } from "@/hooks/use-toast";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AuthenticatedApp() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleLogin = (userType: "guru" | "siswa", credentials: { username: string; password: string }) => {
    const success = login(userType, credentials);
    
    if (success) {
      toast({
        title: "Login berhasil!",
        description: `Selamat datang, ${credentials.username}`,
      });
    } else {
      toast({
        title: "Login gagal",
        description: "Username atau password salah",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/*" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="kelas" element={<KelasPage />} />
        <Route path="siswa" element={<SiswaPage />} />
        <Route path="tugas" element={<TugasPage />} />
        <Route path="nilai" element={<NilaiPage />} />
        <Route path="presensi" element={<PresensiPage />} />
        <Route path="jurnal" element={<JurnalPage />} />
        <Route path="kegiatan" element={<KegiatanPage />} />
        <Route path="bank-soal" element={<BankSoalPage />} />
        <Route path="gamifikasi" element={<GamifikasiPage />} />
        <Route path="pengaturan" element={<PengaturanPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthenticatedApp />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
