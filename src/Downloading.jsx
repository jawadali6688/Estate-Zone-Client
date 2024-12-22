import React, { useEffect } from "react";
import myPdf from "./id_card.pdf";

export default function OpenPdf() {
  useEffect(() => {
    window.open(myPdf, "_blank"); // Open the PDF in a new tab or browser window
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-8">
      <h1 className="text-lg font-bold mb-4">Opening Your PDF...</h1>
      <p>If the PDF does not open automatically, <a href={myPdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">click here to open it manually.</a></p>
    </div>
  );
}
