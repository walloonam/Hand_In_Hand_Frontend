// 이메일 중복확인
function showEmailCheckMessage() {
  var emailInput = document.querySelector("#email_input");
  var checkMessage = document.querySelector(".check_message");

  if (emailInput.value === "") {
    checkMessage.style.display = "none";
  } else {
    checkMessage.style.display = "block";
  }
}
var emailCheckButton = document.querySelector("#email_check_button");
emailCheckButton.addEventListener("click", showEmailCheckMessage);

// 인증번호
function showCertifyMessage() {
  var certifiedNumInput = document.querySelector("#certifiednum_input");
  var certifyMessage = document.querySelector(".certify_message");

  if (certifiedNumInput.value === "") {
    certifyMessage.style.display = "none";
  } else {
    certifyMessage.style.display = "block";
  }
}
var certifyButton = document.querySelector("#certify_button");
certifyButton.addEventListener("click", showCertifyMessage);

// 주소입력
function openAddressPopup() {
  new daum.Postcode({
    oncomplete: function (data) {
      var roadAddr = data.roadAddress; // Full road address
      var extraRoadAddr = ""; // Additional address information

      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }

      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }

      if (extraRoadAddr !== "") {
        extraRoadAddr = "(" + extraRoadAddr + ")";
      }

      document.querySelector("#address_input").value = roadAddr + extraRoadAddr;
    },
  }).open();
}
