var WHITE_ICON =
  "https://5c72-49-206-116-118.ngrok-free.app/codebase/trello-powerup-html/icon.png";
var BLACK_ICON =
  "https://5c72-49-206-116-118.ngrok-free.app/codebase/trello-powerup-html/icon.png";

var onBtnClick = function (t, opts) {
  t.popup({
    title: "Add key events",
    url: "./popup.html",
  });
};

function showIframe(t) {
  return t.popup({
    title: "Authorize to continue",
    url: "./authorize.html",
  });
}

window.TrelloPowerUp.initialize(
  {
    "board-buttons": function (t, opts) {
      return [
        {
          icon: {
            dark: WHITE_ICON,
            light: BLACK_ICON,
          },
          text: "Callback",
          callback: onBtnClick,
          condition: "edit",
        },
      ];
    },
  },
  {
    appKey: "392bf5fb0f36566b3a6b4650be628e92",
    appName: "agreefast for Docusign",
    appAuthor: "agreefast",
  }
);
