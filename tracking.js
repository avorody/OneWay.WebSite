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
            storageBucket: "turnkey-lacing-204014.appspot.com",
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
    
    }
//set the map
function myMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 30.041079,lng: 31.233703}
        });
        directionsDisplay.setMap(map);
    
    //set action to the show button
    document.getElementById("show").addEventListener('click',function(){
        
        if(pointsRemove !=0){
                    marker.setMap(null);
            }
        //empty the list of waypoints
        for(var i=list.length ; i>0;i--){
            list.pop();
        }
        
        // get the selected route
        tripIndex = document.getElementById("trips").selectedIndex;
        var routePath = "Drivers/" + option_keys_list[tripIndex];
        jasonKey = routePath;
        var routeRef = database.ref(routePath);
        routeRef.on('value',gotData4,errData4);
        //check if no waypoints
        if(tripList.length == 0){
            document.getElementById("passengers").style.backgroundImage="url('images/emptypassenger.png')";
            document.getElementById("passengers").style.backgroundRepeat="no-repeat";
            document.getElementById("passengers").style.backgroundPosition="center";
        }else{
            //get the points lat and lng and pass it to waypoints in direction service
            for(var i=0 ; i< tripList.length;i++){
                var item = {
                    location:{lat: tripList[i].lat, lng: tripList[i].long}
                }
                list.push(item);
            }
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        }
        document.getElementById("info").innerHTML=tripValue[tripKeys[tripIndex]].name+"<br>tel : "+tripValue[tripKeys[tripIndex]].telephone;
        
        document.getElementById('driverImage').setAttribute('src',tripValue[tripKeys[tripIndex]].imgUpload);
        
    });
    
        document.getElementById('list').addEventListener('click', function() {
            
            //to check the map is empty or not
            if(pointsRemove !=0){
                    marker.setMap(null);
            }
                    var myCenter = new google.maps.LatLng(tripList[index].lat,tripList[index].long);
                    //var myCenter = new google.maps.LatLng(result.routes[0].legs[0].lat,result.routes[0].legs[0].lng);
                    marker = new google.maps.Marker({
                        position:myCenter,
                        animation: google.maps.Animation.BOUNCE
                    });
                    marker.setMap(map);
                    //add amrker info
                    google.maps.event.addListener(marker,'click',function() {
                                var infowindow = new google.maps.InfoWindow({
                                        content: "name : " +tripList[index].name + "<br>" + "date : " + tripList[index].date + "<br>" + "tel : " + tripList[index].telephone
                                });
                                infowindow.open(map,marker);
                        });
                    pointsRemove =1;
        });
    
        /*if(pointsRemove !=0){
                    marker.setMap(null);
            }
        
        //get the current locatioى
        var locationPath = "Drivers/" + option_keys_list[tripIndex];
        var location=database.ref(locationPath);
        location.on('value',gotData5,errData5);*/
}


// use direction route service in map API
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: {lat: 30.0444, lng: 31.2357},
          destination: {lat: 30.0444, lng: 31.2357},
          waypoints:list,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
              console.log(response);
              
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
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
                document.getElementById("list").appendChild(li);
            }
        }
        elements = document.querySelectorAll("#list li");
        
        for(var i =0;i<elements.length;i++){
            innerArray.push(elements[i].innerHTML);
        } 
        for(s=0;s<elements.length;s++){
            elements[s].onclick = function(){ 
               index = innerArray.indexOf(this.innerHTML);
            }
    }
}
}
function errData4(data){
    console.log(Error);
}

//get the current location
function gotData5(data){
    var locationValue = data.val();
    if(locationValue == null){console.log("wrong trip choise");}
    else{
        var locationKeys = Object.keys(locationValue);
        currentLat=locationValue[locationKeys[tripIndex]].lat;
        currentLng=locationValue[locationKeys[tripIndex]].long;
    }
}

function errData5(data){
    console.log(Error);
}

