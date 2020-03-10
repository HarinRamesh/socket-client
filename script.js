let connect = $("#connect");
let send = $("#send");
let sent_btn = $("#sent_btn")
let socket;

sent_btn.attr("disabled", true);

connect.submit(function(event){
    sent_btn.attr("disabled", false);
    event.preventDefault()
    let ip = $("#ip").val();
    if (ip.trim() != ""){
        $(".loader").css("display","block")
        let endpoint = 'ws://'+ip
        socket = new WebSocket(endpoint);

        socket.onopen = function(e){
            $("#status").css("color","black")
            $("#status").html("Status: Connected")
            $(".loader").css("display","none")
            console.log("open",e);
        }
        socket.onmessage = function(e){
            console.log("message",JSON.parse(e.data));
            $("#on-message").html(JSON.stringify(JSON.parse(e.data), undefined, 2))
        }
        socket.onerror = function(e){
            $(".loader").css("display","none")
            $("#status").css("color","red")
            $("#status").html("Status: Something went wrong,<br/> check the console.")
            console.log("error",e);
        }
        socket.onclose = function(e){
            if(e.wasClean){
                $("#status").html("Status: Connection closed")
            }
            console.log("close",e);
        }
    }else{
        $("#status").css("color","red")
        $("#status").html("Status: End point is empty")
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