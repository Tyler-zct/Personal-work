var txt = document.getElementById('txt');
var app = document.getElementById('app');

// 输入键盘事件
function keyupHandle(e) {
    if (e.keyCode == 13) {
        sendMsg(txt.value);
    }
}

/*向图灵123的API接口发送消息
消息内容 {msg}
*/

function sendMsg(Msg) {
    // XMLHttpRequest()表示向远程服务器发送一个请求
    // 声明一个XMLHttpRequest()对象 / 创建一个请求
    var xhr = new XMLHttpRequest();

    // 存储数据
    xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // 将返回的数据转换为
                var res = JSON.parse(xhr.response);
                var strHtml = '';
                if (res.code == 100000) {
                    strHtml = `<button class="btn btn-success">提问:${txt.value}</button><br>
                                <button class="btn btn-info">回答:${res.text}</button><hr>`;
                } else if (res.code == 200000) {
                    strHtml = `
                        <button class="btn btn-success">提问:${txt.value}</button><br>
                        <button class="btn btn-info">回答:
                            <a target="_blank" href='${res.url}'>${res.text}</a>
                        </button>`;
                } else if (res.code == 302000) {
                    var arrCookBooks = res.list;
                    var strList = '';
                    arrCookBooks.forEach(function(item) {
                        strList += `<a class="link" href="${item.detailurl}" target="_blank">${item.text}</a>`;
                    });
                    strHtml = `
                        <button class="btn btn-success">提问:${txt.value}</button><br>
                        <button class="btn btn-info">回答:${strList}</button><hr>`;
                } else {
                    strHtml = `
                        <button class="btn btn-success">提问:${txt.value}</button><br>
                        <button class="btn btn-info">回答:不好意思,没有您要找的东西!</button>
                    <hr>`
                }
                txt.value = '';
                app.innerHTML += strHtml;
            }
        }
        // 处理请求
    xhr.open('get', 'http://www.tuling123.com/openapi/api?key=571b8f25a41241fb9bc605cbaf2971cf&info=' + Msg);
    xhr.send();
}