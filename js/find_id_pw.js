const findIDContent = document.querySelector(".wrap_findID_content");
const findPWContent = document.querySelector(".wrap_findPW_content");
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

/* 아이디 찾기 오류메세지 */
document
  .querySelector("#findID_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // 실제 로그인 검증 로직으로 교체하십시오.

    var name_input = document.querySelector("#findID_name_input").value;
    var birth_input = document.querySelector("#findID_birth_input").value;

    if (name_input === "장지연" && birth_input === "20030207") {
      window.location.href = "./find_id_result.html";
      console.log("아이디 찾기 성공");
    } else {
      var errorMessage = document.querySelector("#findID_error");
      errorMessage.style.visibility = "visible";
      console.log("아이디 찾기 실패");
    }
  });

/* 비밀번호 찾기 오류메세지 */
document
  .querySelector("#findPW_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // 실제 로그인 검증 로직으로 교체하십시오.

    var id_input = document.querySelector("#findPW_id_input").value;
    var certifiednum_input = document.querySelector(
      "#findPW_certifiednum_input"
    ).value;

    if (id_input === "id" && certifiednum_input === "1234") {
      window.location.href = "./pw_reset.html";
      console.log("비밀번호 찾기 성공");
    } else {
      var errorMessage = document.querySelector("#findPW_error");
      errorMessage.style.visibility = "visible";
      console.log("비밀번호 찾기 실패");
    }
  });
