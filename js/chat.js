const jwtToken = sessionStorage.getItem("jwtToken");

// const jwtToken = "6QjIlPiXHs13LLbvA2ufdlubYp3MtQxxzsDYvbJraccTZVpckiE6VSyqAwCmbFlZJKtuATon6bexCoxkDYxycHdxnLEkTAblqK0D";

// 버튼들

const deleteAll = () => {
    while (wrap_list.firstChild) {
        wrap_list.removeChild(wrap_list.firstChild)
    }
    var chat_area = document.querySelector('.chat_area');
    while (chat_area.firstChild) {
        chat_area.removeChild(chat_area.firstChild)
    }
    document.querySelector('.post_name').innerHTML = "게시물 제목";
    document.querySelector('.post_point').innerHTML = "";

    document.querySelector('#other_nick').innerHTML = "상대 닉네임";
    document.querySelector('.other_adop').innerHTML = "";

    document.querySelector('#my_nick').innerHTML = "나의 닉네임";
    document.querySelector('.my_adop').innerHTML = "";
}

var roomId = null;
var send_btn = document.querySelector('.send_btn');

document.querySelector('.wrap_list').addEventListener('click', function(event) {
    if (event.target.classList.contains('profile_img') || event.target.classList.contains('infor') || event.target.classList.contains('image') || event.target.classList.contains('other_nick') || event.target.classList.contains('post')) {
        // 채팅창 선택

        var chat_area = document.querySelector('.chat_area');
        while (chat_area.firstChild) {
            chat_area.removeChild(chat_area.firstChild)
        }

        $.ajax({
            type: 'POST',
            url: 'http://54.180.109.140/api/chatting/',
            contentType: 'application/json',
            data: JSON.stringify({ "token": jwtToken }),
            success: function(response) {

                roomId = event.target.getAttribute("data-room-id");
                const choice = event.target.getAttribute("choice");

                let foundData = null;

                send_btn.style.display = 'block';

                document.querySelector('.adopt_btn').setAttribute("data-room-id", roomId);
                document.querySelector('.view_btn').setAttribute("data-room-id", roomId);
                document.querySelector('.view_btn').setAttribute("choice", choice);


                if (choice === "main") {
                    for (const item of response.main.main) {
                        if (item.room_id == roomId) {
                            foundData = item;
                            break;
                        }
                    }
                } else if (choice === "sub") {
                    for (const item of response.sub.sub) {
                        if (item.room_id == roomId) {
                            foundData = item;
                            break;
                        }
                    }
                }

                document.querySelector('.view_btn').setAttribute("post_id", foundData.post_id);

                if (choice === "main") {
                    const showData = (foundData) => {
                        const title = foundData.title;
                        const point = foundData.point;
                        const customN = foundData.customN;
                        const ownerN = foundData.ownerN;
                        const owner = foundData.owner;
                        const custom = foundData.custom;

                        // 정보

                        document.querySelector('.post_name').innerHTML = title;
                        document.querySelector('.post_point').innerHTML = point;

                        document.querySelector('#other_nick').innerHTML = customN;
                        document.querySelector('.other_adop').innerHTML = custom + "회";

                        document.querySelector('#my_nick').innerHTML = ownerN;
                        document.querySelector('.my_adop').innerHTML = owner + "회";

                        // 내용
                        var length = foundData.chat.length;
                        for (var i = 0; i < length; i++) {
                            var chat = foundData.chat[i].fields.user;
                            var content = foundData.chat[i].fields.content;

                            if (chat === customN) {
                                let other_chat = document.createElement("div");
                                other_chat.setAttribute("class", "other_chat");

                                if (content.substring(content.lastIndexOf(".") + 1) === 'png') {
                                    var other_p = document.createElement("img");
                                    other_p.src = content;
                                } else {
                                    var other_p = document.createElement("p");
                                    other_p.innerHTML = content;
                                }

                                chat_area.appendChild(other_chat);
                                other_chat.appendChild(other_p);

                            } else {
                                let my_chat = document.createElement("div");
                                my_chat.setAttribute("class", "my_chat");

                                if (content.substring(content.lastIndexOf(".") + 1) === 'png') {
                                    var my_p = document.createElement("img");
                                    my_p.src = content;
                                } else {
                                    var my_p = document.createElement("p");
                                    my_p.innerHTML = content;
                                }

                                chat_area.appendChild(my_chat);
                                my_chat.appendChild(my_p);
                            }

                        }
                    }
                    showData(foundData);
                } else if (choice === "sub") {
                    const showData = (foundData) => {
                        adopt_btn.style.display = 'block';

                        console.log(foundData);

                        const title = foundData.title;
                        const point = foundData.point;
                        const customN = foundData.customN;
                        const ownerN = foundData.ownerN;
                        const owner = foundData.owner;
                        const custom = foundData.custom;

                        // 정보

                        document.querySelector('.post_name').innerHTML = title;
                        document.querySelector('.post_point').innerHTML = point;

                        document.querySelector('#other_nick').innerHTML = ownerN;
                        document.querySelector('.other_adop').innerHTML = owner + "회";

                        document.querySelector('#my_nick').innerHTML = customN;
                        document.querySelector('.my_adop').innerHTML = custom + "회";

                        // 내용
                        var length = foundData.chat.length;
                        for (var i = 0; i < length; i++) {
                            var chat = foundData.chat[i].fields.user;
                            var content = foundData.chat[i].fields.content;

                            if (chat === ownerN) {
                                let other_chat = document.createElement("div");
                                other_chat.setAttribute("class", "other_chat");

                                if (content.substring(content.lastIndexOf(".") + 1) === 'png') {
                                    var other_p = document.createElement("img");
                                    other_p.src = content;
                                } else {
                                    var other_p = document.createElement("p");
                                    other_p.innerHTML = content;
                                }

                                chat_area.appendChild(other_chat);
                                other_chat.appendChild(other_p);

                            } else {
                                let my_chat = document.createElement("div");
                                my_chat.setAttribute("class", "my_chat");

                                if (content.substring(content.lastIndexOf(".") + 1) === 'png') {
                                    var my_p = document.createElement("img");
                                    my_p.src = content;
                                } else {
                                    var my_p = document.createElement("p");
                                    my_p.innerHTML = content;
                                }

                                chat_area.appendChild(my_chat);
                                my_chat.appendChild(my_p);
                            }

                        }
                    }
                    showData(foundData);
                }
            },
            error: function() {
                console.log("실패");
            }
        })

    } else if (event.target.classList.contains('elim_btn')) {
        if (!confirm("삭제하시겠습니까?")) {
            alert("취소하였습니다.")
        } else {
            alert("삭제하였습니다.")
            const roomId = event.target.getAttribute("data-room-id");
            const choice = event.target.getAttribute("choice");
            console.log(choice);
            console.log(roomId);

            $.ajax({
                type: 'DELETE',
                url: 'http://54.180.109.140/api/chatting/delete/' + roomId + '/',
                contentType: 'application/json',
                success: function(response) {
                    console.log(response);

                    if (choice === "main") {
                        deleteAll();
                        showMain();
                        console.log("main");
                    } else if (choice === "sub") {
                        deleteAll();
                        showSub();
                        console.log("sub");
                    }
                },
                error: function() {
                    console.log("실패");
                }
            })
        }
    } else if (event.target.classList.contains('report_btn')) {
        if (confirm("신고하시겠습니까?")) {
            // 신고 로직
        }
    }
});

document.querySelector('.post_btn').addEventListener('click', function(event) {
    if (event.target.classList.contains('adopt_btn')) {
        if (!confirm("채택하시겠습니까?")) {
            // 채택 로직
            alert("취소");
        } else {
            const roomId = event.target.getAttribute("data-room-id");
            if (roomId == 0) {
                alert("채팅방을 선택해주세요.");
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'http://54.180.109.140/api/chatting/choice/',
                    contentType: 'application/json',
                    data: JSON.stringify({ "room_id": roomId }),
                    success: function(response) {
                        const showData = () => {
                            alert("채택되었습니다.");
                            deleteAll();
                            showSub();
                        }
                        showData();
                    },
                    error: function(request, status, error) {
                        console.log("code: " + request.status)
                        console.log("message: " + request.responseText)
                        console.log("error: " + error);
                    }
                })
            }
        }
    } else if (event.target.classList.contains('view_btn')) {
        let link = document.querySelector('.post_a');

        const post_id = event.target.getAttribute("post_id");
        const choice = event.target.getAttribute("choice");

        if (choice === "main") {
            link.href = "../html/solve.html"
        } else if (choice === "sub") {
            link.href = "../html/solve_self.html"
        }


        link.addEventListener("click", function(event) {
            sessionStorage.setItem("requestId", post_id);
        });

    }
});


// 내정보

$.ajax({
    type: 'POST',
    url: 'http://54.180.109.140/api/user/info/',
    contentType: 'application/json',
    data: JSON.stringify({ "token": jwtToken }),
    success: function(response) {
        const showData = () => {

            // 데이터 읽기
            const nickname = response.fields.nickname;

            // 데이터 넣기

            document.querySelector('.nick').innerHTML = nickname;
        }
        showData();
    },
    error: function(request, status, error) {
        console.log("code: " + request.status)
        console.log("message: " + request.responseText)
        console.log("error: " + error);
    }
})


// 주기 채팅 목록
const showMain = () => {
    document.querySelector('.adopt_btn').setAttribute("data-room-id", 0);
    document.querySelector('.view_btn').setAttribute("data-room-id", 0);
    $.ajax({
        type: 'POST',
        url: 'http://54.180.109.140/api/chatting/',
        contentType: 'application/json',
        data: JSON.stringify({ "token": jwtToken }),
        success: function(response) {
            console.log(response);
            var length = response.main.main.length;

            for (var i = 0; i < length; i++) {
                const showData = () => {

                    // 데이터 읽기
                    const customN = response.main.main[i].customN;
                    const title = response.main.main[i].title;
                    const room_id = response.main.main[i].room_id;

                    // 데이터 넣기
                    let wrap_list = document.querySelector('.wrap_list');

                    let entity = document.createElement("div");
                    entity.setAttribute("class", "entity");

                    let profile_img = document.createElement("div");
                    profile_img.setAttribute("class", "profile_img");
                    profile_img.setAttribute("data-room-id", room_id);
                    profile_img.setAttribute("choice", "main");
                    let point_img = document.createElement("img");
                    point_img.setAttribute("class", "image");
                    point_img.setAttribute("data-room-id", room_id);
                    point_img.setAttribute("choice", "main");
                    point_img.src = "../img/logo.png"

                    let infor = document.createElement("div");
                    infor.setAttribute("class", "infor");
                    infor.setAttribute("data-room-id", room_id);
                    infor.setAttribute("choice", "main");
                    let other_nick = document.createElement("p");
                    other_nick.setAttribute("class", "other_nick");
                    other_nick.setAttribute("data-room-id", room_id);
                    other_nick.setAttribute("choice", "main");
                    other_nick.innerText = customN;
                    let post = document.createElement("p");
                    post.setAttribute("class", "post");
                    post.setAttribute("data-room-id", room_id);
                    post.setAttribute("choice", "main");
                    post.innerText = title;

                    let func = document.createElement("div");
                    func.setAttribute("class", "func");
                    let elim_btn = document.createElement("p");
                    elim_btn.setAttribute("class", "elim_btn");
                    elim_btn.setAttribute("data-room-id", room_id);
                    elim_btn.setAttribute("choice", "main");
                    elim_btn.innerText = "삭제하기";
                    let report_btn = document.createElement("p");
                    report_btn.setAttribute("class", "report_btn");
                    report_btn.setAttribute("data-room-id", room_id);
                    report_btn.setAttribute("choice", "main");
                    report_btn.innerText = "신고하기";

                    // 데이터 구조
                    wrap_list.appendChild(entity);
                    entity.appendChild(profile_img);
                    entity.appendChild(infor);
                    entity.appendChild(func);

                    profile_img.appendChild(point_img);
                    infor.appendChild(other_nick);
                    infor.appendChild(post);
                    func.appendChild(elim_btn);
                    func.appendChild(report_btn);
                }
                showData();
            }
        },
        error: function() {
            console.log("실패");
        }
    })
}
showMain();

var wrap_list = document.querySelector('.wrap_list');
var switchMonthly = document.getElementById('switchMonthly');
const adopt_btn = document.querySelector('.adopt_btn');

switchMonthly.onclick = () => {
    deleteAll();
    showMain();
    adopt_btn.style.display = 'none';
    send_btn.style.display = 'none';
}

// 받기 채팅 목록
const showSub = () => {
    $.ajax({
        type: 'POST',
        url: 'http://54.180.109.140/api/chatting/',
        contentType: 'application/json',
        data: JSON.stringify({ "token": jwtToken }),
        success: function(response) {

            var length = response.sub.sub.length;

            for (var i = 0; i < length; i++) {
                const showData = () => {

                    // 데이터 읽기
                    const customN = response.sub.sub[i].customN;
                    const ownerN = response.sub.sub[i].ownerN;
                    const title = response.sub.sub[i].title;
                    const room_id = response.sub.sub[i].room_id;


                    // 데이터 넣기
                    let wrap_list = document.querySelector('.wrap_list');

                    let entity = document.createElement("div");
                    entity.setAttribute("class", "entity");

                    let profile_img = document.createElement("div");
                    profile_img.setAttribute("class", "profile_img");
                    profile_img.setAttribute("data-room-id", room_id);
                    profile_img.setAttribute("choice", "sub");
                    let point_img = document.createElement("img");
                    point_img.setAttribute("class", "image");
                    point_img.setAttribute("data-room-id", room_id);
                    point_img.setAttribute("choice", "sub");
                    point_img.src = "../img/logo.png"

                    let infor = document.createElement("div");
                    infor.setAttribute("class", "infor");
                    infor.setAttribute("data-room-id", room_id);
                    infor.setAttribute("choice", "sub");
                    let other_nick = document.createElement("p");
                    other_nick.setAttribute("class", "other_nick");
                    other_nick.setAttribute("data-room-id", room_id);
                    other_nick.setAttribute("choice", "sub");
                    other_nick.innerText = ownerN;
                    let post = document.createElement("p");
                    post.setAttribute("class", "post");
                    post.setAttribute("data-room-id", room_id);
                    post.setAttribute("choice", "sub");
                    post.innerText = title;

                    let func = document.createElement("div");
                    func.setAttribute("class", "func");
                    let elim_btn = document.createElement("p");
                    elim_btn.setAttribute("class", "elim_btn");
                    elim_btn.setAttribute("data-room-id", room_id);
                    elim_btn.setAttribute("choice", "sub");
                    elim_btn.innerText = "삭제하기";
                    let report_btn = document.createElement("p");
                    report_btn.setAttribute("class", "report_btn");
                    report_btn.setAttribute("data-room-id", room_id);
                    report_btn.setAttribute("choice", "sub");
                    report_btn.innerText = "신고하기";

                    // 데이터 구조
                    wrap_list.appendChild(entity);
                    entity.appendChild(profile_img);
                    entity.appendChild(infor);
                    entity.appendChild(func);

                    profile_img.appendChild(point_img);
                    infor.appendChild(other_nick);
                    infor.appendChild(post);
                    func.appendChild(elim_btn);
                    func.appendChild(report_btn);
                }
                showData();
            }
        },
        error: function() {
            console.log("실패");
        }
    })
}

var switchYearly = document.getElementById('switchYearly');
switchYearly.onclick = () => {
    deleteAll();
    showSub();
    send_btn.style.display = 'none';
}

const emoticon_btn = document.querySelector('.emoticon_btn');

emoticon_btn.onclick = () => {
    var chat_area = document.querySelector('.chat_area');
    var input_area = document.querySelector('.input_area');
    var emoticon_area = document.querySelector('.emoticon_area');
    var text_content = document.querySelector('.text_content');

    var computedStyle = window.getComputedStyle(emoticon_area);
    var displayValue = computedStyle.getPropertyValue("display");

    if (displayValue === 'flex') {
        emoticon_area.style.display = 'none';
        text_content.style.display = 'block';
        chat_area.classList.remove('checked');
        input_area.classList.remove('checked');
        try {
            let checked = document.querySelector('.emoticon.checked');
            checked.classList.remove('checked');
        } catch {}
    } else {
        emoticon_area.style.display = 'flex';
        text_content.style.display = 'none';
        chat_area.classList.add('checked');
        input_area.classList.add('checked');
    }
}

document.querySelector('.emoticon_area').addEventListener('click', function(event) {
    if (event.target.classList.contains('emoticon')) {
        try {
            let checked = document.querySelector('.emoticon.checked');
            checked.classList.remove('checked');
        } catch {}
        event.target.classList.add('checked');
    }
});

// 채팅 부분

const my_id = sessionStorage.getItem("user_id");


$(document).ready(function() {
    var chatSocket = new WebSocket(
        'ws://' + '54.180.109.140' + '/ws/chat/');

    console.log(chatSocket)

    chatSocket.onopen = function(event) {
        // 웹소켓 연결이 확립되면 여기서 메시지를 보내거나 다른 동작을 처리할 수 있습니다.

        // 예시: 메시지 보내기

        var message = "Hello, WebSocket!";
        chatSocket.send(message);
        console.log(message);


    };


    chatSocket.onerror = function(event) { 
        console.log(event);

    }
    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var content = data['content'];
        var user_id = data['user_id'];
        // var room_id = data['room_id']
        console.log(data['content'])
        console.log(roomId)
        console.log(user_id)
        if (data['user_id'] === my_id) {
            var chat_area = document.querySelector('.chat_area');
            let my_chat = document.createElement("div");
            my_chat.setAttribute("class", "my_chat");

            if (content.substring(content.lastIndexOf(".") + 1) === 'png') {
                var my_p = document.createElement("img");
                my_p.src = content;
            } else {
                var my_p = document.createElement("p");
                my_p.innerHTML = content;
            }

            chat_area.appendChild(my_chat);
            my_chat.appendChild(my_p);

            $.ajax({
                url: 'http://54.180.109.140/api/chatting/create/chat/', //request 보낼 서버의 경로
                type: 'post', // 메소드(get, post, put 등)
                data: JSON.stringify({
                    "content": content,
                    "user_id": my_id,
                    "room_id": roomId
                }), //보낼 데이터
                success: function(data) {
                    //서버로부터 정상적으로 응답이 왔을 때 실행
                },
                error: function(xhr, textStatus, thrownError) {
                    alert(
                        "Could not send URL to Django. Error: " +
                        xhr.status +
                        ": " +
                        xhr.responseText
                    );
                },
            });
        } else {
            var chat_area = document.querySelector('.chat_area');
            let other_chat = document.createElement("div");
            other_chat.setAttribute("class", "other_chat");

            if (content.substring(content.lastIndexOf(".") + 1) === 'png') {
                var other_p = document.createElement("img");
                other_p.src = content;
            } else {
                var other_p = document.createElement("p");
                other_p.innerHTML = content;
            }

            chat_area.appendChild(other_chat);
            other_chat.appendChild(other_p);
        }
    };

    chatSocket.onclose = function(e) {
        console.log(e)
        console.error('Chat socket closed unexpectedly');
    };

    // document.querySelector('#writeChat').focus();
    // document.querySelector('#writeChat').onkeyup = function(e) {
    //     if (e.keyCode === 13) { // enter, return
    //         document.querySelector('#chatGoBt').click();
    //     }
    // };

    document.querySelector('.send_btn').onclick = function(e) {


        var messageInputDom = document.querySelector('.text_content');
        // var content = messageInputDom.value;

        console.log("my_id" + my_id);
        // console.log("content" + content);
        console.log("roomId" + roomId);

        var emoticon_area = document.querySelector('.emoticon_area');
        var computedStyle = window.getComputedStyle(emoticon_area);
        var displayValue = computedStyle.getPropertyValue("display");

        var content = null;

        if (displayValue === 'flex') {
            let checked = document.querySelector('.emoticon.checked');
            content = checked.src;
        } else {
            content = messageInputDom.value;
        }


        chatSocket.send(JSON.stringify({
            "user_id": my_id,
            'content': content,
            "room_id": roomId
        }));

        messageInputDom.value = '';

    };
})

// var roomName = {
//     room_name_json
// };
// console.log(roomName)






/*

   var text_content = document.querySelector('.text_content');
   var emoticon_area = document.querySelector('.emoticon_area');
   var computedStyle = window.getComputedStyle(emoticon_area);
   var displayValue = computedStyle.getPropertyValue("display");

   var content_value = null;

   if (displayValue === 'flex') {
       let checked = document.querySelector('.emoticon.checked');
       content_value = checked.src;
   } else {
       content_value = text_content.value;

   }

   console.log(content_value);

   */

////////////////////////////////////


/*

// 버튼들

const deleteAll = () => {
    while (wrap_list.firstChild) {
        wrap_list.removeChild(wrap_list.firstChild)
    }
    var chat_area = document.querySelector('.chat_area');
    while (chat_area.firstChild) {
        chat_area.removeChild(chat_area.firstChild)
    }
    document.querySelector('.post_name').innerHTML = "게시물 제목";
    document.querySelector('.post_point').innerHTML = "";

    document.querySelector('#other_nick').innerHTML = "상대 닉네임";
    document.querySelector('.other_adop').innerHTML = "";

    document.querySelector('#my_nick').innerHTML = "나의 닉네임";
    document.querySelector('.my_adop').innerHTML = "";
}

document.querySelector('.wrap_list').addEventListener('click', function(event) {
    if (event.target.classList.contains('profile_img') || event.target.classList.contains('infor') || event.target.classList.contains('image') || event.target.classList.contains('other_nick') || event.target.classList.contains('post')) {
        // 채팅창 선택

        var chat_area = document.querySelector('.chat_area');
        while (chat_area.firstChild) {
            chat_area.removeChild(chat_area.firstChild)
        }

        var jsonLocation = "../json/chat.json";
        $.getJSON(jsonLocation, function(data) {

            const roomId = event.target.getAttribute("data-room-id");
            const choice = event.target.getAttribute("choice");


            let foundData = null;

            if (choice === "main") {
                for (const item of data.main.main) {
                    if (item.room_id == roomId) {
                        foundData = item;
                        break;
                    }
                }
            } else if (choice === "sub") {
                for (const item of data.sub.sub) {
                    if (item.room_id == roomId) {
                        foundData = item;
                        break;
                    }
                }
            }


            const showData = (foundData) => {

                const title = foundData.title;
                const point = foundData.point;
                const customN = foundData.customN;
                const ownerN = foundData.ownerN;
                const owner = foundData.owner;
                const custom = foundData.custom;

                // 정보

                document.querySelector('.post_name').innerHTML = title;
                document.querySelector('.post_point').innerHTML = point;

                document.querySelector('#other_nick').innerHTML = customN;
                document.querySelector('.other_adop').innerHTML = custom + "회";

                document.querySelector('#my_nick').innerHTML = ownerN;
                document.querySelector('.my_adop').innerHTML = owner + "회";

                // 내용
                var length = foundData.chat.length;
                for (var i = 0; i < length; i++) {
                    var chat = foundData.chat[i].fields.user;
                    var content = foundData.chat[i].fields.content;

                    if (chat === customN) {
                        let other_chat = document.createElement("div");
                        other_chat.setAttribute("class", "other_chat");
                        let other_p = document.createElement("p");
                        other_p.innerHTML = content;

                        chat_area.appendChild(other_chat);
                        other_chat.appendChild(other_p);

                    } else {
                        let my_chat = document.createElement("div");
                        my_chat.setAttribute("class", "my_chat");
                        let my_p = document.createElement("p");
                        my_p.innerHTML = content;

                        chat_area.appendChild(my_chat);
                        my_chat.appendChild(my_p);
                    }

                }

            }
            showData(foundData);
        });

    } else if (event.target.classList.contains('elim_btn')) {
        if (!confirm("삭제하시겠습니까?")) {
            alert("취소하였습니다.")
        } else {
            alert("삭제하였습니다.")
        }
    } else if (event.target.classList.contains('report_btn')) {
        if (confirm("신고하시겠습니까?")) {
            // 신고 로직
        }
    }
});


// document.addEventListener("DOMContentLoaded", function() {
//     var deleteButtons = document.querySelectorAll(".elim_btn");

//     deleteButtons.forEach(function(button) {
//         button.onclick = function() {
//             var postId = button.getAttribute("data-post-id");
//             var confirmed = confirm("게시물 #" + postId + "을(를) 삭제하시겠습니까?");

//             if (confirmed) {
//                 // 해당 게시물 삭제 로직을 여기에 작성
//             }
//         };
//     });
// });


// 내정보

var jsonLocation = "../json/chat.json";
$.getJSON(jsonLocation, function(data) {

    const showData = () => {

        // 데이터 읽기
        const nickname = data.user;

        // 데이터 넣기

        document.querySelector('.nick').innerHTML = nickname;
    }
    showData();
});


// 주기 채팅 목록
const showMain = () => {
    var jsonLocation = "../json/chat.json";
    $.getJSON(jsonLocation, function(data) {
        var length = data.main.main.length;

        for (var i = 0; i < length; i++) {
            const showData = () => {

                // 데이터 읽기
                const customN = data.main.main[i].customN;
                const title = data.main.main[i].title;
                const room_id = data.main.main[i].room_id;


                // 데이터 넣기
                let wrap_list = document.querySelector('.wrap_list');

                let entity = document.createElement("div");
                entity.setAttribute("class", "entity");

                let profile_img = document.createElement("div");
                profile_img.setAttribute("class", "profile_img");
                profile_img.setAttribute("data-room-id", room_id);
                profile_img.setAttribute("choice", "main");
                let point_img = document.createElement("img");
                point_img.setAttribute("class", "image");
                point_img.setAttribute("data-room-id", room_id);
                point_img.setAttribute("choice", "main");
                point_img.src = "../img/logo.png"

                let infor = document.createElement("div");
                infor.setAttribute("class", "infor");
                infor.setAttribute("data-room-id", room_id);
                infor.setAttribute("choice", "main");
                let other_nick = document.createElement("p");
                other_nick.setAttribute("class", "other_nick");
                other_nick.setAttribute("data-room-id", room_id);
                other_nick.setAttribute("choice", "main");
                other_nick.innerText = customN;
                let post = document.createElement("p");
                post.setAttribute("class", "post");
                post.setAttribute("data-room-id", room_id);
                post.setAttribute("choice", "main");
                post.innerText = title;

                let func = document.createElement("div");
                func.setAttribute("class", "func");
                let elim_btn = document.createElement("p");
                elim_btn.setAttribute("class", "elim_btn");
                elim_btn.setAttribute("data-room-id", room_id);
                elim_btn.setAttribute("choice", "main");
                elim_btn.innerText = "삭제하기";
                let report_btn = document.createElement("p");
                report_btn.setAttribute("class", "report_btn");
                report_btn.setAttribute("data-room-id", room_id);
                report_btn.setAttribute("choice", "main");
                report_btn.innerText = "신고하기";

                // 데이터 구조
                wrap_list.appendChild(entity);
                entity.appendChild(profile_img);
                entity.appendChild(infor);
                entity.appendChild(func);

                profile_img.appendChild(point_img);
                infor.appendChild(other_nick);
                infor.appendChild(post);
                func.appendChild(elim_btn);
                func.appendChild(report_btn);
            }
            showData();
        }
    });
}
showMain();


var wrap_list = document.querySelector('.wrap_list');
var switchMonthly = document.getElementById('switchMonthly');
const adopt_btn = document.querySelector('.adopt_btn');

switchMonthly.onclick = () => {
    deleteAll();
    showMain();
    adopt_btn.style.display = 'none';

}

// 받기 채팅 목록

const showSub = () => {
    var jsonLocation = "../json/chat.json";
    $.getJSON(jsonLocation, function(data) {
        var length = data.main.main.length;

        for (var i = 0; i < length; i++) {
            const showData = () => {

                // 데이터 읽기
                const customN = data.sub.sub[i].customN;
                const title = data.sub.sub[i].title;
                const room_id = data.sub.sub[i].room_id;


                // 데이터 넣기
                let wrap_list = document.querySelector('.wrap_list');

                let entity = document.createElement("div");
                entity.setAttribute("class", "entity");

                let profile_img = document.createElement("div");
                profile_img.setAttribute("class", "profile_img");
                profile_img.setAttribute("data-room-id", room_id);
                profile_img.setAttribute("choice", "sub");
                let point_img = document.createElement("img");
                point_img.setAttribute("class", "image");
                point_img.setAttribute("data-room-id", room_id);
                point_img.setAttribute("choice", "sub");
                point_img.src = "../img/logo.png"

                let infor = document.createElement("div");
                infor.setAttribute("class", "infor");
                infor.setAttribute("data-room-id", room_id);
                infor.setAttribute("choice", "sub");
                let other_nick = document.createElement("p");
                other_nick.setAttribute("class", "other_nick");
                other_nick.setAttribute("data-room-id", room_id);
                other_nick.setAttribute("choice", "sub");
                other_nick.innerText = customN;
                let post = document.createElement("p");
                post.setAttribute("class", "post");
                post.setAttribute("data-room-id", room_id);
                post.setAttribute("choice", "sub");
                post.innerText = title;

                let func = document.createElement("div");
                func.setAttribute("class", "func");
                let elim_btn = document.createElement("p");
                elim_btn.setAttribute("class", "elim_btn");
                elim_btn.setAttribute("data-room-id", room_id);
                elim_btn.setAttribute("choice", "sub");
                elim_btn.innerText = "삭제하기";
                let report_btn = document.createElement("p");
                report_btn.setAttribute("class", "report_btn");
                report_btn.setAttribute("data-room-id", room_id);
                report_btn.setAttribute("choice", "sub");
                report_btn.innerText = "신고하기";

                // 데이터 구조
                wrap_list.appendChild(entity);
                entity.appendChild(profile_img);
                entity.appendChild(infor);
                entity.appendChild(func);

                profile_img.appendChild(point_img);
                infor.appendChild(other_nick);
                infor.appendChild(post);
                func.appendChild(elim_btn);
                func.appendChild(report_btn);
            }
            showData();
        }
    });
}

var switchYearly = document.getElementById('switchYearly');
switchYearly.onclick = () => {
    deleteAll();
    showSub();
    adopt_btn.style.display = 'block';
}

*/