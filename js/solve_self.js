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

// 기본 데이터 불러오기
function reportCheck() {
  const jwtToken = sessionStorage.getItem("jwtToken");
  $.ajax({
    type: "POST",
    url: "http://54.180.109.140:8080/api/user/info/",
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
}

// 게시물 데이터 불러오기
$(document).ready(function () {
  // 세션 스토리지에서 데이터 불러오기
  const requestId = sessionStorage.getItem("requestId");

  // 데이터가 존재하면 두 번째 요청을 보냅니다.
  if (requestId) {
    $.ajax({
      type: "GET",
      url: "http://54.180.109.140:8080/api/post/" + requestId + "/",
      contentType: "application/json",
      dataType: "json",
      success: function (secondResponse) {
        console.log(secondResponse);
        // alert("두 번째 요청이 정상적으로 처리되었습니다.");

        // 세션 스토리지에서 데이터 불러오기
        const requestTitle = secondResponse.title;
        const requestPoint = secondResponse.point;
        const requestChat = secondResponse.numChat;
        const requestContent = secondResponse.content;
        const created_at = secondResponse.created_at;
        const area = secondResponse.area;

        const formattedCreatedAt = formatDateTime(created_at);

        // 불러온 데이터를 화면에 표시
        document.querySelector(".title_container").value = requestTitle;
        document.querySelector(".pointnum").value = requestPoint + "P";
        document.querySelector(".chatnum").innerHTML = requestChat + "명";
        document.querySelector(".content_container").value = requestContent;
        document.querySelector(".created_at").innerHTML = formattedCreatedAt;
        document.querySelector(".region_choose").innerHTML = area;
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
  $("#reportLink").click(reportCheck);
});

// 날짜 및 시간 포맷 변경 함수
function formatDateTime(dateTimeStr) {
  const dateTime = new Date(dateTimeStr);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 삭제하기
function deleteCheck() {
  if (confirm("삭제하시겠습니까?")) {
    const requestId = sessionStorage.getItem("requestId");
    $.ajax({
      url: "http://54.180.109.140:8080/api/post/delete/" + requestId + "/",
      method: "DELETE",
      dataType: "json",
      success: function (response) {
        // alert("게시물이 성공적으로 삭제되었습니다.");
        window.location.href = "./request_list.html";
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
  } else {
    return false;
  }
}

// 수정하기
$(document).ready(function () {
  $("#modify_button").on("click", function () {
    modifyPost();
  });
});

function modifyPost() {
  var title = $(".title_container").val();
  console.log(title);
  var content = $(".content_container").val();
  var pointText = $(".pointnum").val();
  var extractedNumbers = pointText.match(/\d+/g); // 숫자 추출
  var point = extractedNumbers ? parseInt(extractedNumbers.join("")) : 0; // 추출한 숫자를 합쳐서 정수로 변환
  var area = $(".region_choose").text();
  const jwtToken = sessionStorage.getItem("jwtToken");
  const requestId = sessionStorage.getItem("requestId");

  $.ajax({
    url: "http://54.180.109.140:8080/api/post/update/" + requestId + "/",
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
      title: title,
      content: content,
      point: point,
      area: area,
      token: jwtToken,
    }),
    success: function (response) {
      // alert("게시물이 수정되었습니다.");
      window.location.href = "./request_list.html";
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

// 사용자가 지역 선택을 했을 때 실행되는 함수
function selectRegion(selectedArea) {
  userinfo_change(selectedArea);
}

function userinfo_change(area) {
  console.log(area);
  const userEmail = sessionStorage.getItem("userEmail");
  console.log("이메일:", userEmail); // 확인용 로그

  $.ajax({
    url: "http://54.180.109.140:8080/api/user/update_info_area/",
    method: "POST",
    data: JSON.stringify({
      email: userEmail,
      area: area,
    }),
    success: function (response) {
      console.log("회원 정보 수정 성공");
      const jwtToken = sessionStorage.getItem("jwtToken");

      $.ajax({
        type: "POST",
        url: "http://54.180.109.140:8080/api/user/info/",
        contentType: "application/json",
        data: JSON.stringify({
          token: jwtToken,
        }),
        success: function (response) {
          console.log(response);

          const userInfo = response; // 전체 응답 객체
          const userFields = userInfo.fields; // 사용자 정보 객체

          // 이메일 값을 세션 스토리지에 저장
          const userEmail = userFields.email;
          sessionStorage.setItem("userEmail", userEmail);

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
