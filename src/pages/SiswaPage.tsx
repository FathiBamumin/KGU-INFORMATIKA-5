import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Filter, RefreshCw, Edit, Trash2, Eye, User } from "lucide-react";

interface Student {
  id: string;
  name: string;
  class: string;
  nisn: string;
  email: string;
  phone: string;
  status: "Aktif" | "Tidak Aktif";
  address?: string;
  birthDate?: string;
  parentName?: string;
  parentPhone?: string;
}

interface StudentFormData {
  name: string;
  class: string;
  nisn: string;
  email: string;
  phone: string;
  status: "Aktif" | "Tidak Aktif";
  address: string;
  birthDate: string;
  parentName: string;
  parentPhone: string;
}

export function SiswaPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [newStudent, setNewStudent] = useState<StudentFormData>({
    name: "",
    class: "",
    nisn: "",
    email: "",
    phone: "",
    status: "Aktif",
    address: "",
    birthDate: "",
    parentName: "",
    parentPhone: ""
  });

  const [editStudent, setEditStudent] = useState<StudentFormData>({
    name: "",
    class: "",
    nisn: "",
    email: "",
    phone: "",
    status: "Aktif",
    address: "",
    birthDate: "",
    parentName: "",
    parentPhone: ""
  });

  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Ahmad Rizki",
      class: "X MIPA 1",
      nisn: "0012345678",
      email: "ahmad.rizki@email.com",
      phone: "081234567890",
      status: "Aktif",
      address: "Jl. Merdeka No. 123, Jakarta",
      birthDate: "2005-05-15",
      parentName: "Budi Ahmad",
      parentPhone: "081234567800"
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      class: "X IPS 2",
      nisn: "0012345679",
      email: "siti.nurhaliza@email.com",
      phone: "081234567891",
      status: "Aktif",
      address: "Jl. Sudirman No. 456, Jakarta",
      birthDate: "2005-08-20",
      parentName: "Ali Rahman",
      parentPhone: "081234567801"
    },
    {
      id: "3",
      name: "Budi Santoso",
      class: "XI IPA 1",
      nisn: "0012345680",
      email: "budi.santoso@email.com",
      phone: "081234567892",
      status: "Tidak Aktif",
      address: "Jl. Gatot Subroto No. 789, Jakarta",
      birthDate: "2004-12-10",
      parentName: "Santoso Wijaya",
      parentPhone: "081234567802"
    },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nisn.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data berhasil diperbarui",
        description: "Semua data siswa telah dimuat ulang",
      });
    }, 1000);
  };

  const resetNewStudent = () => {
    setNewStudent({
      name: "",
      class: "",
      nisn: "",
      email: "",
      phone: "",
      status: "Aktif",
      address: "",
      birthDate: "",
      parentName: "",
      parentPhone: ""
    });
  };

  const handleCreateStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.nisn || !newStudent.email) {
      toast({
        title: "Error",
        description: "Nama, kelas, NISN, dan email harus diisi",
        variant: "destructive",
      });
      return;
    }

    const newStudentData: Student = {
      id: (Date.now()).toString(),
      name: newStudent.name,
      class: newStudent.class,
      nisn: newStudent.nisn,
      email: newStudent.email,
      phone: newStudent.phone || "Belum diisi",
      status: newStudent.status,
      address: newStudent.address || "Belum diisi",
      birthDate: newStudent.birthDate || "Belum diisi",
      parentName: newStudent.parentName || "Belum diisi",
      parentPhone: newStudent.parentPhone || "Belum diisi"
    };

    setStudents([...students, newStudentData]);
    resetNewStudent();
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Siswa berhasil ditambahkan",
      description: `${newStudent.name} telah ditambahkan ke sistem`,
    });
  };

  const handleEditStudent = (student: Student) => {
    setEditStudent({
      name: student.name,
      class: student.class,
      nisn: student.nisn,
      email: student.email,
      phone: student.phone,
      status: student.status,
      address: student.address || "",
      birthDate: student.birthDate || "",
      parentName: student.parentName || "",
      parentPhone: student.parentPhone || ""
    });
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleUpdateStudent = () => {
    if (!editStudent.name || !editStudent.class || !editStudent.nisn || !editStudent.email || !selectedStudent) {
      toast({
        title: "Error",
        description: "Nama, kelas, NISN, dan email harus diisi",
        variant: "destructive",
      });
      return;
    }

    const updatedStudents = students.map((student) => {
      if (student.id === selectedStudent.id) {
        return {
          ...student,
          name: editStudent.name,
          class: editStudent.class,
          nisn: editStudent.nisn,
          email: editStudent.email,
          phone: editStudent.phone,
          status: editStudent.status,
          address: editStudent.address,
          birthDate: editStudent.birthDate,
          parentName: editStudent.parentName,
          parentPhone: editStudent.parentPhone
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    setIsEditDialogOpen(false);
    setSelectedStudent(null);
    
    toast({
      title: "Siswa berhasil diperbarui",
      description: `Data ${editStudent.name} telah diperbarui`,
    });
  };

  const handleDeleteStudent = (student: Student) => {
    const updatedStudents = students.filter((s) => s.id !== student.id);
    setStudents(updatedStudents);
    
    toast({
      title: "Siswa berhasil dihapus",
      description: `${student.name} telah dihapus dari sistem`,
    });
  };

  const handleViewDetail = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailDialogOpen(true);
  };

  const StudentFormFields = ({ formData, setFormData }: { formData: StudentFormData, setFormData: (data: StudentFormData) => void }) => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="studentName">Nama Lengkap *</Label>
          <Input
            id="studentName"
            placeholder="Nama lengkap siswa"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nisn">NISN *</Label>
          <Input
            id="nisn"
            placeholder="Nomor Induk Siswa Nasional"
            value={formData.nisn}
            onChange={(e) => setFormData({...formData, nisn: e.target.value})}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="class">Kelas *</Label>
          <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="X MIPA 1">X MIPA 1</SelectItem>
              <SelectItem value="X MIPA 2">X MIPA 2</SelectItem>
              <SelectItem value="X IPS 1">X IPS 1</SelectItem>
              <SelectItem value="X IPS 2">X IPS 2</SelectItem>
              <SelectItem value="XI IPA 1">XI IPA 1</SelectItem>
              <SelectItem value="XI IPA 2">XI IPA 2</SelectItem>
              <SelectItem value="XI IPS 1">XI IPS 1</SelectItem>
              <SelectItem value="XI IPS 2">XI IPS 2</SelectItem>
              <SelectItem value="XII IPA 1">XII IPA 1</SelectItem>
              <SelectItem value="XII IPA 2">XII IPA 2</SelectItem>
              <SelectItem value="XII IPS 1">XII IPS 1</SelectItem>
              <SelectItem value="XII IPS 2">XII IPS 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as "Aktif" | "Tidak Aktif"})}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aktif">Aktif</SelectItem>
              <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@contoh.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">No. Telepon</Label>
          <Input
            id="phone"
            placeholder="08123456789"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="birthDate">Tanggal Lahir</Label>
        <Input
          id="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Alamat</Label>
        <Input
          id="address"
          placeholder="Alamat lengkap siswa"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="parentName">Nama Orang Tua</Label>
          <Input
            id="parentName"
            placeholder="Nama orang tua/wali"
            value={formData.parentName}
            onChange={(e) => setFormData({...formData, parentName: e.target.value})}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="parentPhone">No. Telepon Orang Tua</Label>
          <Input
            id="parentPhone"
            placeholder="08123456789"
            value={formData.parentPhone}
            onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kelola Siswa</h1>
          <p className="text-muted-foreground">Kelola data siswa dan informasi terkait</p>
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
                Tambah Siswa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Tambah Siswa Baru</DialogTitle>
              </DialogHeader>
              <StudentFormFields formData={newStudent} setFormData={setNewStudent} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleCreateStudent}>
                  Tambah Siswa
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari siswa berdasarkan nama, kelas, NISN, atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{student.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {student.class} • NISN: {student.nisn}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={student.status === "Aktif" ? "default" : "secondary"}>
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p>{student.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">No. Telepon</p>
                  <p>{student.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Orang Tua</p>
                  <p>{student.parentName || "Belum diisi"}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetail(student)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Detail
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditStudent(student)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Siswa</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus data siswa {student.name}? Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteStudent(student)}>
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

      {filteredStudents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Tidak ada siswa yang sesuai dengan pencarian Anda.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Data Siswa</DialogTitle>
          </DialogHeader>
          <StudentFormFields formData={editStudent} setFormData={setEditStudent} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdateStudent}>
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Detail Siswa: {selectedStudent?.name}</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Nama Lengkap</Label>
                  <p className="font-medium">{selectedStudent.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">NISN</Label>
                  <p className="font-medium">{selectedStudent.nisn}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Kelas</Label>
                  <p className="font-medium">{selectedStudent.class}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge variant={selectedStudent.status === "Aktif" ? "default" : "secondary"}>
                    {selectedStudent.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedStudent.email}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">No. Telepon</Label>
                  <p className="font-medium">{selectedStudent.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Tanggal Lahir</Label>
                  <p className="font-medium">{selectedStudent.birthDate || "Belum diisi"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Alamat</Label>
                  <p className="font-medium">{selectedStudent.address || "Belum diisi"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Nama Orang Tua</Label>
                  <p className="font-medium">{selectedStudent.parentName || "Belum diisi"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">No. Telepon Orang Tua</Label>
                  <p className="font-medium">{selectedStudent.parentPhone || "Belum diisi"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}