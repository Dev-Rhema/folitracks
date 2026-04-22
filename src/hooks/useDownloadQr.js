import { jsPDF } from "jspdf";

export default function useDownloadQr() {
  const downloadImage = (qrBase64, fullName) => {
    if (!qrBase64) return;
    const a = document.createElement("a");
    a.href = qrBase64;
    a.download = `${fullName}-folitracks-qr-code.png`;
    a.click();
  };

  const downloadPDF = (qrBase64, fullName) => {
    if (!qrBase64) return;
    
    const doc = new jsPDF();
    // Add QR code to PDF (centered)
    doc.addImage(qrBase64, "PNG", 55, 50, 100, 100);
    doc.save(`${fullName}-folitracks-qr-code.pdf`);
  };

  return { downloadImage, downloadPDF };
}
