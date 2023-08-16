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

// 기본 데이터 불러오기
function reportCheck() {
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
}

// 게시물 데이터 불러오기
$(document).ready(function () {
  // 세션 스토리지에서 데이터 불러오기
  const requestId = sessionStorage.getItem("requestId");

  // 데이터가 존재하면 두 번째 요청을 보냅니다.
  if (requestId) {
    $.ajax({
      type: "GET",
      url: "http://3.36.130.108:8080/api/post/" + requestId + "/",
      contentType: "application/json",
      dataType: "json",
      success: function (secondResponse) {
        console.log(secondResponse);
        alert("두 번째 요청이 정상적으로 처리되었습니다.");

        // 세션 스토리지에서 데이터 불러오기
        const requestTitle = secondResponse.title;
        const requestPoint = secondResponse.point;
        const requestChat = secondResponse.numChat;
        const requestContent = secondResponse.content;
        const created_at = secondResponse.created_at;
        const area = secondResponse.area;

        const formattedCreatedAt = formatDateTime(created_at);

        // 불러온 데이터를 화면에 표시
        document.querySelector(".title_container").innerHTML = requestTitle;
        document.querySelector(".pointnum").innerHTML = requestPoint + "P";
        document.querySelector(".chatnum").innerHTML = requestChat + "명";
        document.querySelector(".content_container").innerHTML = requestContent;
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

// 신고하기
function reportCheck() {
  if (confirm("신고하시겠습니까?")) {
    const requestId = sessionStorage.getItem("requestId");
    $.ajax({
      url: "http://3.36.130.108:8080/api/post/declare_post/" + requestId + "/",
      method: "POST",
      dataType: "json",
      success: function (response) {
        console.log("신고 횟수 +1 성공.");
        alert("신고 완료되었습니다.");
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
        alert("로그아웃 되었습니다.");
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
