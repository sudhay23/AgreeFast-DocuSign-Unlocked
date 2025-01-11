const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

// Connect Agreefast to Docusign button
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

// Launch Agreefast dashboard (if available)
const lauchAgreefastDashboardBtn = document.querySelector(
  "#launch_agreefast_dashboard_btn"
);

lauchAgreefastDashboardBtn.addEventListener("click", async (e) => {
  // Get current tab in view and send the targeted message
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await chrome.tabs.sendMessage(tabs[0].id, {
      message: "launch_agreefast_dashboard",
    });
  });
});
