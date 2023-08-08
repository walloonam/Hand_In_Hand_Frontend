document.addEventListener("DOMContentLoaded", function () {
  const requestButton = document.querySelector("#request_button");
  requestButton.addEventListener("click", function (event) {
    event.preventDefault(); // 폼 제출 기본 동작을 막습니다.

    const titleInput = document.querySelector("#titleInput");
    const contentInput = document.querySelector("#contentInput");
    const pointInput = document.querySelector("#pointInput");

    const titleValue = titleInput.value.trim();
    const contentValue = contentInput.value.trim();
    const pointValue = pointInput.value.trim();

    if (titleValue !== "" && contentValue !== "" && pointValue !== "") {
      console.log("도움 요청 성공");
      window.location.href = "./request_list.html";
    } else {
      console.log("도움 요청 실패");
    }
  });
});
