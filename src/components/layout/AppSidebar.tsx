import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ClipboardList, 
  GraduationCap,
  Calendar,
  BookMarked,
  Activity,
  Database,
  Trophy,
  Settings,
  LogOut,
  GraduationCap as Logo
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Kelas", url: "/kelas", icon: BookOpen },
  { title: "Siswa", url: "/siswa", icon: Users },
  { title: "Tugas", url: "/tugas", icon: ClipboardList },
  { title: "Nilai", url: "/nilai", icon: GraduationCap },
  { title: "Presensi", url: "/presensi", icon: Calendar },
  { title: "Jurnal", url: "/jurnal", icon: BookMarked },
  { title: "Kegiatan", url: "/kegiatan", icon: Activity },
  { title: "Bank Soal", url: "/bank-soal", icon: Database },
  { title: "Gamifikasi", url: "/gamifikasi", icon: Trophy },
  { title: "Pengaturan", url: "/pengaturan", icon: Settings },
];

interface AppSidebarProps {
  user: {
    username: string;
    userType: "guru" | "siswa";
  };
  onLogout: () => void;
}

export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar
      className="border-r transition-all duration-300"
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-sidebar-primary rounded-lg">
            <Logo className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-primary">Kelas Guru</h2>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                        ${getNavCls({ isActive })}
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.username}
              </p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">
                {user.userType}
              </p>
            </div>
          )}
        </div>
        
        <Button
          onClick={onLogout}
          variant="ghost"
          size="sm"
          className={`w-full ${collapsed ? 'px-2' : 'justify-start'} text-red-600 hover:text-red-700 hover:bg-red-50`}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Keluar</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}