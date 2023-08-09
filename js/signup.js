// 아이디 중복확인+인증번호
function checkEmailAvailability() {
  var emailInput = document.querySelector("#email_input");
  var emailCheckMessage = document.querySelector("#email_check_message");
  var emailDuplicateMessage = document.querySelector(
    "#email_duplicate_message"
  );
  var certifiednumInput = document.querySelector("#certifiednum_input");
  var certifyButton = document.querySelector("#certify_button");

  // 예시: 여기에 실제로 아이디 중복 확인 로직을 구현해야 합니다.
  var isEmailAvailable = checkEmailDuplicate(emailInput.value);

  if (isEmailAvailable) {
    emailCheckMessage.style.display = "block"; // 중복 없을 경우 메시지 표시
    emailDuplicateMessage.style.display = "none"; // 이미 존재하는 아이디 메시지 숨김
    certifiednumInput.disabled = false; // 인증번호 입력 활성화
    certifyButton.disabled = false; // 인증하기 버튼 활성화
  } else {
    emailCheckMessage.style.display = "none"; // 중복 있을 경우 메시지 숨김
    emailDuplicateMessage.style.display = "block"; // 이미 존재하는 아이디 메시지 표시
    certifiednumInput.disabled = true; // 인증번호 입력 비활성화
    certifyButton.disabled = true; // 인증하기 버튼 비활성화
  }
}

function showCertifyMessage() {
  var certifyMessage = document.querySelector("#certify_message");

  // 인증번호 검증 로직을 여기에 추가해야 합니다.
  // 예시로 항상 인증 성공으로 가정하고 메시지를 표시하도록 작성되어 있습니다.
  certifyMessage.style.display = "block";
}

// 예시: 아이디 중복 확인 함수 (실제로는 서버 요청 등으로 구현해야 함)
function checkEmailDuplicate(email) {
  // 여기에 실제로 아이디 중복 확인 로직을 구현해야 합니다.
  // 서버 요청 등을 통해 아이디의 중복 여부를 확인하고 결과를 반환합니다.
  // 이 함수는 중복되지 않으면 true를 반환하고, 중복되면 false를 반환해야 합니다.
  // 예시로 항상 true를 반환하도록 작성되어 있습니다.
  return true;
}

// 비밀번호
function checkPasswordMatch() {
  var password = document.querySelector("#password_input").value;
  var pwCheck = document.querySelector("#pw_check_input").value;
  var pwMessage = document.querySelector("#pw_message");

  if (password === pwCheck) {
    pwMessage.style.display = "none"; // 일치하면 메시지를 숨김
  } else {
    pwMessage.style.display = "block"; // 불일치하면 메시지를 보이게 함
  }
}

// 닉네임
function checkNicknameAvailability() {
  var nicknameInput = document.querySelector("#nickname_input").value;
  var nicknameMessage = document.querySelector("#nickname_message");

  // 예시: 여기에 실제로 닉네임 중복 확인 로직을 구현해야 합니다.
  var isNicknameAvailable = checkNicknameDuplicate(nicknameInput);

  if (isNicknameAvailable) {
    nicknameMessage.style.display = "none";
  } else {
    nicknameMessage.style.display = "block";
  }
}

// 예시: 닉네임 중복 확인 함수 (실제로는 서버 요청 등으로 구현해야 함)
function checkNicknameDuplicate(nickname) {
  // 여기에 실제로 닉네임 중복 확인 로직을 구현해야 합니다.
  // 서버 요청 등을 통해 닉네임의 중복 여부를 확인하고 결과를 반환합니다.
  // 예시로 항상 false를 반환하도록 작성되어 있습니다.
  return false;
}

// 주소입력
function openAddressPopup() {
  new daum.Postcode({
    oncomplete: function (data) {
      var roadAddr = data.roadAddress; // Full road address
      var extraRoadAddr = ""; // Additional address information

      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }

      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }

      if (extraRoadAddr !== "") {
        extraRoadAddr = "(" + extraRoadAddr + ")";
      }

      document.querySelector("#address_input").value = roadAddr + extraRoadAddr;
    },
  }).open();
}
