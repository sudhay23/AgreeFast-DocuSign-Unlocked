chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  try {
    switch (request.message) {
      case "launch_agreefast_dashboard":
        launchAgreefastDashboard();
        break;
    }
  } catch (error) {
    console.error(error);
    await chrome.action.setBadgeText({ text: "ERR" });
    await chrome.action.setBadgeBackgroundColor({ color: "#d9544d" });
    await sleep(5000);
    await chrome.action.setBadgeText({ text: "" });
    await chrome.action.setBadgeBackgroundColor({ color: "#90d5ff" });
  }
});

// UTILS FUNCTION
const launchAgreefastDashboard = async () => {
  if (
    window.location.href.match(
      /^https:\/\/apps-d\.docusign\.com\/sign\/app.*/gi
    )
  ) {
    // Click the "kebab" icon on the top right corner to see agreement signing session info. (util function loaded from 'configure_connect_admin_page.js')
    await click_element(
      "/html/body/div[1]/div/div/div/div[1]/div[1]/div[3]/div/header/div[2]/div/button"
    );

    // Click on "Session Information" button (util function loaded from 'configure_connect_admin_page.js')
    await click_element(
      "/html/body/div[1]/div/div/div/div[1]/div[1]/div[3]/div/header/div[2]/div/div[2]/div/div[2]/div[1]/div[5]/button"
    );

    // Extract the 'envelope_id' from the agreement signing session info
    const envelope_id = await extract_inner_text(
      "/html/body/div[2]/div[2]/div[2]/div/div/div[3]/div/table/tbody/tr[1]/td"
    );

    // Close the "Session Information" popup (util function loaded from 'configure_connect_admin_page.js')
    await click_element(
      "/html/body/div[2]/div[2]/div[2]/div/div/div[1]/div/button"
    );

    // Open the Agreefast dashboard with the extracted 'envelope_id'
    window.open(`https://agreefast.knowyours.co/room/${envelope_id}`, "_blank");
  } else {
    alert(
      "Please navigate to the Docusign agreement signing page to launch the Agreefast dashboard. \n\nThis is not a valid page to launch the Agreefast dashboard."
    );
  }
};

const extract_inner_text = async (xpath) => {
  return new Promise(async (resolve, reject) => {
    const checkInterval = setInterval(async () => {
      const element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (element) {
        clearInterval(checkInterval);
        resolve(element.textContent);
      }
    });
  }, 1000);
};
