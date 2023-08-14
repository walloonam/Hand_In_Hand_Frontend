document.addEventListener("DOMContentLoaded", function () {
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

google.accounts.id.renderButton(document.getElementById("signinDiv"), {
  theme: "outline",
  size: "large",
  click_listener: onClickHandler,
});

function onClickHandler() {
  console.log("Sign in with Google button clicked...");
}
