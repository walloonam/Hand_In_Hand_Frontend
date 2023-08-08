//지역이름
$(document).ready(function () {
  $(".region_choose").on("click", function () {
    openAddressPopup();
  });

  function openAddressPopup() {
    new daum.Postcode({
      oncomplete: function (data) {
        var roadAddr = data.roadAddress; // 전체 도로명 주소
        var extraRoadAddr = ""; // 추가 주소 정보

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr = data.bname;
        }

        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }

        var regionChoose = document.querySelector(".region_choose");
        regionChoose.textContent = extraRoadAddr;
      },
    }).open();
  }
});

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
