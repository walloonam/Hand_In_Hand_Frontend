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

//수정하기
$(document).ready(function () {
  //   loadSavedData(); // 저장된 데이터를 불러와서 입력 필드에 채워넣는 함수를 실행

  //   function loadSavedData() {
  //     // 저장된 데이터를 불러와서 입력 필드에 채워넣는 로직을 추가합니다.
  //     // 예: 저장된 데이터를 서버에서 가져와서 각 입력 필드에 채워넣을 수 있습니다.
  //     // 아래는 간단한 예시입니다.
  //     var savedTitle = "저장된 제목"; // 저장된 제목 데이터
  //     var savedContent = "저장된 내용"; // 저장된 내용 데이터
  //     var savedPoint = "저장된 포인트"; // 저장된 포인트 데이터

  //     $(".title_container input").val(savedTitle);
  //     $(".content_container input").val(savedContent);
  //     $(".point_container input").val(savedPoint);
  //   }

  // 수정하기 버튼 클릭 시 실행되는 함수
  $("#change_button").on("click", function () {
    // 데이터를 가져와서 변수에 저장
    var title = $(".title_container input").val();
    var content = $(".content_container input").val();
    var point = $(".point_container input").val();

    console.log("게시물이 수정되었습니다.");
    window.location.href = "./request_list.html";
  });
});

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
