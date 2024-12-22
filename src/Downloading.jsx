import React, { useEffect } from "react";
import myPdf from "./id_card.pdf";

export default function OpenPdf() {
  useEffect(() => {
    window.open(myPdf, "_blank"); // Open the PDF in a new tab or browser window
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-8">
      <a href={myPdf} target="_blank" rel="noopener noreferrer" className="px-12 bg-blue-800 py-4 text-white rounded-xl hover:bg-blue-900 active:bg-blue-950">Download PDF</a>
    </div>
  );
}
