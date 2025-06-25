<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\NamedRange;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class LaporanController extends Controller
{
    public function download(Request $request)
    {
        if (!$request->has('month')) {
            return redirect()->back();
        }
        
        $month = $request->get('month');

        $transaction = Transaction::getAllRiwayatByMonth($month);

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->mergeCells('A1:K1');
        $sheet->mergeCells('A2:K2');
        $sheet->mergeCells('H3:J3');
        $sheet->setCellValue('A1', 'Laporan Peminjaman Inventix');
        $sheet->setCellValue('A2', Carbon::parse($month . '-01')->format('m/Y'));
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('A2')->getFont()->setBold(true);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle('A2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $sheet->fromArray([
            'No', 'Kode Inventaris', 'Nama Barang', 'Label', 'Kategori',
            'Peminjam', 'Email', 'Tanggal Peminjaman', null, null,
            'Status', null, 'Total :', 'Kembali', 'Kembali (telat)', 'Belum kembali'
        ], null, 'A3');
        $sheet->getStyle('H3')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle('A2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle('A2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle('A2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $sheet->fromArray([
            null, null, null, null, null, null, null,
            'Mulai', 'Berakhir', 'Dikembalikan'
        ], null, 'A4');

        $row = 5;
        foreach ($transaction['data'] as $i => $item) {
            $sheet->fromArray([
                $i + 1,
                $item['inventaris_code'],
                $item['barang'],
                $item['label'],
                $item['kategori'],
                $item['peminjam_fullname'],
                $item['peminjam_email'],
                Carbon::parse($item['mulai'])->format('Y-m-d'),
                Carbon::parse($item['berakhir'])->format('Y-m-d'),
                $item['kembali'],
                $item['status']
            ], null, 'A' . $row++);
        }

        $headerRange = 'A3:K4';

        $sheet->getStyle($headerRange)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setRGB('000000');
        $sheet->getStyle($headerRange)->getFont()->getColor()->setRGB('FFFFFF');
        $sheet->getStyle($headerRange)->getFont()->setBold(true);

        $lastRow = $row - 1;
        $fullRange = 'A3:K' . $lastRow;

        $sheet->getStyle($fullRange)->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

        $spreadsheet = $sheet->getParent();
        $namedRange = new \PhpOffice\PhpSpreadsheet\NamedRange('data', $sheet, $fullRange);
        $spreadsheet->addNamedRange($namedRange);

        foreach (range('A', 'Q') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $sheet->setCellValue('M4', 'Total :');
        $sheet->setCellValue('N4', $transaction['total']['kembali']);
        $sheet->setCellValue('O4', $transaction['total']['kembali_telat']);
        $sheet->setCellValue('P4', $transaction['total']['belum_kembali']);

        $fileName = 'Laporan-Peminjaman-' . $month . '.xlsx';
        $tempPath = storage_path('app/public/' . $fileName);
        $writer = new Xlsx($spreadsheet);
        $writer->save($tempPath);

        return response()->download($tempPath)->deleteFileAfterSend(true);
    }

}

