const findIDContent = document.querySelector(".wrap_findID_content");
const findPWContent = document.querySelector(".wrap_pw_reset_content");
const findIDRadio = document.getElementById("find_id");
const findPWRadio = document.getElementById("find_pw");

// 라디오 버튼에 이벤트 리스너를 추가하여 내용을 토글합니다.
findIDRadio.addEventListener("click", () => {
  findIDContent.style.display = "block";
  findPWContent.style.display = "none";
});

findPWRadio.addEventListener("click", () => {
  findIDContent.style.display = "none";
  findPWContent.style.display = "block";
});

/* 비밀번호 재설정 오류메세지 */
document
  .querySelector("#pw_reset_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // 실제 로그인 검증 로직으로 교체하십시오.

    var pw_input = document.querySelector("#pw_reset_input").value;
    var pwcheck_input = document.querySelector("#pw_reset_pwcheck_input").value;

    if (pw_input == pwcheck_input) {
      window.location.href = "./login.html";
      console.log("비밀번호 재설정 성공");
    } else {
      var errorMessage = document.querySelector("#pw_reset_error");
      errorMessage.style.visibility = "visible";
      console.log("비밀번호 재설정 실패");
    }
  });

// 비밀번호 재설정 버튼
$(document).ready(function () {
  $("#pw_reset_button").click(function () {
    pw_reset();
  });
});

function pw_reset() {
  var email = sessionStorage.getItem("find_id");
  var new_password = $("#pw_reset_pwcheck_input").val();

  $.ajax({
    type: "POST",
    url: "http://54.180.109.140/api/user/password_reset/",
    contentType: "application/json",

    data: JSON.stringify({
      email: email,
      new_password: new_password,
    }),
    success: function (response) {
      if (response.result === "success") {
        // alert("비밀번호 재설정에 성공했습니다.");
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
