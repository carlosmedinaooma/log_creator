$(document).ready(function(){
    var socket = io.connect('http://localhost:8124/');

    socket.on('total_today', function(data){
        $('#notes1').html('<li> Total calls today - ' + data + '</li>')
    })
    socket.on('total_60', function(data){
        $('#notes2').html('<li> Total calls > 60 seconds ' + data + '</li>')
    })
    socket.on('total_90', function(data){
        $('#notes3').html('<li> Total calls > 90 seconds ' + data + '</li>')
    })

    socket.on('total_adt_60', function(data){
        $('#notes4').html('<li> Total ADT calls > 60 seconds ' + data + '</li>')
    })

    socket.on('total_comcast_60', function(data){
        $('#notes5').html('<li> Total Comcast calls > 60 seconds ' + data + '</li>')
    })

    socket.on('total_tv_60', function(data){
        $('#notes6').html('<li> Total Direct TV calls > 60 seconds ' + data + '</li>')
    })
     socket.on('total_now_today', function(data){
        $('#notes7').html('<li> Total calls today now ' + data + '</li>')
    })
      socket.on('total_yesterday', function(data){
        $('#notes8').html('<li> Total calls yesterday ' + data + '</li>')
    })
       socket.on('total_week', function(data){
        $('#notes9').html('<li> Total calls one week before ' + data + '</li>')
    })

})