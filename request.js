
    // editing 70-> 50 (line 50)
    
    var database, selectLat , selectLng ,passRef,tripsRef,value , tripValue , tripKeys , keys ,index,li_list =[] , option_keys_list =[];
    var passengerCountValue , passengerCountKeys , tripCount = 0,tripList =[],elements,innerArray =[],pointsRemove =0,marker,list =[];
    var currentLat , currentLong;
    var jasonKey;
    var geocoded_waypoints , request , routes,status;
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
            
            //set the data base of firebase
            database = firebase.database();
    
            //passenger 
            passRef = database.ref('passengers');
            passRef.on('value',got,err);
            
            //trips
            tripsRef = database.ref('Drivers');
            tripsRef.on('value',gotData2,errData2);
    
            // disenabling accept & reject buttons
            document.getElementById("accept").disabled = true;
            document.getElementById("reject").disabled = true;
            document.getElementById("accept").style.backgroundColor ="#d0d1d5";
            document.getElementById("reject").style.backgroundColor ="#d0d1d5";
    }

function myMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 30.041079,lng: 31.233703}
        });
        directionsDisplay.setMap(map);
    
        //set an action to sected request
        document.getElementById('list').addEventListener('click', function() {
            // enabling accept & reject buttons
            document.getElementById("accept").disabled = false;
            document.getElementById("reject").disabled = false;
            document.getElementById("accept").style.backgroundColor ="#0c9fc6";
            document.getElementById("reject").style.backgroundColor ="#0c9fc6";
            
            //to check the map is empty or not
            if(pointsRemove !=0){
                    marker.setMap(null);
            }
                    var myCenter = new google.maps.LatLng(li_list[index].lat,li_list[index].long);
                    // take the position to add to the path
                    currentLat = li_list[index].lat;
                    currentLong = li_list[index].long;
            
                    //to make the point in the center of the map
                    map.panTo(myCenter);
                    marker = new google.maps.Marker({position:myCenter});
                    marker.setMap(map);
            
                    //add amrker info
                    google.maps.event.addListener(marker,'click',function() {
                                var infowindow = new google.maps.InfoWindow({
                                        content: "name : " +li_list[index].name + "<br>" + "date : " + li_list[index].date + "<br>" + "tel : " + li_list[index].telephone
                                });
                                infowindow.open(map,marker);
                        });
                    pointsRemove =1;
        });
    
    //set action to the show button
    document.getElementById("show").addEventListener('click',function(){
        //empty the list of waypoints
        for(var i=list.length ; i>0;i--){
            list.pop();
        }
        console.log("1-"+list);
        var tripIndex = document.getElementById("trips").selectedIndex;
        
        // get the selected route
        var routePath = "Drivers/" + option_keys_list[tripIndex];
        var routeRef = database.ref(routePath);
        routeRef.on('value',gotData4,errData4);
        
        //get the points lat and lng and pass it to waypoints in direction service
        for(var i=0 ; i< tripList.length;i++){
            var item = {
                location:{lat: tripList[i].lat, lng: tripList[i].long}
            }
            list.push(item);
        }
        //console.log("2-"+list);
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
    
    document.getElementById("accept").addEventListener('click' , function(){
        var item = {
                location:{lat: currentLat, lng: currentLong}
            }
        list.push(item);
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
        
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
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

function requestAccept(){
        var selectionData = li_list[index];
        var path = "passengers/"+keys[index];
        var oldData = firebase.database().ref(path);
        oldData.remove();
        var newPath ="Drivers/"+option_keys_list[document.getElementById("trips").selectedIndex];
        var newData = firebase.database().ref(newPath);
        newData.push(selectionData);   
        marker.setMap(null);
    }

function requestReject(){
    var selectionData = li_list[index];
    var path = "passengers/"+keys[index];
    var oldData = firebase.database().ref(path);
    oldData.remove();
    marker.setMap(null);
}

// get the requested passengers
function got(data){
        var x = document.querySelectorAll(".listen");
        for(j=0;j<x.length ; j++){
            x[j].remove();
            li_list.pop();
            innerArray.pop();
        }
         value = data.val();
        if(value == null){
            document.getElementById("requestList").style.backgroundImage="url('images/emptyRequest.png')";
            document.getElementById("requestList").style.backgroundRepeat="no-repeat";
            document.getElementById("requestList").style.backgroundPosition="center";
        }
        else{ 
         document.getElementById("requestList").style.backgroundImage="";
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

function err(data){
    console.log(Error); 
    }
    
// get the avaliable trips
function gotData2(data){
    var y = document.getElementById("trips");
    while (y.length > 0) {
        y.remove(y.length-1);
        option_keys_list.pop(); // alert !!!!!!!!! test it
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
            if(tripCount < 25){
                option_keys_list.push(tripKeys[i]);
                var option1 = document.createElement("option");
                option1.textContent =num ;
                option1.value =num ;
                document.getElementById("trips").appendChild(option1);
            } 
        }
    }
}

function errData2(data){
        console.log(Error);
    }

function gotData3(data){
    tripCount = 0;
    passengerCountValue = data.val();
    if(passengerCountValue == null){}
    else{
        passengerCountKeys = Object.keys(passengerCountValue);
        
        for(var i =0 ;i<passengerCountKeys.length;i++){
            if(passengerCountKeys[i] != "name" && passengerCountKeys[i] != "email" && passengerCountKeys[i] != "org" && passengerCountKeys[i] != "password" && passengerCountKeys[i] != "telephone" && passengerCountKeys[i] != "trip" && passengerCountKeys[i] != "jason" ){
                tripCount+=1;   
            }
        }
    }
}

function errData3(data){
    console.log(Error);
}

//get the route data
function gotData4(data){
    for(var i=tripList.length; i> 0 ;i--){
        tripList.pop(); 
    }
    var routeValue = data.val();
    if(routeValue == null){}
    else{
        routeKeys = Object.keys(routeValue);
        
        for(var i =0 ;i<routeKeys.length;i++){
            if(routeKeys[i] != "name" && routeKeys[i] != "email" && routeKeys[i] != "org" && routeKeys[i] != "password" && routeKeys[i] != "telephone" && routeKeys[i] != "trip" && routeKeys[i]!="lat" && routeKeys[i]!="long"){
                tripList.push(routeValue[routeKeys[i]]);  
            }
        }
    }
}

function errData4(data){
    console.log(Error);
}

function home(){window.location.href="index.html";}