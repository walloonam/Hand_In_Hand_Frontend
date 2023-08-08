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
