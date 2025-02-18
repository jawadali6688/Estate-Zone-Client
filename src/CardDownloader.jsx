import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CardDownloader() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id_card");
  const myPdf = id ? `/${id}.pdf` : null;

  const [loader, setLoader] = useState(false);
  const [downloadBtn, setDownloadBtn] = useState(false);

  useEffect(() => {
    if (myPdf) {
      try {
        setLoader(true);
        setDownloadBtn(false);
        window.open(myPdf, "_self");
        setTimeout(() => {
          setLoader(false);
          setDownloadBtn(true);
        }, 2000);
      } catch (error) {
        setDownloadBtn(true);
        setLoader(false);
      }
    }
  }, [myPdf]); // ✅ Added dependency

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-8">
      {loader ? (
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-pink-700"
          role="status"
        >
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0">
            Loading...
          </span>
        </div>
      ) : (
        myPdf && (
          <a
            href={myPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 bg-blue-800 py-4 text-white rounded-xl hover:bg-blue-900 active:bg-blue-950"
          >
            Download PDF
          </a>
        )
      )}

      {
        !myPdf  && (
            <h1>Scan the QR Code again to see document. </h1>
        )
      }
      
    </div>
  );
}
