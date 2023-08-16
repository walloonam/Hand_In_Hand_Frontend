document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#email_login_button")
    .addEventListener("click", function (event) {
      event.preventDefault();

      var email = document.querySelector("#id_input").value;
      var password = document.querySelector("#pw_input").value;

      $.ajax({
        type: "POST",
        url: "http://3.36.130.108:8080/api/user/login/",
        contentType: "application/json",

        data: JSON.stringify({
          email: email,
          password: password,
        }),
        success: function (response) {
          console.log(response);

          sessionStorage.setItem("jwtToken", response.token);
          sessionStorage.setItem("user_id", response.id);
          alert("로그인이 성공적으로 완료되었습니다.");
          window.location.href = "./home_login.html";
        },
        error: function (jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 400) {
            console.error("Bad Request:", jqXHR.responseText);
            alert("올바르지 않은 형식의 입력입니다.");
          } else if (jqXHR.status === 401) {
            console.error("Unauthorized:", jqXHR.responseText);
            alert("로그인에 실패했습니다.");
          } else if (jqXHR.status === 500) {
            console.error("Too Many Requests:", jqXHR.responseText);
            alert("일정 시간동안 잘못된 로그인을 너무 많이 요청했습니다.");
          } else {
            console.error("Error:", jqXHR.status, errorThrown);
            alert("서버 에러");
          }

          var errorMessage = document.querySelector("#login_error");
          errorMessage.style.visibility = "visible";
        },
      });
    });
});

// 구글 로그인
// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log("Name: " + profile.getName());
//   console.log("Image URL: " + profile.getImageUrl());
//   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

//   var id_token = googleUser.getAuthResponse().id_token;
//   console.log("ID Token: " + id_token);
// }

// function handleCredentialResponse(response) {
//   console.log("Encoded JWT ID token: " + response.credential);
// }
// window.onload = function () {
//   google.accounts.id.initialize({
//     client_id:
//       "604551010190-le65f4l8v56l9emnmfb3cntcqnnctc5a.apps.googleusercontent.com",
//     callback: handleCredentialResponse,
//   });
//   google.accounts.id.renderButton(
//     document.getElementById("buttonDiv"),
//     { theme: "outline", size: "large" } // customization attributes
//   );
//   google.accounts.id.prompt(); // also display the One Tap dialog
// };

// google.accounts.id.renderButton(document.getElementById("signinDiv"), {
//   theme: "outline",
//   size: "large",
//   click_listener: onClickHandler,
// });

// function onClickHandler() {
//   console.log("Sign in with Google button clicked...");
// }
