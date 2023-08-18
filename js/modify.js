const jwtToken = sessionStorage.getItem("jwtToken");

// const jwtToken = "6QjIlPiXHs13LLbvA2ufdlubYp3MtQxxzsDYvbJraccTZVpckiE6VSyqAwCmbFlZJKtuATon6bexCoxkDYxycHdxnLEkTAblqK0D";

// 현재 정보
var email = "";
var nickname = "";

$.ajax({
    type: 'POST',
    url: 'http://3.36.130.108:8080/api/user/info/',
    contentType: 'application/json',
    data: JSON.stringify({ "token": jwtToken }),
    success: function(response) {
        const showData = () => {

            // 데이터 읽기
            email = response.fields.email;
            const name = response.fields.name;
            const birth = response.fields.date_of_birth;
            nickname = response.fields.nickname;
            const address = response.fields.address;

            // 데이터 넣기

            document.getElementById('user_id').innerHTML = email;
            document.getElementById('user_name').innerHTML = name;
            document.getElementById('user_birth').innerHTML = birth;
            document.getElementById('nickname_input').value = nickname;
            document.getElementById('address_input').innerHTML = address;
        }
        showData();
    },
    error: function(request, status, error) {
        console.log("code: " + request.status)
        console.log("message: " + request.responseText)
        console.log("error: " + error);
    }
})

// 닉네임 중복확인
const nickname_input = document.getElementById('nickname_input');
var pass = 1;

$('.checkNick_btn').on('click', function() {
    const present = document.querySelector('.nick_present');
    present.style.display = 'none';
    const impossible = document.querySelector('.nick_impossible');
    impossible.style.display = 'none';
    const possible = document.querySelector('.nick_possible');
    possible.style.display = 'none';

    const newNick = nickname_input.value;
    $.ajax({
        type: 'POST',
        url: 'http://3.36.130.108:8080/api/user/check_nickname/',
        contentType: 'application/json',
        data: JSON.stringify({ "nickname": newNick }),
        success: function(response) {
            if (newNick === nickname) {
                present.style.display = 'block';
                pass = 1;
            } else if (response.message === "fail") {
                impossible.style.display = 'block';
                pass = 0;
            } else {
                possible.style.display = 'block';
                pass = 1;
            }
        },
        error: function() {
            console.log("실패");
        }
    })
});

// 주소입력
function openAddressPopup() {
    new daum.Postcode({
        oncomplete: function(data) {
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

            document.querySelector("#address_input").innerHTML = roadAddr + extraRoadAddr;
        },
    }).open();
}

const submit = () => {
    var addressText = document.querySelector("#address_input").textContent;

    $.ajax({
        type: 'POST',
        url: 'http://3.36.130.108:8080/api/user/update_info/',
        contentType: 'application/json',
        data: JSON.stringify({
            "email": email,
            "nickname": $('#nickname_input').val(),
            "address": addressText
        }),
        success: function(response) {
            console.log("성공");
            console.log(response);
        },
        error: function(request, status, error) {
            console.log("code: " + request.status)
            console.log("message: " + request.responseText)
            console.log("error: " + error);
        }
    });
}

// 탈퇴
$('.withdraw_btn').on('click', function() {
    if (!confirm("탈퇴하시겠습니까?")) {
        alert("취소하였습니다.")
    } else {
        $.ajax({
            type: 'POST',
            url: 'http://3.36.130.108:8080/api/user/delete/user/',
            contentType: 'application/json',
            data: JSON.stringify({ "email": email }),
            success: function(response) {
                console.log("성공");
                console.log(response);
                alert("탈퇴 되었습니다.");
                window.location.href = "../html/home_logout.html";
            },
            error: function(request, status, error) {
                console.log("code: " + request.status)
                console.log("message: " + request.responseText)
                console.log("error: " + error);
            }
        });
    }
});


//////////////////////////////////

/*

var jsonLocation = "../json/user.json";
$.getJSON(jsonLocation, function(data) {
    const showData = () => {

        // 데이터 읽기
        const email = data.fields.email;
        const name = data.fields.name;
        const birth = data.fields.date_of_birth;
        const nickname = data.fields.nickname;
        const address = data.fields.address;

        // 데이터 넣기

        document.getElementById('user_id').innerHTML = email;
        document.getElementById('user_name').innerHTML = name;
        document.getElementById('user_birth').innerHTML = birth;
        document.getElementById('nickname_input').value = nickname;
        document.getElementById('address_input').value = address;
    }
    showData();
});

$('.withdraw_btn').on('click', function() {
    confirm("탈퇴하시겠습니까?")
});

const nickname_input = document.getElementById('nickname_input')
let nicknameList = ['김멋사'];

$('.checkNick_btn').on('click', function() {
    const impossible = document.querySelector('.nick_impossible');
    impossible.style.display = 'none';
    const possible = document.querySelector('.nick_possible');
    possible.style.display = 'none';

    const newNick = nickname_input.value;

    if (nicknameList.includes(newNick)) {
        impossible.style.display = 'block';
    } else {
        possible.style.display = 'block';
    }
});


// 주소입력
function openAddressPopup() {
    new daum.Postcode({
        oncomplete: function(data) {
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

const submit = () => {
    console.log($('#input_pw').val());
    console.log($('#input_id').val());
    console.log($('#input_nick').val());
    var updatedDate = {
        "password": $('#input_pw').val(),
        "userLoginId": $('#input_id').val(),
        "nickName": $('#input_nick').val()
    }
    sendUpdateRequest(updatedDate);
}

const sendUpdateRequest = (updatedDate) => {
    $.ajax({
        type: 'PUT',
        url: 'http://{}/api/myPage',
        contentType: 'application/json',
        data: JSON.stringify(updatedDate),
        success: function() {
            console.log("성공");
        },
        error: function(request, status, error) {
            console.log("code: " + request.status)
            console.log("message: " + request.responseText)
            console.log("error: " + error);
        }
    });
}

*/






/* 이미지 수정 */


// $('#img_btn').on('click', function() {

//     var select = prompt("수정 1 삭제 2");

//     if (select == 1) {
//         $('#img_input').click();
//     } else if (select == 2) {
//         alert("삭제");
//     } else {
//         alert("제대로 된 값 입력");
//     }
// });

// $('#img_input').on('change', function() {
//     var file = this.files[0];
//     if (file) {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             $('#profile').attr('src', e.target.result);
//         };
//         reader.readAsDataURL(file);
//     }
// });