var present_num = 1;
var present_page = 1;

var jsonLocation = "../json/my_post.json";
$.getJSON(jsonLocation, function(data) {
    var length = data.length;
    var num = Math.ceil(length / 4);
    var page = 1;
    if (num > 5) {
        page = Math.ceil(num / 5);
    }

    // 밑에 숫자
    const showNumber = () => {
        if (num > 1) {
            let wrap_num = document.querySelector('.wrap_num');

            // 화살표
            let arrow = document.createElement("img");
            arrow.setAttribute("class", "arrow_btn");
            arrow.src = "../img/arrow.png";
            let arrowR = document.createElement("img");
            arrowR.setAttribute("class", "arrowR_btn");
            arrowR.src = "../img/arrow_reverse.png";

            wrap_num.appendChild(arrow);

            // 숫자
            var j = 5 * (present_page - 1);
            var first = j;
            var untilNum = 5 * present_page;
            if ((untilNum > num)) {
                untilNum = num;
            }
            for (j; j < untilNum; j++) {
                let number = document.createElement("button");
                number.setAttribute("class", "num_btn");
                if (j == first) {
                    number.classList.add('checked');
                }
                number.innerHTML = j + 1;
                wrap_num.appendChild(number);
            }
            // 구조 
            wrap_num.appendChild(arrowR);
        }
    }
    showNumber();

    const showNumberArrow = () => {
        if (num > 1) {
            let wrap_num = document.querySelector('.wrap_num');

            // 화살표
            let arrow = document.createElement("img");
            arrow.setAttribute("class", "arrow_btn");
            arrow.src = "../img/arrow.png";
            let arrowR = document.createElement("img");
            arrowR.setAttribute("class", "arrowR_btn");
            arrowR.src = "../img/arrow_reverse.png";

            wrap_num.appendChild(arrow);

            // 숫자
            var j = 5 * (present_page - 1);
            var first = j;
            var untilNum = 5 * present_page;
            if ((untilNum > num)) {
                untilNum = num;
            }
            for (j; j < untilNum; j++) {
                let number = document.createElement("button");
                number.setAttribute("class", "num_btn");
                if (j == (untilNum - 1)) {
                    number.classList.add('checked');
                }
                number.innerHTML = j + 1;
                wrap_num.appendChild(number);
            }
            // 구조 
            wrap_num.appendChild(arrowR);
        }
    }

    // 버튼 클릭
    document.querySelector('.wrap_num').addEventListener('click', function(event) {
        if (event.target.classList.contains('num_btn')) {
            try {
                let checked = document.querySelector('.num_btn.checked');
                checked.classList.remove('checked');
            } catch {}
            event.target.classList.add('checked');
            present_num = event.target.innerHTML;

            var wrap_post = document.querySelector('.wrap_post');
            while (wrap_post.firstChild) {
                wrap_post.removeChild(wrap_post.firstChild)
            }
            showPost();
        } else if (event.target.classList.contains('arrow_btn')) {
            if (present_page == 1) {
                alert("첫번째 페이지입니다.")
            } else {
                present_page--;
                present_num = (5 * (present_page - 1) + 1);
                var wrap_num = document.querySelector('.wrap_num');
                while (wrap_num.firstChild) {
                    wrap_num.removeChild(wrap_num.firstChild)
                }
                var wrap_post = document.querySelector('.wrap_post');
                while (wrap_post.firstChild) {
                    wrap_post.removeChild(wrap_post.firstChild)
                }
                showNumberArrow();
                showPost();
            }
        } else if (event.target.classList.contains('arrowR_btn')) {
            if (present_page == page) {
                alert("마지막 페이지입니다.");
            } else {
                present_page++;
                present_num = (5 * (present_page - 1) + 1);
                console.log(present_num);
                console.log(present_page);
                var wrap_num = document.querySelector('.wrap_num');
                while (wrap_num.firstChild) {
                    wrap_num.removeChild(wrap_num.firstChild)
                }
                var wrap_post = document.querySelector('.wrap_post');
                while (wrap_post.firstChild) {
                    wrap_post.removeChild(wrap_post.firstChild)
                }
                showNumber();
                showPost();
            }
        }
    });

    const showPost = () => {
        var i = 4 * (present_num - 1);
        var until = 4 * present_num;

        if ((until > length)) {
            until = length;
        }
        for (i; i < until; i++) {
            const showData = () => {

                // 데이터 읽기
                const pk = data[i].pk;
                const title = data[i].fields.title;
                const content = data[i].fields.content;
                const point = data[i].fields.point;
                const numChat = data[i].fields.numChat;

                // 데이터 넣기
                let wrap_post = document.querySelector('.wrap_post');

                let link = document.createElement("a");
                link.setAttribute("post_id", pk);

                let post = document.createElement("div");
                post.setAttribute("class", "post");

                let post_title = document.createElement("div");
                post_title.setAttribute("class", "post_title");

                let post_name = document.createElement("div");
                post_name.setAttribute("class", "post_name");
                let post_name_p = document.createElement("p");
                post_name_p.innerHTML = title;

                let post_point = document.createElement("div");
                post_point.setAttribute("class", "post_point");
                let point_img = document.createElement("img");
                point_img.src = "../img/stamp.png"
                let post_point_p = document.createElement("p");
                post_point_p.innerHTML = point + "p";

                let post_chat = document.createElement("div");
                post_chat.setAttribute("class", "post_chat");
                let chat_img = document.createElement("img");
                chat_img.src = "../img/chat.png"
                let post_chat_p = document.createElement("p");
                post_chat_p.innerHTML = numChat + "명";

                let post_content = document.createElement("div");
                post_content.setAttribute("class", "post_content");

                let post_content_p = document.createElement("p");
                post_content_p.innerHTML = content;

                // 구조
                wrap_post.appendChild(link);
                link.appendChild(post);

                post.appendChild(post_title);
                post.appendChild(post_content);

                post_title.appendChild(post_name);
                post_name.appendChild(post_name_p);

                post_title.appendChild(post_point);
                post_point.appendChild(point_img);
                post_point.appendChild(post_point_p);

                post_title.appendChild(post_chat);
                post_chat.appendChild(chat_img);
                post_chat.appendChild(post_chat_p);

                post_content.appendChild(post_content_p);

                // 링크 - 보류
                link.href = "../html/solve.html"
                link.addEventListener("click", function(event) {
                    sessionStorage.setItem("requestId", pk);
                });
            }
            showData();
        }
    }
    showPost();
});


///////////////////////////////////

/*

var present_num = 1;
var present_page = 1;


// const jwtToken = sessionStorage.getItem("jwtToken");

const jwtToken = "6QjIlPiXHs13LLbvA2ufdlubYp3MtQxxzsDYvbJraccTZVpckiE6VSyqAwCmbFlZJKtuATon6bexCoxkDYxycHdxnLEkTAblqK0D";

// 현재 정보

$.ajax({
    type: 'POST',
    url: 'http://3.36.130.108:8080/api/post/my_post/',
    contentType: 'application/json',
    data: JSON.stringify({ "token": jwtToken }),
    success: function(response) {
        var length = response.length;
        var num = Math.ceil(length / 4);
        var page = 1;
        if (num > 5) {
            page = Math.ceil(num / 5);
        }
    
        // 밑에 숫자
        const showNumber = () => {
            if (num > 1) {
                let wrap_num = document.querySelector('.wrap_num');
    
                // 화살표
                let arrow = document.createElement("img");
                arrow.setAttribute("class", "arrow_btn");
                arrow.src = "../img/arrow.png";
                let arrowR = document.createElement("img");
                arrowR.setAttribute("class", "arrowR_btn");
                arrowR.src = "../img/arrow_reverse.png";
    
                wrap_num.appendChild(arrow);
    
                // 숫자
                var j = 5 * (present_page - 1);
                var first = j;
                var untilNum = 5 * present_page;
                if ((untilNum > num)) {
                    untilNum = num;
                }
                for (j; j < untilNum; j++) {
                    let number = document.createElement("button");
                    number.setAttribute("class", "num_btn");
                    if (j == first) {
                        number.classList.add('checked');
                    }
                    number.innerHTML = j + 1;
                    wrap_num.appendChild(number);
                }
                // 구조 
                wrap_num.appendChild(arrowR);
            }
        }
        showNumber();
    
        const showNumberArrow = () => {
            if (num > 1) {
                let wrap_num = document.querySelector('.wrap_num');
    
                // 화살표
                let arrow = document.createElement("img");
                arrow.setAttribute("class", "arrow_btn");
                arrow.src = "../img/arrow.png";
                let arrowR = document.createElement("img");
                arrowR.setAttribute("class", "arrowR_btn");
                arrowR.src = "../img/arrow_reverse.png";
    
                wrap_num.appendChild(arrow);
    
                // 숫자
                var j = 5 * (present_page - 1);
                var first = j;
                var untilNum = 5 * present_page;
                if ((untilNum > num)) {
                    untilNum = num;
                }
                for (j; j < untilNum; j++) {
                    let number = document.createElement("button");
                    number.setAttribute("class", "num_btn");
                    if (j == (untilNum - 1)) {
                        number.classList.add('checked');
                    }
                    number.innerHTML = j + 1;
                    wrap_num.appendChild(number);
                }
                // 구조 
                wrap_num.appendChild(arrowR);
            }
        }
    
        // 버튼 클릭
        document.querySelector('.wrap_num').addEventListener('click', function(event) {
            if (event.target.classList.contains('num_btn')) {
                try {
                    let checked = document.querySelector('.num_btn.checked');
                    checked.classList.remove('checked');
                } catch {}
                event.target.classList.add('checked');
                present_num = event.target.innerHTML;
    
                var wrap_post = document.querySelector('.wrap_post');
                while (wrap_post.firstChild) {
                    wrap_post.removeChild(wrap_post.firstChild)
                }
                showPost();
            } else if (event.target.classList.contains('arrow_btn')) {
                if (present_page == 1) {
                    alert("첫번째 페이지입니다.")
                } else {
                    present_page--;
                    present_num = (5 * (present_page - 1) + 1);
                    var wrap_num = document.querySelector('.wrap_num');
                    while (wrap_num.firstChild) {
                        wrap_num.removeChild(wrap_num.firstChild)
                    }
                    var wrap_post = document.querySelector('.wrap_post');
                    while (wrap_post.firstChild) {
                        wrap_post.removeChild(wrap_post.firstChild)
                    }
                    showNumberArrow();
                    showPost();
                }
            } else if (event.target.classList.contains('arrowR_btn')) {
                if (present_page == page) {
                    alert("마지막 페이지입니다.");
                } else {
                    present_page++;
                    present_num = (5 * (present_page - 1) + 1);
                    console.log(present_num);
                    console.log(present_page);
                    var wrap_num = document.querySelector('.wrap_num');
                    while (wrap_num.firstChild) {
                        wrap_num.removeChild(wrap_num.firstChild)
                    }
                    var wrap_post = document.querySelector('.wrap_post');
                    while (wrap_post.firstChild) {
                        wrap_post.removeChild(wrap_post.firstChild)
                    }
                    showNumber();
                    showPost();
                }
            }
        });
    
        const showPost = () => {
            var i = 4 * (present_num - 1);
            var until = 4 * present_num;
    
            if ((until > length)) {
                until = length;
            }
            for (i; i < until; i++) {
                const showData = () => {
    
                    // 데이터 읽기
                    const pk = response[i].pk;
                    const title = response[i].fields.title;
                    const content = response[i].fields.content;
                    const point = response[i].fields.point;
                    const numChat = response[i].fields.numChat;
    
                    // 데이터 넣기
                    let wrap_post = document.querySelector('.wrap_post');
    
                    let link = document.createElement("a");
                    link.setAttribute("post_id", pk);
    
                    let post = document.createElement("div");
                    post.setAttribute("class", "post");
    
                    let post_title = document.createElement("div");
                    post_title.setAttribute("class", "post_title");
    
                    let post_name = document.createElement("div");
                    post_name.setAttribute("class", "post_name");
                    let post_name_p = document.createElement("p");
                    post_name_p.innerHTML = title;
    
                    let post_point = document.createElement("div");
                    post_point.setAttribute("class", "post_point");
                    let point_img = document.createElement("img");
                    point_img.src = "../img/stamp.png"
                    let post_point_p = document.createElement("p");
                    post_point_p.innerHTML = point + "p";
    
                    let post_chat = document.createElement("div");
                    post_chat.setAttribute("class", "post_chat");
                    let chat_img = document.createElement("img");
                    chat_img.src = "../img/chat.png"
                    let post_chat_p = document.createElement("p");
                    post_chat_p.innerHTML = numChat + "명";
    
                    let post_content = document.createElement("div");
                    post_content.setAttribute("class", "post_content");
    
                    let post_content_p = document.createElement("p");
                    post_content_p.innerHTML = content;
    
                    // 구조
                    wrap_post.appendChild(link);
                    link.appendChild(post);
    
                    post.appendChild(post_title);
                    post.appendChild(post_content);
    
                    post_title.appendChild(post_name);
                    post_name.appendChild(post_name_p);
    
                    post_title.appendChild(post_point);
                    post_point.appendChild(point_img);
                    post_point.appendChild(post_point_p);
    
                    post_title.appendChild(post_chat);
                    post_chat.appendChild(chat_img);
                    post_chat.appendChild(post_chat_p);
    
                    post_content.appendChild(post_content_p);
    
                    // 링크 - 보류
                    link.href = "../html/solve.html"
                    link.addEventListener("click", function(event) {
                        sessionStorage.setItem("requestId", pk);
                    });
                }
                showData();
            }
        }
        showPost();
    },
    error: function(request, status, error) {
        console.log("code: " + request.status)
        console.log("message: " + request.responseText)
        console.log("error: " + error);
    }
})


*/