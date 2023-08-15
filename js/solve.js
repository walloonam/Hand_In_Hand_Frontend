//신고하기
function reportCheck() {
  if (confirm("신고하시겠습니까?") == true) {
    document.reportfrm.submit();
  } else {
    return false;
  }
}

//지역이름
$(document).ready(function () {
  $(".region_choose").on("click", function () {
    openAddressPopup();
  });

  function openAddressPopup() {
    new daum.Postcode({
      oncomplete: function (data) {
        var roadAddr = data.roadAddress; // 전체 도로명 주소
        var extraRoadAddr = ""; // 추가 주소 정보

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr = data.bname;
        }

        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }

        var regionChoose = document.querySelector(".region_choose");
        regionChoose.textContent = extraRoadAddr;
      },
    }).open();
  }
});

// ajax
const jwtToken = sessionStorage.getItem("jwtToken");
$.ajax({
  type: "POST",
  url: "http://43.202.43.176:8080/api/user/info/",
  contentType: "application/json",
  data: JSON.stringify({
    token: jwtToken,
  }),
  success: function (response) {
    console.log(response);

    const userInfo = response; // 전체 응답 객체
    const userFields = userInfo.fields; // 사용자 정보 객체

    // 지역 이름을 가져와서 지역 요소에 적용
    const areaName = userFields.area;
    const regionChoose = document.querySelector(".region_choose");
    regionChoose.innerHTML = areaName;

    // 사용자 정보를 화면에 출력하는 로직
    console.log("이미지:", userFields.image);
    console.log("이름:", userFields.name);
    console.log("이메일:", userFields.email);
    console.log("닉네임:", userFields.nickname);
    console.log("생년월일:", userFields.date_of_birth);
    console.log("주소:", userFields.address);
    console.log("포인트:", userFields.point);
    console.log("입양 횟수:", userFields.adopt_count);
    console.log("지역:", userFields.area);
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

$.ajax({
  url: "/post/declare_post/<int:pk>/",
  method: "POST",
  dataType: "json",
  success: function (response) {
    if (response.status === 200) {
      alert("신고 횟수 +1 성공.");
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

document.addEventListener("DOMContentLoaded", function () {
  const reportButton = document.querySelector(".detail_right a");
  const postAuthorId = "user456"; // 가정: 게시물 작성자의 ID를 가져옴
  const currentUser = "user123"; // 가정: 현재 로그인한 사용자의 ID를 가져옴

  if (currentUser === postAuthorId) {
    reportButton.textContent = "삭제하기";
    reportButton.addEventListener("click", function () {
      if (deleteCheck()) {
        // 삭제하기
        $.ajax({
          url: "/post/delete_post/<int:pk>/",
          method: "POST",
          dataType: "json",
          success: function (response) {
            if (response.status === 200) {
              alert("게시물이 성공적으로 삭제되었습니다.");
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
  } else {
    reportButton.textContent = "신고하기";
    reportButton.addEventListener("click", function () {
      if (reportCheck()) {
        // 신고하기
        $.ajax({
          url: "/post/delete/<int:pk>/",
          method: "POST",
          dataType: "json",
          success: function (response) {
            if (response.status === 200) {
              alert("신고 횟수 +1 성공.");
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
  }
});

function deleteCheck() {
  return confirm("삭제하시겠습니까?");
}

function reportCheck() {
  return confirm("신고하시겠습니까?");
}
