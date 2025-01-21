const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

window.addEventListener("load", (e) => {
  chrome.storage.local.get(
    ["connect_job_active"],
    async ({ connect_job_active }) => {
      if (connect_job_active) {
        const jobInterval = setInterval(async () => {
          configure_connect_admin_page();
          clearInterval(jobInterval);
        }, 2000);
      }
    }
  );
});

const configure_connect_admin_page = async () => {
  const currUrl = location.href;
  if (currUrl.match(/^https\:\/\/apps\-d\.docusign\.com\/admin\/connect/g)) {
    step_1_add_connect_config();
  } else if (
    currUrl.match(
      /^https\:\/\/apps\-d\.docusign\.com\/admin\/connect\/add\-custom/g
    )
  ) {
    step_2_fill_connect_config_form_and_submit();
  }
};

const step_1_add_connect_config = async () => {
  chrome.storage.local.get(
    ["connect_job_active"],
    async ({ connect_job_active }) => {
      const checkPageLoadComplete = setInterval(async () => {
        if (connect_job_active) {
          const addConfigExpanderXpath =
            "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div/div[2]/div/button";
          const addConfigExpanderBtn = document.evaluate(
            addConfigExpanderXpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          if (addConfigExpanderBtn) {
            addConfigExpanderBtn.click();

            await sleep(2000);

            const addCustomConfigXpath =
              "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div/div[2]/div/div[1]/div/div[2]/div[1]/div[1]/button";
            const addCustomConfigBtn = document.evaluate(
              addCustomConfigXpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;

            if (addCustomConfigBtn) {
              clearInterval(checkPageLoadComplete);
              addCustomConfigBtn.click();

              // Start Step 2
              step_2_fill_connect_config_form_and_submit();
            }
          }
        }
      }, 1000);
    }
  );
};

const step_2_fill_connect_config_form_and_submit = async () => {
  chrome.storage.local.get(
    ["connect_job_active"],
    async ({ connect_job_active }) => {
      if (connect_job_active) {
        // Step 2.1 - Fill Connect Name
        await fill_input(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[1]/div/div[3]/div[2]/div/input",
          "Agreefast_Docusign_Connection"
        );

        // Step 2.2 - Fill Webhook URL
        // Add deployed Webhook URL
        await fill_input(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[1]/div/div[4]/div[2]/div/input",
          "https://agreefastapi.knowyours.co/webhook"
        );

        // Step 2.3 - Expand 'Envelope and Recipients' container
        await click_element(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[3]/div[2]/div/div[1]/div/div/div/div"
        );

        // Step 2.4 - Check 'Envelope Sent' Checkbox
        await click_element(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[3]/div[2]/div/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/fieldset/div[1]/div/label"
        );

        // Step 2.5 - Check 'Envelope Signed/Completed' Checkbox
        await click_element(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[3]/div[2]/div/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/fieldset/div[3]/div/label"
        );

        // Step 2.6 - Expand "Include Data" container
        await click_element(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[3]/div[2]/div/div[1]/div/div/div[2]/div/div/div[2]/div/div/div/div"
        );

        // Step 2.7 - Choose "Documents" checkbox
        await click_element(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[3]/div[2]/div/div[1]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div[1]/div/div/div[1]/div/fieldset/div[2]/div/label"
        );

        // Step 2.8 - Choose "Recipients" checkbox
        await click_element(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[3]/div[2]/div/div[1]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div[1]/div/div/div[1]/div/fieldset/div[9]/div[1]/label"
        );

        // Step 2.9 - Click "Add Configuration" button
        await click_element(
          "/html/body/div[1]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[1]/div/div/button"
        );

        // Step 2.10 - Issue the "end_connect_job" message
        await chrome.runtime.sendMessage({
          message: "end_connect_job",
        });
      }
    }
  );
};

// UTILS FUNCTION

const click_element = async (xpath) => {
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
        element.click();
        resolve();
      }
    });
  }, 1000);
};

const fill_input = async (xpath, value) => {
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
        await sleep(1000);
        element.focus();
        await sleep(1000);
        // Change the value of the input field programmatically
        element.value = value;

        // Create a new 'input' event to trigger the event handler in the root div
        const inputEvent = new Event("input", {
          bubbles: true,
          cancelable: true,
        });

        // Dispatch the input event to notify the parent/root div of the change
        element.dispatchEvent(inputEvent);
        if (element.value == value) {
          clearInterval(checkInterval);
          resolve();
        }
      }
    });
  }, 1000);
};
