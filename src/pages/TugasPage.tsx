import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, RefreshCw, Edit, Trash2, Eye, ClipboardList, Calendar, Clock } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  class: string;
  subject: string;
  type: "Tugas" | "Kuis" | "Ujian" | "Proyek";
  deadline: string;
  status: "Aktif" | "Selesai" | "Terlambat";
  submittedCount: number;
  totalStudents: number;
  createdDate: string;
}

interface AssignmentFormData {
  title: string;
  description: string;
  class: string;
  subject: string;
  type: "Tugas" | "Kuis" | "Ujian" | "Proyek";
  deadline: string;
}

export function TugasPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const [newAssignment, setNewAssignment] = useState<AssignmentFormData>({
    title: "",
    description: "",
    class: "",
    subject: "",
    type: "Tugas",
    deadline: ""
  });

  const [editAssignment, setEditAssignment] = useState<AssignmentFormData>({
    title: "",
    description: "",
    class: "",
    subject: "",
    type: "Tugas",
    deadline: ""
  });

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Latihan Soal Aljabar",
      description: "Kerjakan soal-soal aljabar pada buku halaman 45-50",
      class: "X MIPA 1",
      subject: "Matematika",
      type: "Tugas",
      deadline: "2024-01-20",
      status: "Aktif",
      submittedCount: 25,
      totalStudents: 32,
      createdDate: "2024-01-15"
    },
    {
      id: "2",
      title: "Quiz Trigonometri",
      description: "Quiz online mengenai trigonometri dasar",
      class: "XI IPA 1",
      subject: "Matematika",
      type: "Kuis",
      deadline: "2024-01-18",
      status: "Selesai",
      submittedCount: 28,
      totalStudents: 30,
      createdDate: "2024-01-10"
    },
    {
      id: "3",
      title: "Proyek Fisika - Gerak Parabola",
      description: "Buat laporan eksperimen gerak parabola dengan analisis data",
      class: "XII IPA 2",
      subject: "Fisika",
      type: "Proyek",
      deadline: "2024-01-25",
      status: "Aktif",
      submittedCount: 15,
      totalStudents: 28,
      createdDate: "2024-01-08"
    }
  ]);

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data berhasil diperbarui",
        description: "Semua data tugas telah dimuat ulang",
      });
    }, 1000);
  };

  const resetNewAssignment = () => {
    setNewAssignment({
      title: "",
      description: "",
      class: "",
      subject: "",
      type: "Tugas",
      deadline: ""
    });
  };

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.class || !newAssignment.subject || !newAssignment.deadline) {
      toast({
        title: "Error",
        description: "Judul, kelas, mata pelajaran, dan deadline harus diisi",
        variant: "destructive",
      });
      return;
    }

    const newAssignmentData: Assignment = {
      id: (Date.now()).toString(),
      title: newAssignment.title,
      description: newAssignment.description || "Tidak ada deskripsi",
      class: newAssignment.class,
      subject: newAssignment.subject,
      type: newAssignment.type,
      deadline: newAssignment.deadline,
      status: "Aktif",
      submittedCount: 0,
      totalStudents: 30, // Default value
      createdDate: new Date().toISOString().split('T')[0]
    };

    setAssignments([...assignments, newAssignmentData]);
    resetNewAssignment();
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Tugas berhasil dibuat",
      description: `Tugas "${newAssignment.title}" telah ditambahkan`,
    });
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditAssignment({
      title: assignment.title,
      description: assignment.description,
      class: assignment.class,
      subject: assignment.subject,
      type: assignment.type,
      deadline: assignment.deadline
    });
    setSelectedAssignment(assignment);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAssignment = () => {
    if (!editAssignment.title || !editAssignment.class || !editAssignment.subject || !editAssignment.deadline || !selectedAssignment) {
      toast({
        title: "Error",
        description: "Judul, kelas, mata pelajaran, dan deadline harus diisi",
        variant: "destructive",
      });
      return;
    }

    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === selectedAssignment.id) {
        return {
          ...assignment,
          title: editAssignment.title,
          description: editAssignment.description,
          class: editAssignment.class,
          subject: editAssignment.subject,
          type: editAssignment.type,
          deadline: editAssignment.deadline
        };
      }
      return assignment;
    });

    setAssignments(updatedAssignments);
    setIsEditDialogOpen(false);
    setSelectedAssignment(null);
    
    toast({
      title: "Tugas berhasil diperbarui",
      description: `Tugas "${editAssignment.title}" telah diperbarui`,
    });
  };

  const handleDeleteAssignment = (assignment: Assignment) => {
    const updatedAssignments = assignments.filter((a) => a.id !== assignment.id);
    setAssignments(updatedAssignments);
    
    toast({
      title: "Tugas berhasil dihapus",
      description: `Tugas "${assignment.title}" telah dihapus`,
    });
  };

  const handleViewDetail = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif": return "default";
      case "Selesai": return "secondary";
      case "Terlambat": return "destructive";
      default: return "default";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Tugas": return "bg-blue-100 text-blue-800";
      case "Kuis": return "bg-green-100 text-green-800";
      case "Ujian": return "bg-red-100 text-red-800";
      case "Proyek": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const AssignmentFormFields = ({ formData, setFormData }: { formData: AssignmentFormData, setFormData: (data: AssignmentFormData) => void }) => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Judul Tugas *</Label>
        <Input
          id="title"
          placeholder="Contoh: Latihan Soal Bab 1"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          placeholder="Deskripsi tugas dan petunjuk pengerjaan..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
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
          <Label htmlFor="subject">Mata Pelajaran *</Label>
          <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih mata pelajaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Matematika">Matematika</SelectItem>
              <SelectItem value="Fisika">Fisika</SelectItem>
              <SelectItem value="Kimia">Kimia</SelectItem>
              <SelectItem value="Biologi">Biologi</SelectItem>
              <SelectItem value="Bahasa Indonesia">Bahasa Indonesia</SelectItem>
              <SelectItem value="Bahasa Inggris">Bahasa Inggris</SelectItem>
              <SelectItem value="Sejarah">Sejarah</SelectItem>
              <SelectItem value="Geografi">Geografi</SelectItem>
              <SelectItem value="Ekonomi">Ekonomi</SelectItem>
              <SelectItem value="Sosiologi">Sosiologi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="type">Jenis Tugas</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as "Tugas" | "Kuis" | "Ujian" | "Proyek"})}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tugas">Tugas</SelectItem>
              <SelectItem value="Kuis">Kuis</SelectItem>
              <SelectItem value="Ujian">Ujian</SelectItem>
              <SelectItem value="Proyek">Proyek</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="deadline">Deadline *</Label>
          <Input
            id="deadline"
            type="datetime-local"
            value={formData.deadline}
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kelola Tugas</h1>
          <p className="text-muted-foreground">Kelola semua tugas dan penilaian</p>
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
                Buat Tugas
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Buat Tugas Baru</DialogTitle>
              </DialogHeader>
              <AssignmentFormFields formData={newAssignment} setFormData={setNewAssignment} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleCreateAssignment}>
                  Buat Tugas
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari tugas berdasarkan judul, kelas, mata pelajaran, atau jenis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <ClipboardList className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{assignment.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {assignment.class} • {assignment.subject}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getStatusColor(assignment.status) as any}>
                    {assignment.status}
                  </Badge>
                  <Badge className={getTypeColor(assignment.type)}>
                    {assignment.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
              <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Deadline: {new Date(assignment.deadline).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Dibuat: {new Date(assignment.createdDate).toLocaleDateString('id-ID')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Pengumpulan: </span>
                  <span className="font-medium">{assignment.submittedCount}/{assignment.totalStudents}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetail(assignment)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Detail
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditAssignment(assignment)}
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
                      <AlertDialogTitle>Hapus Tugas</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus tugas "{assignment.title}"? Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteAssignment(assignment)}>
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

      {filteredAssignments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Tidak ada tugas yang sesuai dengan pencarian Anda.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Tugas</DialogTitle>
          </DialogHeader>
          <AssignmentFormFields formData={editAssignment} setFormData={setEditAssignment} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdateAssignment}>
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Detail Tugas: {selectedAssignment?.title}</DialogTitle>
          </DialogHeader>
          {selectedAssignment && (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Judul</Label>
                  <p className="font-medium">{selectedAssignment.title}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Jenis</Label>
                  <Badge className={getTypeColor(selectedAssignment.type)}>
                    {selectedAssignment.type}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Kelas</Label>
                  <p className="font-medium">{selectedAssignment.class}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Mata Pelajaran</Label>
                  <p className="font-medium">{selectedAssignment.subject}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge variant={getStatusColor(selectedAssignment.status) as any}>
                    {selectedAssignment.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Deadline</Label>
                  <p className="font-medium">{new Date(selectedAssignment.deadline).toLocaleString('id-ID')}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Tanggal Dibuat</Label>
                  <p className="font-medium">{new Date(selectedAssignment.createdDate).toLocaleDateString('id-ID')}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Pengumpulan</Label>
                  <p className="font-medium">{selectedAssignment.submittedCount} dari {selectedAssignment.totalStudents} siswa</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Deskripsi</Label>
                <p className="font-medium">{selectedAssignment.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}