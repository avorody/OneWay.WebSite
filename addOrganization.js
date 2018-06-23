    var count =0 ,database,imgURL;
    var lng , lat, marker;
    var username , password , orgName;

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
            console.log(firebase);
        
            database = firebase.database();
            var fileupload = document.getElementById('FileUpload1');
        document.getElementById('FileUpload1').addEventListener('change' , uploadimg);
    }
    
//upload the img to storage
function uploadimg(e){
    var fileName = e.target.files[0];
    var storageref = firebase.storage().ref('organization/'+fileName.name);
    var task = storageref.put(fileName);
    task.on('state_changed',
           function (snapshot){},function (){},
           function (err){
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            document.getElementById('OrgImage').removeAttribute('src');
            document.getElementById('OrgImage').setAttribute('src',downloadURL);
            imgURL = downloadURL;
    console.log('File available at', downloadURL);
  });
    });
}


function text_check(){
        document.getElementById("username").style.borderBottomColor="white";
    }
function pass_check(){
        document.getElementById("password").style.borderBottomColor="white";
    }
function orgname_check(){
        document.getElementById("organizationName").style.borderBottomColor="white";
    }

function myMap() {
    
        //initiate the map
        var myCenter = new google.maps.LatLng(30.0444, 31.2357);
        var mapCanvas = document.getElementById("map");
        var mapOptions = {center: myCenter, zoom: 10};
        var map = new google.maps.Map(mapCanvas, mapOptions);
        google.maps.event.addListener(map, 'click', function(event){
                     placeMarker(map, event.latLng);
                 });
}

//place marker
function placeMarker(map, location) {
        //place only one marker
        if(count == 1){
            marker.setMap(null);
            count = 0;
        }
        if(count !=1){// to check the user enter one marker
              marker = new google.maps.Marker({position: location,map: map});//icon: "images/bus_arrived.png";
              lng =location.lng();
              lat = location.lat();
              count = 1;
        }
    }

//add orginaztion
function addOrg(){
    //get the values
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        orgName = document.getElementById("organizationName").value;
    
    //check if the fields is empty
        if(username == ""){
            document.getElementById("username").style.borderBottomColor="red";
        }
        if(password== ""){
            document.getElementById("password").style.borderBottomColor="red";
        }
        if(orgName== ""){
            document.getElementById("organizationName").style.borderBottomColor="red";
        }
        else{
            
    //create path to store the organization info
    var path = "org/" + orgName;
    var orgRef = firebase.database().ref(path);
    orgRef.child('admin');
    orgRef.child('location');
    
    //store the busername of the admin and the password
    var admin={
        org:orgName,
        password:password,
        username:username,
        imgUpload : imgURL
    }
    var adminPath = path+'/admin';
    var adminRef = firebase.database().ref(adminPath);
    adminRef.push(admin);
    
    //store the location of the organoization
    var location={
        lat:lat,
        lng:lng
    }
    var locationPath = path+'/location';
    var locationRef = firebase.database().ref(locationPath);
    locationRef.push(location);
    
    document.getElementById("sh").innerHTML = "Your Organization is Succeffulley Added";
    document.getElementById('sh').style.display="block";
    document.getElementById('blur').style.display="block";    
    setTimeout("hide()", 2000);
        
        }
}

//to dismiss the alert
function hide(){
    document.getElementById("sh").innerHTML = "";
    document.getElementById('sh').style.display="none";
    document.getElementById('blur').style.display="none";
    window.location="admin1.html";
}
        
function back(){
    //get back to the previous page
}