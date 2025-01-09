const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

// Set Storage Keys to NULL upon install
chrome.runtime.onStartup.addListener(async (reason) => {
  await chrome.storage.local.set({
    connect_job_active: false,
    jobTabId: null,
  });
});

// Listen for messages from "popup" and "content" scripts
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  try {
    switch (request.message) {
      case "start_connect_job":
        await chrome.action.setBadgeText({ text: "BUSY" });
        await chrome.action.setBadgeBackgroundColor({ color: "#90d5ff" });
        const jobTab = await chrome.tabs.create({
          active: true,
          pinned: true,
          // url: `https://admindemo.docusign.com/connect`,
          url: `https://apps-d.docusign.com/admin/connect`,
        });
        await chrome.storage.local.set({
          connect_job_active: true,
          jobTabId: jobTab.id,
        });
        break;

      case "end_connect_job":
        chrome.storage.local.get(
          ["connect_job_active", "jobTabId"],
          async ({ connect_job_active, jobTabId }) => {
            await chrome.storage.local.set({
              connect_job_active: false,
              jobTabId: null,
            });
            await chrome.action.setBadgeText({ text: "DONE" });
            await chrome.action.setBadgeBackgroundColor({ color: "#98fb98" });
            // await chrome.tabs.remove(jobTabId);
            await chrome.notifications.create(`success-${Date.now()}`, {
              message:
                "Successfully added Connect Configuration. You can close this tab now.",
              type: "basic",
              iconUrl: "../../assets/icon-64.png",
              title: "Success - agreefast for Docusign",
            });
            await sleep(6000);
            await chrome.action.setBadgeText({ text: "" });
            await chrome.action.setBadgeBackgroundColor({ color: "#90d5ff" });
          }
        );
        break;
    }
  } catch (error) {
    console.error(error);
    await chrome.storage.local.set({
      connect_job_active: false,
    });
    await chrome.action.setBadgeText({ text: "ERR" });
    await chrome.action.setBadgeBackgroundColor({ color: "#d9544d" });
    await sleep(5000);
    await chrome.action.setBadgeText({ text: "" });
    await chrome.action.setBadgeBackgroundColor({ color: "#90d5ff" });
  }
});
