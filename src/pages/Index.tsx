import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { Dashboard } from "@/components/auth/Dashboard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
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

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout berhasil",
      description: "Sampai jumpa lagi!",
    });
  };

  if (isAuthenticated && user) {
    return (
      <Dashboard 
        userType={user.userType} 
        username={user.username} 
        onLogout={handleLogout} 
      />
    );
  }

  return <LoginForm onLogin={handleLogin} />;
};

export default Index;
