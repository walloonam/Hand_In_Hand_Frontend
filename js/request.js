//지역이름
var dropdownVisible = false;

document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.getElementById("dropdown");
  dropdown.style.display = "none"; // 처음에 드롭다운을 숨김
});

function toggleDropdown() {
  var dropdown = document.getElementById("dropdown");
  dropdownVisible = !dropdownVisible;
  if (dropdownVisible) {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}
function selectRegion(region) {
  var regionChoose = document.querySelector(".region_choose");
  regionChoose.textContent = region;
  toggleDropdown();
}
// $(document).ready(function () {
//   $(".region_choose").on("click", function () {
//     openAddressPopup();
//   });

//   function openAddressPopup() {
//     new daum.Postcode({
//       oncomplete: function (data) {
//         var roadAddr = data.roadAddress; // 전체 도로명 주소
//         var extraRoadAddr = ""; // 추가 주소 정보
//         console.log(data.sigungu);
//         if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
//           extraRoadAddr = data.bname;
//         }

//         if (data.buildingName !== "" && data.apartment === "Y") {
//           extraRoadAddr +=
//             extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
//         }

//         var regionChoose = document.querySelector(".region_choose");
//         regionChoose.textContent = data.sigungu;
//       },
//     }).open();
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const requestButton = document.querySelector("#request_button");
  requestButton.addEventListener("click", function (event) {
    event.preventDefault(); // 폼 제출 기본 동작을 막습니다.

    const titleInput = document.querySelector("#titleInput");
    const contentInput = document.querySelector("#contentInput");
    const pointInput = document.querySelector("#pointInput");

    const titleValue = titleInput.value.trim();
    const contentValue = contentInput.value.trim();
    const pointValue = pointInput.value.trim();

    if (titleValue !== "" && contentValue !== "" && pointValue !== "") {
      console.log("도움 요청 성공");
      window.location.href = "./request_list.html";
    } else {
      console.log("도움 요청 실패");
    }
  });
});

// ajax
const jwtToken = sessionStorage.getItem("jwtToken");
$.ajax({
  type: "POST",
  url: "http://3.36.130.108:8080/api/user/info/",
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

$(document).ready(function () {
  $("#request_button").click(function () {
    request();
  });
});

function request() {
  var title = $("#titleInput").val();
  var content = $("#contentInput").val();
  var point = parseInt($("#pointInput").val());
  var area = $(".region_choose").text();

  const jwtToken = sessionStorage.getItem("jwtToken");

  $.ajax({
    type: "POST",
    url: "http://3.36.130.108:8080/api/post/create/",
    contentType: "application/json",
    data: JSON.stringify({
      title: title,
      content: content,
      point: point,
      area: area,
      token: jwtToken,
    }),
    success: function (response) {
      // alert("작성 성공");
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

// 로그아웃
$(document).ready(function () {
  $(".logout").click(function (event) {
    event.preventDefault(); // 기본 동작을 중단합니다.
    const jwtToken = sessionStorage.getItem("jwtToken");

    $.ajax({
      type: "POST",
      url: "http://3.36.130.108:8080/api/user/logout/",
      data: JSON.stringify({
        token: jwtToken,
      }),
      success: function (response) {
        localStorage.removeItem("token");
        // alert("로그아웃 되었습니다.");
        window.location.href = "./home_logout.html";
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
});

// 회원정보 수정
