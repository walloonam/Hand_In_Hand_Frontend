const findIDContent = document.querySelector(".wrap_findID_content");
const findPWContent = document.querySelector(".wrap_findPW_content");
const findIDRadio = document.querySelector("#find_id");
const findPWRadio = document.querySelector("#find_pw");

// 라디오 버튼에 이벤트 리스너를 추가하여 내용을 토글합니다.
findIDRadio.addEventListener("click", () => {
  findIDContent.style.display = "block";
  findPWContent.style.display = "none";
});

findPWRadio.addEventListener("click", () => {
  findIDContent.style.display = "none";
  findPWContent.style.display = "block";
});

// 아이디 찾기
document
  .querySelector("#findID_button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    //   // 실제 로그인 검증 로직으로 교체하십시오.
    //   // 예시: 현재는 항상 true로 가정하겠습니다.
    //   var isAuthenticated = true; // 로그인 검증 결과

    var name_input = document.querySelector("#findID_name_input").value;
    var birth_input = document.querySelector("#findID_birth_input").value;

    //   if (isAuthenticated) {
    //     find_email(name_input, birth_input);
    //   } else {
    //     var errorMessage = document.querySelector("#findID_error");
    //     errorMessage.style.visibility = "visible";
    //   }

    $.ajax({
      type: "POST",
      url: "http://3.36.130.108:8080/api/user/find_email/",
      contentType: "application/json",
      data: JSON.stringify({
        name: name_input,
        birth: birth_input,
      }),
      success: function (response) {
        console.log(response);
        // 세션 스토리지에 이메일 데이터 저장
        sessionStorage.setItem("foundEmail", response.email);

        alert("아이디 찾기 성공");
        window.location.href = "./find_id_result.html";
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
  });

// 비밀번호 찾기
function emailvalidation() {
  var email = $("#findPW_id_input").val();

  $.ajax({
    type: "POST",
    url: "/user/emailvalidation/",
    contentType: "application/json",

    data: JSON.stringify({
      email: email,
    }),
    success: function (response) {
      if (response.status === 200) {
        alert("이메일 인증이 성공적으로 완료되었습니다.");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 400) {
        console.error("Bad Request:", jqXHR.responseText);
        alert("올바르지 않은 형식의 입력입니다.");
      } else if (jqXHR.status === 409) {
        console.error("Too Many Requests:", jqXHR.responseText);
        alert("짧은 시간동안 너무 많은 인증 요청이 보내졌습니다.");
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

document
  .querySelector("#findPW_button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var id_input = document.querySelector("#findPW_id_input").value;
    var certifiednum_input = document.querySelector(
      "#findPW_certifiednum_input"
    ).value;

    if (certifiednum_input === "인증번호") {
      // 인증번호가 일치하는 경우 서버로 요청을 보냅니다.
      find_pw(id_input, certifiednum_input);
    } else {
      var errorMessage = document.querySelector("#findPW_error");
      errorMessage.style.visibility = "visible";
      console.log("비밀번호 찾기 실패");
    }
  });

function find_pw() {
  $.ajax({
    type: "POST",
    url: "/user/find_password/",
    contentType: "application/json",

    data: JSON.stringify({
      // token:,
      // validcode:,
    }),
    success: function (response) {
      if (response.status === 200) {
        window.location.href = "./pw_reset.html";
        console.log("비밀번호 찾기 성공");
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
