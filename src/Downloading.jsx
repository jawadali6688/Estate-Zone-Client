import React, { useEffect, useState } from "react";
import myPdf from "./id_card.pdf";

export default function OpenPdf() {
  const [loader, setLoader] = useState(false)
  const [downloadBtn, setDownloadBtn] = useState(false)
  useEffect(() => {
    try {
      setLoader(true)
      setDownloadBtn(false)
      window.open(myPdf, "_self");
      setTimeout(() => {
        setLoader(false)
        setDownloadBtn(true)
      }, 4000);
    } catch (error) {
      setDownloadBtn(true)
      setLoader(false)
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-8">
      <a href={myPdf} target="_blank" rel="noopener noreferrer" className="px-12 bg-blue-800 py-4 text-white rounded-xl hover:bg-blue-900 active:bg-blue-950">Download PDF</a>
     {
      loader && (
        <div
  class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-pink-700"
  role="status">
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
</div>
      )
     }
    </div>
  );
}
