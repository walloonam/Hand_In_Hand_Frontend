var area1 = "";

// 아이디 중복 확인
$(document).ready(function () {
  let isEmailVerified = false; // 이메일 인증 상태 초기에는 false

  $("#email_check_button").on("click", function () {
    if (isEmailVerified) {
      // 이메일 인증이 완료된 경우
      // $("#certified_check_message").css("display", "block");
      $("#email_check_message").css("display", "none");
      // $("#email_check_button").text("인증하기");
    } else {
      // 이메일 중복 확인
      var emailInputValue = $("#email_input").val();
      checkEmailAvailability(emailInputValue);
    }
  });

  function checkEmailAvailability(email) {
    $.ajax({
      type: "POST",
      url: "http://54.180.109.140/api/user/check_email/",
      contentType: "application/json",
      data: JSON.stringify({
        email: email,
      }),
      success: function (response) {
        console.log(response.message);
        if (response.message === "success") {
          $("#email_check_message").css("display", "block");
          $("#email_duplicate_message").css("display", "none");
          // $("#certified_check_message").css("display", "none");
          // $("#email_check_button").text("인증하기");
          // isEmailVerified = true;
        } else if (response.message === "fail") {
          $("#email_check_message").css("display", "none");
          $("#email_duplicate_message").css("display", "block");
          $("#certified_check_message").css("display", "none");
          // $("#email_check_button").text("중복확인");
          isEmailVerified = false;
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
});

// 이메일 인증

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

// 닉네임 중복 확인
$("#nickname_check_button").click(function () {
  var nicknameInputValue = $("#nickname_input").val();
  checkNicknameAvailability(nicknameInputValue);
});

function checkNicknameAvailability(nickname) {
  $.ajax({
    type: "POST",
    url: "http://54.180.109.140/api/user/check_nickname/",
    contentType: "application/json",
    data: JSON.stringify({
      nickname: nickname,
    }),
    success: function (response) {
      if (response.message === "success") {
        console.log(response);
        // 중복 없을 경우
        $("#nickname_message").css("display", "block");
        $("#nickname_error_message").css("display", "none");
      } else if (response.message === "fail") {
        // 중복 있을 경우
        $("#nickname_message").css("display", "none");
        $("#nickname_error_message").css("display", "block");
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

      // signup(area);
      console.log(data.sigungu);
      area1 = data.sigungu;
    },
  }).open();
}

// 회원가입 버튼
$(document).ready(function () {
  $("#signup_button").click(function () {
    signup();
  });

  function signup() {
    var email = $("#email_input").val();
    var password = $("#password_input").val();
    var name = $("#name_input").val();
    var nickname = $("#nickname_input").val();
    var dateOfBirth = $("#birth_input").val();
    var address = $("#address_input").val();
    var area = area1;
    console.log(area);

    emailvalidation(email);

    $.ajax({
      type: "POST",
      url: "http://54.180.109.140/api/user/",
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
        window.location.href = "./mail_check.html";
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

  function emailvalidation(email) {
    $.ajax({
      type: "POST",
      url: "http://54.180.109.140/api/user/emailvalidation/",
      contentType: "application/json",
      data: JSON.stringify({
        email: email,
      }),
      success: function (response) {
        console.log("이메일 인증 보냄");
        // $("#certified_check_message").css("display", "block");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 400) {
          console.error("Bad Request:", jqXHR.responseText);
          alert("올바르지 않은 형식의 입력입니다.");
        } else if (jqXHR.status === 409) {
          console.error("Too Many Requests:", jqXHR.responseText);
          alert("짧은 시간동안 너무 많은 인증 요청을 보냈습니다.");
        } else if (jqXHR.status === 500) {
          console.error("Internal Server Error:", jqXHR.responseText);
          alert("서버측에서 오류가 발생했습니다.");
        } else {
          console.error("Error:", jqXHR.status, errorThrown);
          alert("서버 에러");
        }
      },
    });
  }
});
