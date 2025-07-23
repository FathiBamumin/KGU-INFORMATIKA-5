// Placeholder pages for other menu items

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Users, Calendar, BookMarked, Activity, Database, Trophy, Settings } from "lucide-react";

export function TugasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tugas</h1>
        <p className="text-muted-foreground">Kelola semua tugas dan penilaian</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Manajemen Tugas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fitur manajemen tugas akan tersedia segera.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function NilaiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nilai</h1>
        <p className="text-muted-foreground">Kelola nilai dan rapor siswa</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Penilaian Siswa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fitur penilaian akan tersedia segera.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function PresensiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Presensi</h1>
        <p className="text-muted-foreground">Kelola kehadiran siswa</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Absensi Harian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fitur presensi akan tersedia segera.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function JurnalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jurnal</h1>
        <p className="text-muted-foreground">Jurnal mengajar harian</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookMarked className="w-5 h-5" />
            Jurnal Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fitur jurnal akan tersedia segera.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function KegiatanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kegiatan</h1>
        <p className="text-muted-foreground">Kelola kegiatan dan acara sekolah</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Aktivitas Sekolah
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fitur kegiatan akan tersedia segera.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function BankSoalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bank Soal</h1>
        <p className="text-muted-foreground">Kumpulan soal dan materi pembelajaran</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Koleksi Soal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fitur bank soal akan tersedia segera.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function GamifikasiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gamifikasi</h1>
        <p className="text-muted-foreground">Sistem reward dan achievement</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Pencapaian & Reward
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fitur gamifikasi akan tersedia segera.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function PengaturanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">Konfigurasi sistem dan profil</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Konfigurasi Sistem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fitur pengaturan akan tersedia segera.</p>
        </CardContent>
      </Card>
    </div>
  );
}