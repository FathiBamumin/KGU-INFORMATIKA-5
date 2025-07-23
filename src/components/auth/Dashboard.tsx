import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, LogOut, Users, BookOpen, Calendar, BarChart3 } from "lucide-react";

interface DashboardProps {
  userType: "guru" | "siswa";
  username: string;
  onLogout: () => void;
}

export function Dashboard({ userType, username, onLogout }: DashboardProps) {
  const isGuru = userType === "guru";

  const guruStats = [
    { title: "Total Siswa", value: "125", icon: Users, color: "text-blue-600" },
    { title: "Kelas Aktif", value: "8", icon: BookOpen, color: "text-green-600" },
    { title: "Jadwal Hari Ini", value: "5", icon: Calendar, color: "text-orange-600" },
    { title: "Tugas Pending", value: "12", icon: BarChart3, color: "text-purple-600" },
  ];

  const siswaStats = [
    { title: "Kelas Diikuti", value: "6", icon: BookOpen, color: "text-blue-600" },
    { title: "Tugas Pending", value: "3", icon: BarChart3, color: "text-orange-600" },
    { title: "Jadwal Hari Ini", value: "4", icon: Calendar, color: "text-green-600" },
    { title: "Nilai Rata-rata", value: "85", icon: Users, color: "text-purple-600" },
  ];

  const stats = isGuru ? guruStats : siswaStats;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Dashboard {isGuru ? "Guru" : "Siswa"}
            </h1>
            <p className="text-muted-foreground">
              Selamat datang, {username}!
            </p>
          </div>
        </div>
        
        <Button onClick={onLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Keluar
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {isGuru ? "Jadwal Mengajar Hari Ini" : "Jadwal Kelas Hari Ini"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGuru ? (
              <>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Matematika - Kelas 10A</p>
                    <p className="text-sm text-muted-foreground">08:00 - 09:30</p>
                  </div>
                  <div className="text-sm text-primary font-medium">Ruang 101</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Fisika - Kelas 11B</p>
                    <p className="text-sm text-muted-foreground">10:00 - 11:30</p>
                  </div>
                  <div className="text-sm text-primary font-medium">Ruang 205</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Matematika - Kelas 10B</p>
                    <p className="text-sm text-muted-foreground">13:00 - 14:30</p>
                  </div>
                  <div className="text-sm text-primary font-medium">Ruang 102</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Matematika</p>
                    <p className="text-sm text-muted-foreground">08:00 - 09:30 • Pak Budi</p>
                  </div>
                  <div className="text-sm text-primary font-medium">Ruang 101</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Bahasa Indonesia</p>
                    <p className="text-sm text-muted-foreground">10:00 - 11:30 • Bu Sari</p>
                  </div>
                  <div className="text-sm text-primary font-medium">Ruang 103</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Fisika</p>
                    <p className="text-sm text-muted-foreground">13:00 - 14:30 • Pak Ahmad</p>
                  </div>
                  <div className="text-sm text-primary font-medium">Lab Fisika</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {isGuru ? "Aksi Cepat" : "Tugas Terbaru"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGuru ? (
              <>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Kelola Siswa
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Buat Tugas Baru
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Jadwal Kelas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Laporan Nilai
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <p className="font-medium text-red-800">Tugas Matematika</p>
                    <p className="text-sm text-red-600">Deadline: Besok</p>
                  </div>
                  <Button size="sm" variant="destructive">Kerjakan</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div>
                    <p className="font-medium text-orange-800">Tugas Fisika</p>
                    <p className="text-sm text-orange-600">Deadline: 3 hari</p>
                  </div>
                  <Button size="sm" variant="outline">Lihat</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Tugas B. Indonesia</p>
                    <p className="text-sm text-green-600">Selesai</p>
                  </div>
                  <Button size="sm" variant="outline" disabled>Selesai</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}