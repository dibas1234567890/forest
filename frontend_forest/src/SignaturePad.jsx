import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureCapture = ({ hiddenInputRef, setSignatureData }) => {
  const sigCanvas = useRef({});

  const handleClear = () => sigCanvas.current.clear();

  const handleEnd = (e) => {  
    e.stopPropagation(); 
    
    const signaturePoints = sigCanvas.current.toData();
    console.log(signaturePoints)
    setSignatureData(signaturePoints);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = JSON.stringify(signaturePoints);
    } 
  };

  return (
    <div>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        ref={sigCanvas}
        onEnd={handleEnd}
      />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default SignatureCapture;
