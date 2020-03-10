let connect = $("#connect");
let send = $("#send");
let sent_btn = $("#sent_btn")
let socket;
let connectionFlag = 0

sent_btn.attr("disabled", true);

connect.submit(function(event){
    sent_btn.attr("disabled", false);
    event.preventDefault()
    let ip = $("#ip").val();

    if (connectionFlag) {
        socket.close()
    }
    if (connectionFlag === 0){
        $(".loader").css("display","block")
        let endpoint = 'ws://'+ip
        socket = new WebSocket(endpoint);
        $('.connect-btn').prop('disabled', true);
        socket.onopen = function(e){
            connectionFlag = 1
            $("#status").css("color","black")
            $("#status").html("Status: Connected")
            $(".connect-btn").html("Disconnect")
            $(".connect-btn").css("background-color","red")
            $('.connect-btn').prop('disabled', false);
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
            connectionFlag = 0
            $(".connect-btn").html("Connect")
            $(".connect-btn").css("background-color","#007bff")
            $('.connect-btn').prop('disabled', false);
            console.log("close",e);
        }
    }
    if (ip.trim() == ""){
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