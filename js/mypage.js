var jsonLocation = "../json/user.json";
$.getJSON(jsonLocation, function(data) {

    const showData = () => {

        // 데이터 읽기
        const nickname = data.nickname;
        const point = data.point;
        const name = data.name;
        const birth = data.date_of_birth;
        const area = data.area;
        const adopt_count = data.adopt_count;

        // 데이터 넣기

        document.getElementById('content_nickname').innerHTML = "[" + nickname + "] 님,";
        document.getElementById('content_point').innerHTML = point + " 포인트";
        document.getElementById('content_name').innerHTML = name;
        document.getElementById('content_birth').innerHTML = birth;
        document.getElementById('content_area').innerHTML = area;
        document.getElementById('func_area').innerHTML = area;
        document.querySelector('.adopt_num').innerHTML = adopt_count + "회";



    }
    showData();

});