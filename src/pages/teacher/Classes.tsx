import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, RefreshCw, Plus, Users, BookOpen, Calendar, Edit, Trash2, Eye, MapPin } from "lucide-react";

interface Student {
  id: string;
  name: string;
  nis: string;
  absenNumber: number;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  type: string;
  status: "active" | "completed";
}

interface Class {
  id: string;
  name: string;
  subject: string;
  students: number;
  description: string;
  room: string;
  scheduleDay: string;
  scheduleTime: string;
  walas: string;
  ketuaKelas: string;
  studentList: Student[];
  assignments: Assignment[];
}

interface ClassFormData {
  name: string;
  subject: string;
  description: string;
  room: string;
  scheduleDay: string;
  scheduleTime: string;
  students: number;
  walas: string;
  ketuaKelas: string;
}

export function KelasPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  
  const [newClass, setNewClass] = useState<ClassFormData>({
    name: "",
    subject: "",
    description: "",
    room: "",
    scheduleDay: "",
    scheduleTime: "",
    students: 0,
    walas: "",
    ketuaKelas: ""
  });

  const [editClass, setEditClass] = useState<ClassFormData>({
    name: "",
    subject: "",
    description: "",
    room: "",
    scheduleDay: "",
    scheduleTime: "",
    students: 0,
    walas: "",
    ketuaKelas: ""
  });

  const [classes, setClasses] = useState<Class[]>([
    {
      id: "1",
      name: "X MIPA 1",
      subject: "Matematika",
      students: 32,
      description: "Kelas Matematika untuk siswa IPA kelas 10",
      room: "Lab Matematika 1",
      scheduleDay: "Senin, Rabu, Jumat",
      scheduleTime: "08:00-09:30",
      walas: "Budi Santoso, S.Pd",
      ketuaKelas: "Ahmad Rizki",
      studentList: [
        { id: "1", name: "Ahmad Rizki", nis: "001", absenNumber: 1 },
        { id: "2", name: "Budi Santoso", nis: "003", absenNumber: 2 },
        { id: "3", name: "Dewi Lestari", nis: "004", absenNumber: 3 },
        { id: "4", name: "Sari Indah", nis: "002", absenNumber: 4 },
      ].sort((a, b) => a.name.localeCompare(b.name)),
      assignments: [
        { id: "1", title: "Tugas Aljabar Linear", dueDate: "2024-01-15", type: "Individu", status: "active" },
        { id: "2", title: "Quiz Trigonometri", dueDate: "2024-01-10", type: "Quiz", status: "completed" },
      ]
    },
    {
      id: "2", 
      name: "X IPS 2",
      subject: "Sejarah",
      students: 28,
      description: "Kelas Sejarah untuk siswa IPS kelas 10",
      room: "Ruang IPS 2",
      scheduleDay: "Selasa, Kamis",
      scheduleTime: "10:00-11:30",
      walas: "Siti Nurhaliza, S.Pd",
      ketuaKelas: "Eko Prasetyo",
      studentList: [
        { id: "4", name: "Dewi Lestari", nis: "004", absenNumber: 1 },
        { id: "5", name: "Eko Prasetyo", nis: "005", absenNumber: 2 },
        { id: "6", name: "Fajar Nugroho", nis: "006", absenNumber: 3 },
      ].sort((a, b) => a.name.localeCompare(b.name)),
      assignments: [
        { id: "3", title: "Esai Kemerdekaan Indonesia", dueDate: "2024-01-20", type: "Kelompok", status: "active" },
      ]
    },
    {
      id: "3",
      name: "XI IPA 1", 
      subject: "Fisika",
      students: 30,
      description: "Kelas Fisika untuk siswa IPA kelas 11",
      room: "Lab Fisika",
      scheduleDay: "Senin, Rabu, Jumat",
      scheduleTime: "13:00-14:30",
      walas: "Dr. Rahman, M.Pd",
      ketuaKelas: "Gita Sari",
      studentList: [
        { id: "6", name: "Fajar Nugroho", nis: "006", absenNumber: 1 },
        { id: "7", name: "Gita Sari", nis: "007", absenNumber: 2 },
        { id: "8", name: "Hendra Wijaya", nis: "008", absenNumber: 3 },
      ].sort((a, b) => a.name.localeCompare(b.name)),
      assignments: [
        { id: "4", title: "Laporan Praktikum Gerak", dueDate: "2024-01-25", type: "Praktikum", status: "active" },
      ]
    }
  ]);

  const filteredClasses = classes.filter(
    (kelas) =>
      kelas.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.walas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data berhasil diperbarui",
        description: "Semua data kelas telah dimuat ulang",
      });
    }, 1000);
  };

  const resetNewClass = () => {
    setNewClass({
      name: "",
      subject: "",
      description: "",
      room: "",
      scheduleDay: "",
      scheduleTime: "",
      students: 0,
      walas: "",
      ketuaKelas: ""
    });
  };

  const handleCreateClass = () => {
    if (!newClass.name || !newClass.subject) {
      toast({
        title: "Error",
        description: "Nama kelas dan mata pelajaran harus diisi",
        variant: "destructive",
      });
      return;
    }

    const newClassData: Class = {
      id: (Date.now()).toString(),
      name: newClass.name,
      subject: newClass.subject,
      students: newClass.students,
      description: newClass.description,
      room: newClass.room || "Belum ditentukan",
      scheduleDay: newClass.scheduleDay || "Belum dijadwalkan",
      scheduleTime: newClass.scheduleTime || "Belum ditentukan",
      walas: newClass.walas || "Belum ditentukan",
      ketuaKelas: newClass.ketuaKelas || "Belum dipilih",
      studentList: [],
      assignments: []
    };

    setClasses([...classes, newClassData]);
    resetNewClass();
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Kelas berhasil dibuat",
      description: `Kelas ${newClass.name} telah ditambahkan`,
    });
  };

  const handleEditClass = (kelas: Class) => {
    setEditClass({
      name: kelas.name,
      subject: kelas.subject,
      description: kelas.description,
      room: kelas.room,
      scheduleDay: kelas.scheduleDay,
      scheduleTime: kelas.scheduleTime,
      students: kelas.students,
      walas: kelas.walas,
      ketuaKelas: kelas.ketuaKelas
    });
    setSelectedClass(kelas);
    setIsEditDialogOpen(true);
  };

  const handleUpdateClass = () => {
    if (!editClass.name || !editClass.subject || !selectedClass) {
      toast({
        title: "Error",
        description: "Nama kelas dan mata pelajaran harus diisi",
        variant: "destructive",
      });
      return;
    }

    const updatedClasses = classes.map((kelas) => {
      if (kelas.id === selectedClass.id) {
        return {
          ...kelas,
          name: editClass.name,
          subject: editClass.subject,
          description: editClass.description,
          room: editClass.room,
          scheduleDay: editClass.scheduleDay,
          scheduleTime: editClass.scheduleTime,
          students: editClass.students,
          walas: editClass.walas,
          ketuaKelas: editClass.ketuaKelas
        };
      }
      return kelas;
    });

    setClasses(updatedClasses);
    setIsEditDialogOpen(false);
    setSelectedClass(null);
    
    toast({
      title: "Kelas berhasil diperbarui",
      description: `Kelas ${editClass.name} telah diperbarui`,
    });
  };

  const handleDeleteClass = (kelas: Class) => {
    const updatedClasses = classes.filter((c) => c.id !== kelas.id);
    setClasses(updatedClasses);
    
    toast({
      title: "Kelas berhasil dihapus",
      description: `Kelas ${kelas.name} telah dihapus`,
    });
  };

  const handleViewDetail = (kelas: Class) => {
    setSelectedClass(kelas);
    setIsDetailDialogOpen(true);
  };

  const ClassFormFields = ({ formData, setFormData }: { formData: ClassFormData, setFormData: (data: ClassFormData) => void }) => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="className">Nama Kelas *</Label>
        <Input
          id="className"
          placeholder="Contoh: X MIPA 1"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">Mata Pelajaran *</Label>
        <Input
          id="subject"
          placeholder="Contoh: Matematika"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="room">Ruangan</Label>
        <Input
          id="room"
          placeholder="Contoh: Lab Matematika 1"
          value={formData.room}
          onChange={(e) => setFormData({...formData, room: e.target.value})}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="scheduleDay">Jadwal Hari</Label>
          <Select value={formData.scheduleDay} onValueChange={(value: any) => setFormData({...formData, scheduleDay: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih hari" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Senin">Senin</SelectItem>
              <SelectItem value="Selasa">Selasa</SelectItem>
              <SelectItem value="Rabu">Rabu</SelectItem>
              <SelectItem value="Kamis">Kamis</SelectItem>
              <SelectItem value="Jumat">Jumat</SelectItem>
              <SelectItem value="Senin, Rabu, Jumat">Senin, Rabu, Jumat</SelectItem>
              <SelectItem value="Selasa, Kamis">Selasa, Kamis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="scheduleTime">Jam</Label>
          <Input
            id="scheduleTime"
            placeholder="Contoh: 08:00-09:30"
            value={formData.scheduleTime}
            onChange={(e) => setFormData({...formData, scheduleTime: e.target.value})}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="students">Jumlah Siswa</Label>
        <Input
          id="students"
          type="number"
          placeholder="0"
          value={formData.students}
          onChange={(e) => setFormData({...formData, students: parseInt(e.target.value) || 0})}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="walas">Wali Kelas</Label>
        <Input
          id="walas"
          placeholder="Contoh: Budi Santoso, S.Pd"
          value={formData.walas}
          onChange={(e) => setFormData({...formData, walas: e.target.value})}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ketuaKelas">Ketua Kelas</Label>
        <Input
          id="ketuaKelas"
          placeholder="Contoh: Ahmad Rizki"
          value={formData.ketuaKelas}
          onChange={(e) => setFormData({...formData, ketuaKelas: e.target.value})}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          placeholder="Deskripsi kelas (opsional)"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kelola Kelas</h1>
          <p className="text-muted-foreground">Kelola semua kelas dan mata pelajaran Anda</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Buat Kelas
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Buat Kelas Baru</DialogTitle>
              </DialogHeader>
              <ClassFormFields formData={newClass} setFormData={setNewClass} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleCreateClass}>
                  Buat Kelas
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari kelas, mata pelajaran, ruangan, atau wali kelas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((kelas) => (
          <Card key={kelas.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{kelas.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <BookOpen className="h-4 w-4" />
                    {kelas.subject}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{kelas.students} siswa</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{kelas.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{kelas.scheduleDay} - {kelas.scheduleTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{kelas.room}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetail(kelas)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Detail
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditClass(kelas)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Kelas</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus kelas {kelas.name}? Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteClass(kelas)}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Tidak ada kelas yang sesuai dengan pencarian Anda.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Kelas</DialogTitle>
          </DialogHeader>
          <ClassFormFields formData={editClass} setFormData={setEditClass} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdateClass}>
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedClass?.name} - {selectedClass?.subject}</DialogTitle>
          </DialogHeader>
          {selectedClass && (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Wali Kelas</Label>
                  <p className="font-medium">{selectedClass.walas}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Ketua Kelas</Label>
                  <p className="font-medium">{selectedClass.ketuaKelas}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Ruangan</Label>
                  <p className="font-medium">{selectedClass.room}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Jadwal</Label>
                  <p className="font-medium">{selectedClass.scheduleDay} - {selectedClass.scheduleTime}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-lg font-semibold mb-3 block">Urutan Absen (Sesuai Abjad)</Label>
                <div className="border rounded-lg p-4 max-h-40 overflow-y-auto">
                  <div className="space-y-2">
                    {selectedClass.studentList.map((student, index) => (
                      <div key={student.id} className="flex justify-between items-center py-1">
                        <span>{index + 1}. {student.name}</span>
                        <Badge variant="outline">NIS: {student.nis}</Badge>
                      </div>
                    ))}
                    {selectedClass.studentList.length === 0 && (
                      <p className="text-muted-foreground text-center">Belum ada siswa terdaftar</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-3 block">Tugas ({selectedClass.assignments.length})</Label>
                <div className="border rounded-lg p-4 max-h-40 overflow-y-auto">
                  <div className="space-y-3">
                    {selectedClass.assignments.map((assignment) => (
                      <div key={assignment.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {assignment.dueDate}
                            </span>
                            <span>{assignment.type}</span>
                          </div>
                        </div>
                        <Badge variant={assignment.status === "active" ? "default" : "secondary"}>
                          {assignment.status === "active" ? "Aktif" : "Selesai"}
                        </Badge>
                      </div>
                    ))}
                    {selectedClass.assignments.length === 0 && (
                      <p className="text-muted-foreground text-center">Belum ada tugas</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}