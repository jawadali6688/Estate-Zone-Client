import React, { useEffect } from "react";
import myPdf from "./id_card.pdf";

export default function Downloading() {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = myPdf; // Set the PDF file URL
    link.download = "id_card.pdf"; // Set the default filename for the download
    link.click(); // Programmatically trigger the click to start the download
  }, []);

  return (
    <div>
      <iframe
        src={myPdf}
        title="PDF Viewer"
        className="border w-full h-[100vh]"
      />
    </div>
  );
}
