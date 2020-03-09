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
        $("#status").html("Status: Connected")
        console.log("open",e);
    }
    socket.onmessage = function(e){
        console.log("message",JSON.parse(e.data));
        $("#on-message").html(JSON.stringify(JSON.parse(e.data), undefined, 2))
    }
    socket.onerror = function(e){
        $("#status").html("Status: Something went wrong")
        console.log("error",JSON.stringify(e, undefined, 2));
    }
    socket.onclose = function(e){
        console.log("close",JSON.stringify(e));
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