import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  BookOpen, 
  ClipboardList, 
  TrendingUp,
  Calendar,
  Award,
  Clock,
  BarChart3,
  Plus,
  X
} from "lucide-react";

export function DashboardPage() {
  const { toast } = useToast();
  
  // State for modals
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  // Form states
  const [newClass, setNewClass] = useState({ name: "", subject: "", room: "", time: "", capacity: "", teacher: "", classLeader: "" });
  const [newTask, setNewTask] = useState({ title: "", description: "", class: "", deadline: "", type: "" });
  const [newStudent, setNewStudent] = useState({ name: "", email: "", phone: "", class: "", nisn: "" });
  const [gradeData, setGradeData] = useState({ student: "", subject: "", assignment: "", score: "" });

  // State for data management
  const [classes, setClasses] = useState([
    { id: "8A", name: "8A - Matematika", students: 25, subject: "Matematika" },
    { id: "8B", name: "8B - Informatika", students: 30, subject: "Informatika" },
    { id: "9A", name: "9A - Matematika", students: 28, subject: "Matematika" },
    { id: "10C", name: "10C - Fisika", students: 22, subject: "Fisika" },
  ]);
  
  const [tasks, setTasks] = useState([
    { id: "1", title: "Review Tugas Matematika 9A", deadline: "Hari ini", priority: "high", class: "9A", status: "pending" },
    { id: "2", title: "Buat Soal Ulangan Fisika", deadline: "Besok", priority: "medium", class: "10C", status: "pending" },
    { id: "3", title: "Input Nilai Informatika 8B", deadline: "3 hari", priority: "low", class: "8B", status: "pending" },
  ]);

  const [students, setStudents] = useState([
    { id: "1", name: "Ahmad Fauzi", email: "ahmad@email.com", class: "8A", nisn: "001" },
    { id: "2", name: "Siti Nurhaliza", email: "siti@email.com", class: "8B", nisn: "002" },
    { id: "3", name: "Budi Santoso", email: "budi@email.com", class: "9A", nisn: "003" },
    { id: "4", name: "Maya Sari", email: "maya@email.com", class: "10C", nisn: "004" },
  ]);

  const [grades, setGrades] = useState([
    { id: "1", student: "Ahmad Fauzi", subject: "Matematika", assignment: "UTS", score: 85 },
    { id: "2", student: "Siti Nurhaliza", subject: "Informatika", assignment: "Kuis 1", score: 92 },
  ]);

  const stats = [
    { title: "Total Kelas", value: "8", icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Total Siswa", value: "125", icon: Users, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Tugas Aktif", value: "15", icon: ClipboardList, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "Rata-rata Nilai", value: "82", icon: TrendingUp, color: "text-purple-600", bgColor: "bg-purple-100" },
  ];

  const recentClasses = [
    { name: "8B - Informatika", students: 1, time: "08:00 - 09:30", room: "Lab Komputer" },
    { name: "9A - Matematika", students: 25, time: "10:00 - 11:30", room: "Ruang 201" },
    { name: "10C - Fisika", students: 22, time: "13:00 - 14:30", room: "Lab Fisika" },
  ];

  const upcomingTasks = [
    { title: "Review Tugas Matematika 9A", deadline: "Hari ini", priority: "high" },
    { title: "Buat Soal Ulangan Fisika", deadline: "Besok", priority: "medium" },
    { title: "Input Nilai Informatika 8B", deadline: "3 hari", priority: "low" },
  ];

  // Handler functions
  const handleCreateClass = () => {
    if (!newClass.name || !newClass.subject || !newClass.room || !newClass.time) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang wajib",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Berhasil",
      description: `Kelas ${newClass.name} berhasil dibuat!`
    });
    setNewClass({ name: "", subject: "", room: "", time: "", capacity: "", teacher: "", classLeader: "" });
    setIsClassModalOpen(false);
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.class || !newTask.deadline) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang wajib",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Berhasil",
      description: `Tugas "${newTask.title}" berhasil dibuat!`
    });
    setNewTask({ title: "", description: "", class: "", deadline: "", type: "" });
    setIsTaskModalOpen(false);
  };

  const handleCreateStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.class || !newStudent.nisn) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang wajib",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Berhasil",
      description: `Siswa ${newStudent.name} berhasil ditambahkan!`
    });
    setNewStudent({ name: "", email: "", phone: "", class: "", nisn: "" });
    setIsStudentModalOpen(false);
  };

  const handleInputGrade = () => {
    if (!gradeData.student || !gradeData.subject || !gradeData.assignment || !gradeData.score) {
      toast({
        title: "Error",
        description: "Harap isi semua field yang wajib",
        variant: "destructive"
      });
      return;
    }
    
    if (isNaN(Number(gradeData.score)) || Number(gradeData.score) < 0 || Number(gradeData.score) > 100) {
      toast({
        title: "Error",
        description: "Nilai harus berupa angka antara 0-100",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Berhasil",
      description: `Nilai ${gradeData.score} berhasil diinput!`
    });
    setGradeData({ student: "", subject: "", assignment: "", score: "" });
    setIsGradeModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali! Berikut ringkasan aktivitas Anda hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Jadwal Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentClasses.map((cls, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{cls.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {cls.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {cls.students} siswa
                    </span>
                  </div>
                </div>
                <div className="text-sm text-primary font-medium">{cls.room}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Tugas Mendatang
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                task.priority === 'high' ? 'bg-red-50 border-red-200' :
                task.priority === 'medium' ? 'bg-orange-50 border-orange-200' :
                'bg-green-50 border-green-200'
              }`}>
                <div>
                  <p className={`font-medium ${
                    task.priority === 'high' ? 'text-red-800' :
                    task.priority === 'medium' ? 'text-orange-800' :
                    'text-green-800'
                  }`}>{task.title}</p>
                  <p className={`text-sm ${
                    task.priority === 'high' ? 'text-red-600' :
                    task.priority === 'medium' ? 'text-orange-600' :
                    'text-green-600'
                  }`}>Deadline: {task.deadline}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority === 'high' ? 'Tinggi' : 
                   task.priority === 'medium' ? 'Sedang' : 'Rendah'}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Aksi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Buat Kelas Baru */}
            <Dialog open={isClassModalOpen} onOpenChange={setIsClassModalOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Buat Kelas Baru</p>
                    <p className="text-sm text-blue-600">Tambah kelas pembelajaran</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Buat Kelas Baru</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="className">Nama Kelas *</Label>
                    <Input
                      id="className"
                      value={newClass.name}
                      onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                      placeholder="Contoh: 8A, 9B"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Mata Pelajaran *</Label>
                    <Input
                      id="subject"
                      value={newClass.subject}
                      onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                      placeholder="Contoh: Matematika, Fisika"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="room">Ruangan *</Label>
                    <Input
                      id="room"
                      value={newClass.room}
                      onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                      placeholder="Contoh: Lab Komputer, Ruang 201"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Waktu *</Label>
                    <Input
                      id="time"
                      value={newClass.time}
                      onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                      placeholder="Contoh: 08:00 - 09:30"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Kapasitas Siswa</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newClass.capacity}
                      onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
                      placeholder="Contoh: 30"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teacher">Wali Kelas</Label>
                    <Input
                      id="teacher"
                      value={newClass.teacher}
                      onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                      placeholder="Contoh: Budi Santoso, S.Pd"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="classLeader">Ketua Kelas</Label>
                    <Input
                      id="classLeader"
                      value={newClass.classLeader}
                      onChange={(e) => setNewClass({ ...newClass, classLeader: e.target.value })}
                      placeholder="Contoh: Ahmad Rizki"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsClassModalOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleCreateClass}>
                    Buat Kelas
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Buat Tugas */}
            <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                  <ClipboardList className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Buat Tugas</p>
                    <p className="text-sm text-green-600">Tambah tugas baru</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Buat Tugas Baru</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="taskTitle">Judul Tugas *</Label>
                    <Input
                      id="taskTitle"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="Contoh: Latihan Soal Bab 1"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="taskDescription">Deskripsi</Label>
                    <Textarea
                      id="taskDescription"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Deskripsi tugas..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="taskClass">Kelas *</Label>
                    <Select value={newTask.class} onValueChange={(value) => setNewTask({ ...newTask, class: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8A">8A - Matematika</SelectItem>
                        <SelectItem value="8B">8B - Informatika</SelectItem>
                        <SelectItem value="9A">9A - Matematika</SelectItem>
                        <SelectItem value="10C">10C - Fisika</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="taskType">Jenis Tugas</Label>
                    <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis tugas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homework">Pekerjaan Rumah</SelectItem>
                        <SelectItem value="quiz">Kuis</SelectItem>
                        <SelectItem value="exam">Ujian</SelectItem>
                        <SelectItem value="project">Proyek</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Deadline *</Label>
                    <Input
                      id="deadline"
                      type="datetime-local"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsTaskModalOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleCreateTask}>
                    Buat Tugas
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Kelola Siswa */}
            <Dialog open={isStudentModalOpen} onOpenChange={setIsStudentModalOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800">Kelola Siswa</p>
                    <p className="text-sm text-purple-600">Tambah atau edit siswa</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tambah Siswa Baru</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="studentName">Nama Lengkap *</Label>
                    <Input
                      id="studentName"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      placeholder="Nama lengkap siswa"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nisn">NISN *</Label>
                    <Input
                      id="nisn"
                      value={newStudent.nisn}
                      onChange={(e) => setNewStudent({ ...newStudent, nisn: e.target.value })}
                      placeholder="Nomor Induk Siswa Nasional"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="studentEmail">Email *</Label>
                    <Input
                      id="studentEmail"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      placeholder="email@contoh.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input
                      id="phone"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      placeholder="08123456789"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="studentClass">Kelas *</Label>
                    <Select value={newStudent.class} onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8A">8A</SelectItem>
                        <SelectItem value="8B">8B</SelectItem>
                        <SelectItem value="9A">9A</SelectItem>
                        <SelectItem value="9B">9B</SelectItem>
                        <SelectItem value="10A">10A</SelectItem>
                        <SelectItem value="10B">10B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsStudentModalOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleCreateStudent}>
                    Tambah Siswa
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Input Nilai */}
            <Dialog open={isGradeModalOpen} onOpenChange={setIsGradeModalOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
                  <Award className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">Input Nilai</p>
                    <p className="text-sm text-orange-600">Update nilai siswa</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Input Nilai Siswa</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="student">Siswa *</Label>
                    <Select value={gradeData.student} onValueChange={(value) => setGradeData({ ...gradeData, student: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih siswa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ahmad">Ahmad Fauzi</SelectItem>
                        <SelectItem value="siti">Siti Nurhaliza</SelectItem>
                        <SelectItem value="budi">Budi Santoso</SelectItem>
                        <SelectItem value="maya">Maya Sari</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gradeSubject">Mata Pelajaran *</Label>
                    <Select value={gradeData.subject} onValueChange={(value) => setGradeData({ ...gradeData, subject: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih mata pelajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematika">Matematika</SelectItem>
                        <SelectItem value="fisika">Fisika</SelectItem>
                        <SelectItem value="informatika">Informatika</SelectItem>
                        <SelectItem value="kimia">Kimia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assignment">Tugas/Ujian *</Label>
                    <Select value={gradeData.assignment} onValueChange={(value) => setGradeData({ ...gradeData, assignment: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tugas/ujian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uts">Ujian Tengah Semester</SelectItem>
                        <SelectItem value="uas">Ujian Akhir Semester</SelectItem>
                        <SelectItem value="kuis1">Kuis 1</SelectItem>
                        <SelectItem value="tugas1">Tugas Harian 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="score">Nilai (0-100) *</Label>
                    <Input
                      id="score"
                      type="number"
                      min="0"
                      max="100"
                      value={gradeData.score}
                      onChange={(e) => setGradeData({ ...gradeData, score: e.target.value })}
                      placeholder="85"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsGradeModalOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleInputGrade}>
                    Simpan Nilai
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}