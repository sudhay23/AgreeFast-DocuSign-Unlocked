var WHITE_ICON =
  "https://agreefasttrello.knowyours.co/codebase/trello-powerup-html/light.png";
var BLACK_ICON =
  "https://agreefasttrello.knowyours.co/codebase/trello-powerup-html/dark.png";

var onBtnClick = async function (t, opts) {
  const res = await t.board("id");
  const boardId = res.id;
  return t.popup({
    title: "Add key events",
    url: "./popup.html",
    args: {
      boardId: boardId,
    },
  });
};

window.TrelloPowerUp.initialize(
  {
    "board-buttons": function (t, opts) {
      return [
        {
          icon: {
            dark: WHITE_ICON,
            light: BLACK_ICON,
          },
          text: "agreefast for Docusign",
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
