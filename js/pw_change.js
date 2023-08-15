// 현재 비밀번호

var email = "";
var password = "";

// const jwtToken = sessionStorage.getItem("jwtToken");

const jwtToken = "6QjIlPiXHs13LLbvA2ufdlubYp3MtQxxzsDYvbJraccTZVpckiE6VSyqAwCmbFlZJKtuATon6bexCoxkDYxycHdxnLEkTAblqK0D";
$.ajax({
    type: 'POST',
    url: 'http://43.202.43.176:8080/api/user/info/',
    contentType: 'application/json',
    data: JSON.stringify({ "token": jwtToken }),
    success: function(response) {
        const showData = () => {
            email = response.fields.email;
            password = response.fields.password;
        }
        showData();
    },
    error: function(request, status, error) {
        console.log("code: " + request.status)
        console.log("message: " + request.responseText)
        console.log("error: " + error);
    }
})

var present = document.getElementById('present');
const not_present = document.querySelector('.not_present');

$('#present').on('change', function() {
    if ((password === present.value) || (present.value === "")) {
        not_present.style.display = 'none';
    } else {
        not_present.style.display = 'block';
    }
});

// 새로운 비밀번호 확인

var new_password = document.getElementById('new');
var newCheck = document.getElementById('newCheck');
const not_match = document.querySelector('.not_match');

$('#newCheck').on('change', function() {
    if ((new_password.value === newCheck.value) || (newCheck.value === "")) {
        not_match.style.display = 'none';
    } else {
        not_match.style.display = 'block';
    }
});


// 제출

const submit = () => {
    if ((password === present.value) && (new_password.value !== "") && (new_password.value === newCheck.value)) {
        var updatedDate = {
            "email": email,
            "new_password": new_password.value
        }
        sendUpdateRequest(updatedDate);
        alert("비밀번호가 변경되었습니다.");

    } else {
        alert("비밀번호를 확인해주세요.");
    }

}

const sendUpdateRequest = (updatedDate) => {
    $.ajax({
        type: 'POST',
        url: 'http://43.202.43.176:8080/api/user/password_reset/',
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



/////////////////////



/*

// 현재 비밀번호

var password = "1234";
var present = document.getElementById('present');
const not_present = document.querySelector('.not_present');

$('#present').on('change', function() {
    if ((password === present.value) || (present.value === "")) {
        not_present.style.display = 'none';
    } else {
        not_present.style.display = 'block';
    }
});


// 새로운 비밀번호 확인

var new_password = document.getElementById('new');
var newCheck = document.getElementById('newCheck');
const not_match = document.querySelector('.not_match');

$('#newCheck').on('change', function() {
    if ((new_password.value === newCheck.value) || (newCheck.value === "")) {
        not_match.style.display = 'none';
    } else {
        not_match.style.display = 'block';
    }
});


// 제출

const submit = () => {
    if ((password === present.value) && (new_password.value !== "") && (new_password.value === newCheck.value)) {
        var updatedDate = {
                // "email": email,
                "new_password": new_password
            }
            // sendUpdateRequest(updatedDate);
        alert("비밀번호가 변경되었습니다.");

    } else {
        alert("비밀번호를 확인해주세요.");
    }

}

*/