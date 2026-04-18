# Script: copy-project-images.ps1
# Jalankan script ini dari folder Porto dengan klik kanan > Run with PowerShell
# ATAU di PowerShell: .\copy-project-images.ps1

$srcDir = "C:\Users\Rizallazis\.gemini\antigravity\brain\ad2d3689-bad3-42c0-b421-f5fd833b0347"
$destDir = "C:\Users\Rizallazis\Downloads\Porto\assets\images\projects"

# Pastikan folder tujuan ada
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir
}

# Mapping nama file: source pattern -> destination
$mappings = @{
    "project_kampanye_inklusivitas_*"    = "project-1.jpg"
    "project_dokumentasi_kemanusiaan_*" = "project-2.jpg"
    "project_majalah_humanity_*"        = "project-3.jpg"
    "project_ismkmi_konselor_*"         = "ismkmi.jpg"
    "project_tambaler_id_*"             = "tambaler.jpg"
    "project_psikoedukasi_mental_*"     = "psikoedukasi.jpg"
    "project_skinner_teori_*"           = "skinner.jpg"
    "project_psikometrika_irt_*"        = "psikometrika.jpg"
    "project_konseling_klinis_*"        = "konseling.jpg"
    "project_regresi_logistik_*"        = "data-analytics.jpg"
    "project_data_cleaning_*"           = "data-cleaning.jpg"
    "project_life_after_campus_*"       = "life-after-campus.jpg"
    "project_asesmen_komprehensif_*"    = "asesmen-komprehensif.jpg"
    "project_regulasi_emosi_*"          = "refleksi-diri.jpg"
    "project_modifikasi_perilaku_*"     = "modifikasi-perilaku.jpg"
    "project_sop_hr_*"                  = "sop-hr.jpg"
    "project_peraturan_perusahaan_*"    = "peraturan-perusahaan.jpg"
}

$successCount = 0
$failCount = 0

foreach ($pattern in $mappings.Keys) {
    $destName = $mappings[$pattern]
    $srcFiles = Get-ChildItem -Path $srcDir -Filter ($pattern + ".png") -ErrorAction SilentlyContinue
    
    if ($srcFiles.Count -eq 0) {
        Write-Host "[GAGAL] Tidak ditemukan: $pattern" -ForegroundColor Red
        $failCount++
    } else {
        $srcFile = $srcFiles[0].FullName
        $destPath = Join-Path $destDir $destName
        Copy-Item $srcFile $destPath -Force
        Write-Host "[OK] $($srcFiles[0].Name) -> $destName" -ForegroundColor Green
        $successCount++
    }
}

Write-Host ""
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "Selesai! $successCount berhasil, $failCount gagal." -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

if ($failCount -eq 0) {
    Write-Host "Semua gambar berhasil disalin ke: $destDir" -ForegroundColor Green
    Write-Host "Buka index.html di browser untuk melihat hasilnya!" -ForegroundColor Yellow
}

Read-Host "Tekan Enter untuk menutup..."
