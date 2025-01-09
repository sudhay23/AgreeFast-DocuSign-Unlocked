const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

const setupAgreefastDocusignConnectBtn = document.querySelector(
  "#setup_agreefast_docusign_connect_btn"
);

setupAgreefastDocusignConnectBtn.addEventListener("click", async (e) => {
  //  Open "https://admindemo.docusign.com/connect" / "https://apps-d.docusign.com/admin/connect"
  //  Open Dropdown by clicking "Add Configuration" button
  //  Check if page has the "Custom" button and click
  //  Fillout the form
  //  Click "Add Configuration" Submit button

  await chrome.runtime.sendMessage({
    message: "start_connect_job",
  });
});
