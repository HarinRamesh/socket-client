let connect = $("#connect");
let send = $("#send");
let sent_btn = $("#sent_btn")
let socket;

sent_btn.attr("disabled", true);

connect.submit(function(event){
    sent_btn.attr("disabled", false);
    event.preventDefault()

    let ip = $("#ip").val();
    let endpoint = 'ws://'+ip
    socket = new WebSocket(endpoint);

    socket.onopen = function(e){
        console.log("open",e);
    }
    socket.onmessage = function(e){
        console.log("message",e);
        $("#on-message").html(e.data)
    }
    socket.onerror = function(e){
        console.log("error",e);
    }
    socket.onclose = function(e){
        console.log("close",e);
    }
})

send.submit(function(event){
    event.preventDefault()
    msgInput = $("#msg")
    sendToServer(msgInput.val())
})

function sendToServer(message){
    console.log(message)
    socket.send(JSON.stringify(JSON.parse(message)))
}

