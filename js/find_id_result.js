// 페이지 로드 시 세션 스토리지에서 이메일 데이터 가져와서 출력
document.addEventListener("DOMContentLoaded", function () {
  var foundEmail = sessionStorage.getItem("foundEmail");
  if (foundEmail) {
    $(".email_box").text(foundEmail);
    sessionStorage.removeItem("foundEmail");
  }
});
