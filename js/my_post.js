var jsonLocation = "../json/my_post.json";
$.getJSON(jsonLocation, function(data) {
    var length = data.length;

    for (var i = 0; i < length; i++) {
        const showData = () => {

            // 데이터 읽기
            const title = data[i].fields.title;
            const content = data[i].fields.content;
            const point = data[i].fields.point;
            const numChat = data[i].fields.numChat;

            // 데이터 넣기
            let wrap_post = document.querySelector('.wrap_post');

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
            wrap_post.appendChild(post);
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

        }
        showData();

    }

});

//////////////////////////////////

// $.ajax({
//     type: 'GET',
//     url: 'https://{}/api/post/my_post/',
//     success: function(data) {
//         var length = data.length;
//         console.log(length);

//         for (var i = 0; i < length; i++) {
//             const showData = () => {

//                 // 데이터 읽기
//                 const title = data[i].title;
//                 const content = data[i].content;
//                 const point = data[i].point;
//                 const numChat = data[i].numChat;

//                 // 데이터 넣기
//                 let wrap_post = document.querySelector('.wrap_post');

//                 let post = document.createElement("div");
//                 post.setAttribute("class", "post");

//                 let post_title = document.createElement("div");
//                 post_title.setAttribute("class", "post_title");

//                 let post_name = document.createElement("div");
//                 post_name.setAttribute("class", "post_name");
//                 let post_name_p = document.createElement("p");
//                 post_name_p.innerHTML = title;

//                 let post_point = document.createElement("div");
//                 post_point.setAttribute("class", "post_point");
//                 let point_img = document.createElement("img");
//                 point_img.src = "../img/stamp.png"
//                 let post_point_p = document.createElement("p");
//                 post_point_p.innerHTML = point + "p";

//                 let post_chat = document.createElement("div");
//                 post_chat.setAttribute("class", "post_chat");
//                 let chat_img = document.createElement("img");
//                 chat_img.src = "../img/chat.png"
//                 let post_chat_p = document.createElement("p");
//                 post_chat_p.innerHTML = numChat + "명";

//                 let post_content = document.createElement("div");
//                 post_content.setAttribute("class", "post_content");

//                 let post_content_p = document.createElement("p");
//                 post_content_p.innerHTML = content;

//                 // 구조
//                 wrap_post.appendChild(post);
//                 post.appendChild(post_title);
//                 post.appendChild(post_content);

//                 post_title.appendChild(post_name);
//                 post_name.appendChild(post_name_p);

//                 post_title.appendChild(post_point);
//                 post_point.appendChild(point_img);
//                 post_point.appendChild(post_point_p);

//                 post_title.appendChild(post_chat);
//                 post_chat.appendChild(chat_img);
//                 post_chat.appendChild(post_chat_p);

//                 post_content.appendChild(post_content_p);

//             }
//             showData();

//         }
//     },
//     error: function() {
//         console.log("실패");
//     }
// })