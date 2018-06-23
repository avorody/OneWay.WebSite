    var database, selectLat , selectLng ,passRef,tripsRef,value , tripValue , tripKeys , keys, myVar ,index,li_list =[] , option_keys_list =[],list =[];
    var countValue , countKeys , tripCount = 0,tripList =[];
    var currentLat,currentLng,tripIndex,marker,pointsRemove =0,innerArray =[],result;
    
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
            
            // intilize the database
            database = firebase.database();
            
            // get the request
            passRef = database.ref('passengers');
            passRef.on('value',got,err);
            
            // get the trips
            tripsRef = database.ref('Drivers');
            tripsRef.on('value',gotData2,errData2);
    
            //un abel the two buttons untill select a trip
            document.getElementById('passDelete').disabled = true;
            document.getElementById('tripDelete').disabled = true;
            document.getElementById("passDelete").style.backgroundColor ="#d0d1d5";
            document.getElementById("tripDelete").style.backgroundColor ="#d0d1d5";
    }

    //set action to the show button
    function showContent(){
        // get the selected route
        tripIndex = document.getElementById("trips").selectedIndex;
        var routePath = "Drivers/" + option_keys_list[tripIndex];
        var routeRef = database.ref(routePath);
        routeRef.on('value',gotData4,errData4);
        document.getElementById("info").innerHTML=tripValue[tripKeys[tripIndex]].name+"<br>tel : "+tripValue[tripKeys[tripIndex]].telephone;
        document.getElementById('driverImage').setAttribute('src',tripValue[tripKeys[tripIndex]].imgUpload);
        //check there is no passengers
        if(tripList.length == 0){
            document.getElementById("passengers").style.backgroundImage="url('images/emptypassenger.png')";
            document.getElementById("passengers").style.backgroundRepeat="no-repeat";
            document.getElementById("passengers").style.backgroundPosition="center";
        }
        
        document.getElementById('tripDelete').disabled = false;
        document.getElementById("tripDelete").style.backgroundColor ="#0c9fc6";
        
        
    }
    

//delete a trip
function deleteTrip(){
    var path = "Drivers/" + option_keys_list[tripIndex];
    var oldData = firebase.database().ref(path);
        oldData.remove();
    
    //show the message to confirm
    document.getElementById("sh").innerHTML = "Trip successfully Deleted ";
    document.getElementById('sh').style.display="block";
    document.getElementById('blur').style.display="block";
    setTimeout("hide()", 2000);
}

//hide the confirm message
function hide(){
    document.getElementById("sh").innerHTML = "";
    document.getElementById('sh').style.display="none";
    document.getElementById('blur').style.display="none";
    document.getElementById("info").innerHTML="";
    //document.getElementById("passenger").innerHTML="";
    
}

//delete a passenger
function deletePassenger(){
    console.log(routeKeys[index]);
    var path = "Drivers/" + option_keys_list[tripIndex] +"/"+ routeKeys[index];
    var oldData = firebase.database().ref(path);
        oldData.remove();
    document.getElementById("sh").innerHTML = "passenger successfully Deleted ";
    document.getElementById('sh').style.display="block";
    document.getElementById('blur').style.display="block";
    setTimeout("hide()", 2000);
}

// only check there is request or not
function got(data){
        value = data.val();
        if(value == null){
        }
        else{ 
        myVar = window.setInterval(myTimer ,500);
        }
    }

function err(data){
     console.log(Error);
    }

// set the alert show
var time = 0;
function myTimer(){
        if(time == 0){
            document.getElementById("tab3").style.backgroundImage="url('images/request2.png')";
            time = 1;   
        }
        else{
            document.getElementById("tab3").style.backgroundImage="url('images/request.png')";
            time = 0; 
        }  
    }

function gotData2(data){
    var z = document.getElementById("trips");
    while (z.length > 0) {
        z.remove(z.length-1);
        option_keys_list.pop();
    }
    tripValue = data.val();
    if(tripValue == null){console.log("no trips found");}
    else{
    tripKeys = Object.keys(tripValue);
    for(var i =0; i<tripKeys.length;i++){
            var k = tripKeys[i];
            var num = tripValue[k].trip;
            option_keys_list.push(tripKeys[i]);
            var option2 = document.createElement("option");
            option2.textContent = num ;
            option2.value = num ;
            document.getElementById("trips").appendChild(option2);
        }
    }
    
    
}
function errData2(data){
     console.log(Error);        
    }

//get the route data
function gotData4(data){
    for(var i=tripList.length; i> 0 ;i--){
        tripList.pop(); 
    }
    var x = document.querySelectorAll(".listen");
    for(j=0;j<x.length ; j++){
        x[j].remove();
        innerArray.pop();
    }
    var routeValue = data.val();
    if(routeValue == null){}
    else{
        routeKeys = Object.keys(routeValue);
        
        for(var i =0 ;i<routeKeys.length;i++){
            if(routeKeys[i] != "name" && routeKeys[i] != "email" && routeKeys[i] != "org" && routeKeys[i] != "password" && routeKeys[i] != "telephone" && routeKeys[i] != "trip" && routeKeys[i]!="lat" && routeKeys[i]!="long" && routeKeys[i]!="imgUpload"){
                tripList.push(routeValue[routeKeys[i]]);
                var li = document.createElement('li');
                li.textContent = routeValue[routeKeys[i]].name;
                li.setAttribute("class","listen");
                document.getElementById("passengers").appendChild(li);
            }
        }
        elements = document.querySelectorAll("#passengers li");
        
        for(var i =0;i<elements.length;i++){
            innerArray.push(elements[i].innerHTML);
        } 
        
        for(s=0;s<elements.length;s++){
            elements[s].onclick = function(){ 
                document.getElementById('passDelete').disabled = true;
                index = innerArray.indexOf(this.innerHTML);
                document.getElementById('passDelete').disabled = false;
                document.getElementById("passDelete").style.backgroundColor ="#0c9fc6";
            }
    }
}
}
function errData4(data){
    console.log(Error);
}


