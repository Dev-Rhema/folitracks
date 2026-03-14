import { jsPDF } from "jspdf";

export default function useDownloadQr() {
  const downloadImage = (qrBase64, plateNumber = "code") => {
    if (!qrBase64) return;
    const a = document.createElement("a");
    a.href = qrBase64;
    a.download = `vehicle-qr-${plateNumber}.png`;
    a.click();
  };

  const downloadPDF = (qrBase64, vehicleInfo) => {
    const { make = "", model = "", plateNumber = "code" } = vehicleInfo || {};
    if (!qrBase64) return;
    
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Vehicle QR Code", 105, 30, { align: "center" });
    doc.setFontSize(12);
    doc.text(`${make} ${model} (${plateNumber})`, 105, 40, { align: "center" });

    // Add QR code to PDF (centered)
    doc.addImage(qrBase64, "PNG", 55, 50, 100, 100);
    doc.save(`vehicle-qr-${plateNumber}.pdf`);
  };

  return { downloadImage, downloadPDF };
}
