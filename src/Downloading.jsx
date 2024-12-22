import React from 'react'
import myPdf from "./tuv card new final version (1).pdf"
export default function Downloading() {
  return (
    <div>
       <iframe
        src={myPdf}
        title="PDF Viewer"
        className="border w-full h-[100vh]"
      />
    </div>
  )
}
