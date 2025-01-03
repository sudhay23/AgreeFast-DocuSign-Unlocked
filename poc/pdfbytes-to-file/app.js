const fs = require("fs");
const jsondoc = require("./demo.json");

jsondoc.data.envelopeSummary.envelopeDocuments.forEach((x) => {
  // Decode the Base64 string to a binary array
  const binaryString = atob(x.PDFBytes); // Decode base64 to binary string
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  // Convert the binary string to a byte array
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  fs.writeFileSync(
    `/Users/sudhay/Documents/ProjectWorkspace/Hackathons/docusignUnlocked/AgreeFast-DocuSign-Unlocked/${x.name}.pdf`,
    Buffer.from(bytes)
  );
});
