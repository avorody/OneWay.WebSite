
    // editing 70-> 50 (line 50)
    
    var database, selectLat , selectLng ,passRef,tripsRef,value , tripValue , tripKeys , keys, myVar ,index,li_list =[] , option_keys_list =[];
    var countValue , countKeys , tripCount = 0,tripList =[];
    function addDriver(){
        
        document.getElementById("AddDiv").style.display="block";
        document.getElementById("map").innerHTML="";
        document.getElementById("cont").style.display="none";
        document.getElementById("btnAdd").style.display="block";
        document.getElementById("content").style.display="none";
        document.getElementById("btn1").style.border="2px solid black";
        document.getElementById("btn1").style.borderRadius="25px";
        document.getElementById("btn2").style.border="none";
        document.getElementById("btn3").style.border="none";
        //document.getElementById("accept").disabled=false;
        //document.getElementById("reject").disabled=false;
    }
    
    function traking(){
        document.getElementById("content").style.display="inline-flex";
        document.getElementById("map").innerHTML="";
        document.getElementById("AddDiv").style.display="none"; 
        document.getElementById("cont").style.display="none";
        document.getElementById("btn1").style.border="none";
        document.getElementById("btn3").style.border="none";
         document.getElementById("btn2").style.border="2px solid black";
        document.getElementById("btn2").style.borderRadius="25px"; 
        //document.getElementById("accept").disabled=false;
        //document.getElementById("reject").disabled=false;
    }
    
    function request(){
        window.clearInterval(myVar);
         document.getElementById("btn3").style.backgroundImage="url('images/request.png')";
        document.getElementById("cont").style.display="inline-flex";
        document.getElementById("btnAdd").style.display="none";
        document.getElementById("AddDiv").style.display="none"; 
        document.getElementById("content").style.display="none";
        //document.getElementById("accept").disabled=true;
        //document.getElementById("reject").disabled=true;
        document.getElementById("btn3").style.border="2px solid black";
        document.getElementById("btn3").style.borderRadius="25px";
        document.getElementById("btn2").style.border="none";
        document.getElementById("btn1").style.border="none";
    }
    
    function got(data){
        
        var x = document.querySelectorAll(".listen");
        for(j=0;j<x.length ; j++){
            x[j].remove();
            li_list.pop();
        }
         value = data.val();
        if(value == null){
            document.getElementById("requestList").style.backgroundImage="url('images/emptyRequest.png')";
            console.log("no request found");
        }
        else{
           document.getElementById("requestList").style.backgroundImage="url('')"; 
         keys = Object.keys(value);
        //console.log(keys);
        for(var i=0;i<keys.length;i++){
            var k = keys[i];
                li_list.push(value[k]);
                var name = value[k].name;
                var li = document.createElement('li');
                li.textContent = name;
                li.setAttribute("class","listen");
                document.getElementById("list").appendChild(li);
        }
        if(document.getElementById("cont").style.display == "none"){myVar = window.setInterval(myTimer ,500);}
        var elements = document.querySelectorAll("#list li"),innerArray =[];
        
        for(var i =0;i<elements.length;i++){
            innerArray.push(elements[i].innerHTML);
        } 
        for(s=0;s<elements.length;s++){
            elements[s].onclick = function myMap(){
                document.getElementById("trips").disabled = false;
                
               index = innerArray.indexOf(this.innerHTML);
                //console.log(index);
                //document.getElementById("map").innerHTML = "name : " +li_list[index].name + "<br>" + "date : " + li_list[index].date + "<br>" + "tel : " + li_list[index].telephone; 
                var myCenter = new google.maps.LatLng(li_list[index].lat,li_list[index].long);
                var mapCanvas = document.getElementById("map");
                var mapOptions = {center: myCenter, zoom: 10};
                var map = new google.maps.Map(mapCanvas, mapOptions);
                var marker = new google.maps.Marker({position:myCenter});
                marker.setMap(map);
                google.maps.event.addListener(marker,'click',function() {
                        var infowindow = new google.maps.InfoWindow({
                                content: "name : " +li_list[index].name + "<br>" + "date : " + li_list[index].date + "<br>" + "tel : " + li_list[index].telephone
                        });
                        infowindow.open(map,marker);
                });
            }
        }
        }
    }


function Showtracks(){
     var tripPath ="Drivers/"+option_keys_list[document.getElementById("trips").selectedIndex];
    var tripref = firebase.database().ref(tripPath);
    tripref.on('value',gotTrack,errtrack);
}

function gotTrack(){
    var tripref_val = data.val();
    if(tripref_val == null){console.log("this trip is empty");}
    else{
        var tripref_keys = Object.keys(tripref_val);
        /*for(var i =0 ;i<tripref_keys.length;i++){
            var  k = tripref_keys[i];
            if(k != "name" && k != "email" && k != "org" && k != "password" && k  != "telephone" && k  != "trip"){
                var token ={
                    location{lat: tripref_val[k].lat ,lng:tripref_val[k].long}
                }
                tripList.push(token);  
            }*/
    }
}
function errtrack(){
    
}

function requestAccept(){
        var selectionData = li_list[index];
        var path = "passengers/"+keys[index];
        var oldData = firebase.database().ref(path);
        oldData.remove();
        //
        var newPath ="Drivers/"+option_keys_list[document.getElementById("trips").selectedIndex];
        var newData = firebase.database().ref(newPath);
        newData.push(selectionData);   
        document.getElementById("map").innerHTML = "";
    }

function requestReject(){
    var selectionData = li_list[index];
        var path = "passengers/"+keys[index];
        var oldData = firebase.database().ref(path);
        oldData.remove();
    document.getElementById("map").innerHTML="";
}

var time = 0;
function myTimer(){
        if(time == 0){
            document.getElementById("btn3").style.backgroundImage="url('images/request2.png')";
            time = 1;
            
        }
        else{
            document.getElementById("btn3").style.backgroundImage="url('images/request.png')";
            time = 0;
            
        }
        
        
    }
    
    function err(data){
     
    }
    
function gotData2(data){
    var y = document.getElementById("trips");
    var z = document.getElementById("tripsTrack");
    while (z.length > 0) {
        y.remove(y.length-1);
        z.remove(z.length-1);
        option_keys_list.pop();
    }
    tripValue = data.val();
    if(tripValue == null){console.log("no trips found");}
    else{
    tripKeys = Object.keys(tripValue);
    for(var i =0; i<tripKeys.length;i++){
            var k = tripKeys[i];
            var tripsPath = "Drivers/"+tripKeys[i];
            var tripsRef = firebase.database().ref(tripsPath);
            tripsRef.on('value',gotData3,errData3);
            var num = tripValue[k].trip;
            console.log(tripCount);
            if(tripCount < 25){
                option_keys_list.push(tripKeys[i]);
                var option1 = document.createElement("option");
                option1.textContent =num ;
                option1.value =num ;
                document.getElementById("trips").appendChild(option1);
            }
            var option2 = document.createElement("option");
            option2.textContent = num ;
            option2.value = num ;
            document.getElementById("tripsTrack").appendChild(option2);
        }
    }
    
    
}
function errData2(data){
        
    }

function gotData3(data){
    tripCount = 0;
    countValue = data.val();
    if(countValue == null){}
    else{
        countKeys = Object.keys(countValue);
        
        for(var i =0 ;i<countKeys.length;i++){
            if(countKeys[i] != "name" && countKeys[i] != "email" && countKeys[i] != "org" && countKeys[i] != "password" && countKeys[i] != "telephone" && countKeys[i] != "trip"){
                tripCount+=1;
                
            }
            
        }
        //console.log(tripCount);
    }
}

function errData3(data){
    
}
    
    function check(){
            database = firebase.database();
            name = document.getElementById("name").value;
            pass = document.getElementById("pass").value;
            email = document.getElementById("email").value;
            tel = document.getElementById("tel").value;
        
        if(name == ""){
            document.getElementById("name").style.borderBottomColor="red";
        }
        if(pass== ""){
            document.getElementById("pass").style.borderBottomColor="red";
        }
        if(email== ""){
            document.getElementById("email").style.borderBottomColor="red";
        }
        if(tel== ""){
            document.getElementById("tel").style.borderBottomColor="red";
        }
        
        if(name != "" && pass != "" && email != "" && tel != "" ) {
        var tripValue = "trip "+(tripKeys.length+1);
        var ref = database.ref('Drivers');
            var driver = {
                name : name,
                email : email,
                password : pass,
                telephone : tel,
                trip : tripValue,
                passengers: 0,
                org : 'org'
               }
            ref.push(driver);
            
    document.getElementById("name").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
        }

    }
    
    function text_check(){
        document.getElementById("name").style.borderBottomColor="white";
    }
    function pass_check(){
        document.getElementById("pass").style.borderBottomColor="white";
    }
    function email_check(){
        document.getElementById("email").style.borderBottomColor="white";
    }
    function tel_check(){
        document.getElementById("tel").style.borderBottomColor="white";
    }
    function date_check(){
        document.getElementById("date").style.borderBottomColor="white";
    }
    
    function myFunction() {
            // Initialize Firebase
            var config = {
            apiKey: "AIzaSyDWVlxZLVTzhyDRwCWkgcW0cKYHqLrSakM",
            authDomain: "turnkey-lacing-204014.firebaseapp.com",
            databaseURL: "https://turnkey-lacing-204014.firebaseio.com",
            projectId: "turnkey-lacing-204014",
            storageBucket: "",
            messagingSenderId: "779022900904"
            };
            firebase.initializeApp(config);
            console.log(firebase);
            
            database = firebase.database();
            passRef = database.ref('passengers');
            passRef.on('value',got,err);
            
            tripsRef = database.ref('Drivers');
            tripsRef.on('value',gotData2,errData2);
            
        document.getElementById("AddDiv").style.display="block";
            document.getElementById("btn1").style.border="2px solid black";
            document.getElementById("btn1").style.borderRadius="25px";
            document.getElementById("btnAdd").style.display="block";
         
    }
    
    function home(){window.location.href="index.html";}
    
    
    
