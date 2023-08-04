document
  .querySelector("#email_login_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // 실제 로그인 검증 로직으로 교체하십시오.

    var id_input = document.querySelector("#id_input").value;
    var pw_input = document.querySelector("#pw_input").value;

    if (id_input === "id" && pw_input === "pw") {
      window.location.href = "./home_login.html";
      console.log("로그인 성공");
    } else {
      var errorMessage = document.querySelector("#login_error");
      errorMessage.style.visibility = "visible";
      console.log("로그인 실패");
    }
  });

// 구글아이디로 로그인
function init() {
  gapi.load("auth2", function () {
    gapi.auth2.init();
    options = new gapi.auth2.SigninOptionsBuilder();
    options.setPrompt("select_account");
    // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
    options.setScope(
      "email profile openid https://www.googleapis.com/auth/user.birthday.read"
    );
    // 인스턴스의 함수 호출 - element에 로그인 기능 추가
    // email_login_button은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
    gapi.auth2
      .getAuthInstance()
      .attachClickHandler(
        "email_login_button",
        options,
        onSignIn,
        onSignInFailure
      );
  });
}

function onSignIn(googleUser) {
  var access_token = googleUser.getAuthResponse().access_token;
  $.ajax({
    // people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
    url: "https://people.googleapis.com/v1/people/me",
    // key에 자신의 API 키를 넣습니다.
    data: {
      personFields: "birthdays",
      key: "api키넣기",
      access_token: access_token,
    },
    method: "GET",
  })
    .done(function (e) {
      //프로필을 가져온다.
      var profile = googleUser.getBasicProfile();
      console.log(profile);
    })
    .fail(function (e) {
      console.log(e);
    });
}
function onSignInFailure(t) {
  console.log(t);
}

document
  .querySelector("#google_login_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    init(); // 구글 로그인 기능 실행
  });
