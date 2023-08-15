$(document).ready(function () {
  // 아이디 중복 확인 버튼 클릭 시
  $("#email_check_button").click(function () {
    var emailInputValue = $("#email_input").val();
    checkEmailAvailability(emailInputValue);
  });
});

// 닉네임 중복 확인 버튼 클릭 시
$("#nickname_check_button").click(function () {
  var nicknameInputValue = $("#nickname_input").val();
  checkNicknameAvailability(nicknameInputValue);
});

function checkEmailAvailability(email) {
  $.ajax({
    type: "POST",
    url: "http://43.202.43.176:8080/api/user/check_email",
    contentType: "application/json",

    data: JSON.stringify({
      email: email,
    }),
    success: function (data) {
      if (data.message === "success") {
        // 중복 없을 경우
        $("#email_check_message").css("display", "block");
        $("#email_duplicate_message").css("display", "none");
        $("#certifiednum_input").prop("disabled", false);
        $("#certify_button").prop("disabled", false);
      } else if (data.message === "fail") {
        // 중복 있을 경우
        $("#email_check_message").css("display", "none");
        $("#email_duplicate_message").css("display", "block");
        $("#certifiednum_input").prop("disabled", true);
        $("#certify_button").prop("disabled", true);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 400) {
        console.error("Bad Request:", jqXHR.responseText);
        alert("올바르지 않은 형식의 입력입니다.");
      } else if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("권한이 없는 사용자입니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
        alert("서버 에러");
      }
    },
  });
}

function checkNicknameAvailability(nickname) {
  $.ajax({
    type: "POST",
    url: "/user/check_nickname", // 실제 서버 경로로 수정해야 함
    contentType: "application/json",
    data: JSON.stringify({
      nickname: nickname,
    }),
    success: function (data) {
      var nicknameMessage = document.querySelector("#nickname_message");
      if (data.message === "success") {
        // 중복 없을 경우
        nicknameMessage.style.display = "none";
      } else if (data.message === "fail") {
        // 중복 있을 경우
        nicknameMessage.style.display = "block";
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 400) {
        console.error("Bad Request:", jqXHR.responseText);
        alert("올바르지 않은 형식의 입력입니다.");
      } else if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("권한이 없는 사용자입니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
        alert("서버 에러");
      }
    },
  });
}

// 비밀번호
function checkPasswordMatch() {
  var password = document.querySelector("#password_input").value;
  var pwCheck = document.querySelector("#pw_check_input").value;
  var pwMessage = document.querySelector("#pw_message");

  if (password === pwCheck) {
    pwMessage.style.display = "none"; // 일치하면 메시지를 숨김
  } else {
    pwMessage.style.display = "block"; // 불일치하면 메시지를 보이게 함
  }
}

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

      var fullAddress = roadAddr + extraRoadAddr;
      document.querySelector("#address_input").value = fullAddress;

      var matches = fullAddress.match(/(\S+동)/);
      var area = matches ? matches[1] : "";

      signup(area);
    },
  }).open();
}

function signup() {
  var email = $("#email_input").val();
  var password = $("#password_input").val();
  var name = $("#name_input").val();
  var nickname = $("#nickname_input").val();
  var dateOfBirth = parseInt($("#birth_input").val());
  var address = $("#address_input").val();

  $.ajax({
    type: "POST",
    url: "/user",
    contentType: "application/json",

    data: JSON.stringify({
      email: email,
      password: password,
      name: name,
      nickname: nickname,
      date_of_birth: dateOfBirth,
      address: address,
      area: area,
    }),
    success: function (response) {
      if (response.status === 201) {
        alert("회원가입에 성공했습니다.");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 400) {
        console.error("Bad Request:", jqXHR.responseText);
        alert("올바르지 않은 형식의 입력입니다.");
      } else if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("이메일 인증코드가 올바르지 않습니다.");
      } else if (jqXHR.status === 409) {
        console.error("Conflict:", jqXHR.responseText);
        alert("중복된 리소스가 존재합니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
        alert("서버 에러");
      }
    },
  });
}
