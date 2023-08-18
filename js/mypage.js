/*

// const jwtToken = sessionStorage.getItem("jwtToken");

const jwtToken = "6QjIlPiXHs13LLbvA2ufdlubYp3MtQxxzsDYvbJraccTZVpckiE6VSyqAwCmbFlZJKtuATon6bexCoxkDYxycHdxnLEkTAblqK0D";


////// 출석체크

const days = document.querySelectorAll('.attend_day');
const attend_btn = document.querySelector('.attend_btn');
let currentIndex = 0;

days[currentIndex].classList.add('checked');

// 기존

$.ajax({
    type: 'POST',
    url: 'http://3.36.130.108:8080/api/user/attend/',
    contentType: 'application/json',
    data: JSON.stringify({ "token": jwtToken }),
    success: function(response) {
        const showData = () => {

            var length = response.length;
            for (var i = 0; i < length; i++) {

                days[currentIndex].classList.add('checked');
                let stamp = document.createElement("img");
                stamp.src = "../img/stamp.png"
                days[currentIndex].appendChild(stamp);
                currentIndex++;

                days[currentIndex].classList.add('checked');
            }
        }
        showData();
    },
    error: function() {
        console.log("실패");
    }
})


// 출석체크
$('.attend_btn').on('click', function() {
    $.ajax({
        type: 'POST',
        url: 'http://3.36.130.108:8080/api/user/attend_check/',
        contentType: 'application/json',
        data: JSON.stringify({ "token": jwtToken }),
        success: function(response) {
            if (response.message === "success") {
                days[currentIndex].classList.add('checked');
                let stamp = document.createElement("img");
                stamp.src = "../img/stamp.png"
                days[currentIndex].appendChild(stamp);
                currentIndex++;

                days[currentIndex].classList.add('checked');
            } else {
                alert("출석체크 실패");
            }

        },
        error: function() {
            console.log("실패");
        }
    })
});

////// 회원정보 보기

$.ajax({
    type: 'POST',
    url: 'http://3.36.130.108:8080/api/user/info/',
    contentType: 'application/json',
    data: JSON.stringify({ "token": jwtToken }),
    success: function(response) {
        const showData = () => {
            // 데이터 읽기
            const nickname = response.fields.nickname;
            const point = response.fields.point;
            const name = response.fields.name;
            const birth = response.fields.date_of_birth;
            const address = response.fields.address;
            const area = response.fields.area;
            const adopt_count = response.fields.adopt_count;

            // 데이터 넣기

            document.getElementById('content_nickname').innerHTML = "[" + nickname + "] 님,";
            document.getElementById('content_point').innerHTML = point + " 포인트";
            document.getElementById('content_name').innerHTML = name;
            document.getElementById('content_birth').innerHTML = birth;
            document.getElementById('content_area').innerHTML = address;
            document.getElementById('func_area').innerHTML = area;
            document.querySelector('.adopt_num').innerHTML = adopt_count + "회";
        }
        showData();
    },
    error: function(request, status, error) {
        console.log("code: " + request.status)
        console.log("message: " + request.responseText)
        console.log("error: " + error);
    }
})


*/

//////////////////////////////////




// 출석체크

const days = document.querySelectorAll('.attend_day');
const attend_btn = document.querySelector('.attend_btn');
let currentIndex = 0;

days[currentIndex].classList.add('checked');

// 기존 출석체크
var jsonLocation = "../json/attend.json";
$.getJSON(jsonLocation, function(data) {
    const showData = () => {

        var length = data.length;
        for (var i = 0; i < length; i++) {

            days[currentIndex].classList.add('checked');
            let stamp = document.createElement("img");
            stamp.src = "../img/stamp.png"
            days[currentIndex].appendChild(stamp);
            currentIndex++;

            days[currentIndex].classList.add('checked');
        }

    }
    showData();
});

$('.attend_btn').on('click', function() {
    if (currentIndex > 24) {
        alert("출석체크 끝");
    } else {
        days[currentIndex].classList.add('checked');
        let stamp = document.createElement("img");
        stamp.src = "../img/stamp.png"
        days[currentIndex].appendChild(stamp);
        currentIndex++;

        days[currentIndex].classList.add('checked');
    }
});


// 회원정보

var jsonLocation = "../json/user.json";
$.getJSON(jsonLocation, function(data) {
    const showData = () => {

        // 데이터 읽기
        const nickname = data.fields.nickname;
        const point = data.fields.point;
        const name = data.fields.name;
        const birth = data.fields.date_of_birth;
        const address = data.fields.address;
        const area = data.fields.area;
        const adopt_count = data.fields.adopt_count;

        // 데이터 넣기

        document.getElementById('content_nickname').innerHTML = "[" + nickname + "] 님,";
        document.getElementById('content_point').innerHTML = point + " 포인트";
        document.getElementById('content_name').innerHTML = name;
        document.getElementById('content_birth').innerHTML = birth;
        document.getElementById('content_area').innerHTML = address;
        document.getElementById('func_area').innerHTML = area;
        document.querySelector('.adopt_num').innerHTML = adopt_count + "회";
    }
    showData();
});