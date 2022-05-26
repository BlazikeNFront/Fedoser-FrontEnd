export default function useOnPdfResponse() {
  function downloadPdf(pdfBlob: Blob, fileName: string) {
    const downloadLink = document.createElement("a");
    const url = window.URL.createObjectURL(pdfBlob);
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
    downloadLink.remove();
    const timeOutId = setTimeout(() => {
      window.URL.revokeObjectURL(url);
      clearTimeout(timeOutId);
    }, 100);
  }
  function openPdfInNewWindow(pdfBlob: Blob) {
    window.open(URL.createObjectURL(pdfBlob));
  }
  return { downloadPdf, openPdfInNewWindow };
}
