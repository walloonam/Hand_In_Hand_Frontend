$('#img_btn').on('click', function() {

    var select = prompt("수정 1 삭제 2");

    if (select == 1) {
        $('#img_input').click();
    } else if (select == 2) {
        alert("삭제");
    } else {
        alert("제대로 된 값 입력");
    }
});

$('#img_input').on('change', function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#profile').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    }
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
        console.log(newNick);
        impossible.style.display = 'block';
    } else {
        console.log(newNick);
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