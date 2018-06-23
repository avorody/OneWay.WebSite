var count=0 , id = 0,marker,flag =0 ,passenger;
    var w_count = 0;
    var lng , lat;
    var name , pass , email , tel , birthdate , status ,database;
    var currentPath;   
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
        
	function myMap() 
	{
        if(w_count == 0){
            
            
            name = document.getElementById("name").value;
            pass = document.getElementById("pass").value;
            email = document.getElementById("email").value;
            tel = document.getElementById("tel").value;
            birthdate = document.getElementById("date").value;
            
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
        if(birthdate== ""){
            document.getElementById("date").style.borderBottomColor="red";
        }
            
         if(name != "" && pass != "" && email != "" && tel != "" && birthdate != "") {
                document.getElementById("div").style.width="50%";
                var myCenter = new google.maps.LatLng(30.0444, 31.2357);
                var mapCanvas = document.getElementById("div");
                var mapOptions = {center: myCenter, zoom: 9};
                var map = new google.maps.Map(mapCanvas, mapOptions);
                google.maps.event.addListener(map, 'click', 
                            function(event){
                            placeMarker(map, event.latLng);
                                           });
                w_count+=1;
            document.getElementById("toMap").value = "Finish";
            document.getElementById("toMap").disabled = true;
            document.getElementById("toMap").style.backgroundColor ="#d0d1d5";
                }
        }
        else if(w_count == 1){
            var ref = database.ref(currentPath+'/passengers');
            passenger = {
                name : name,
                email : email,
                password : pass,
                telephone : tel,
                date : birthdate,
                lat : lat,
                long : lng,
                org : 'org',
                trip:''
            }
            ref.push(passenger);
            var passengerCheck = database.ref(currentPath+'/passengers');
            passengerCheck.on('value',gotData,errData);
            
            w_count = 0;
        }
        
  		count = 0;
            
	}
// check the data path
function gotData(data){
        flag = 0;
        var checkValue = data.val();
        if(checkValue == null){
            
        }
        else{
           var checkKeys = Object.keys(checkValue);
            for(var i=0;i<checkKeys.length;i++){
                var k = checkKeys[i];
                if( checkValue[k].name  == passenger.name && checkValue[k].password  == passenger.password  && checkValue[k].email  == passenger.email && checkValue[k].telephone  == passenger.telephone && checkValue[k].date  == passenger.date && checkValue[k].lat  == passenger.lat && checkValue[k].long  == passenger.long && checkValue[k].trip  == passenger.trip){
                    flag = 1;
                    break;
                }  
            }
            // check the data are found or not
            if(flag = 1){
                document.getElementById("sh").innerHTML = "Your Request successfully sent ";
                document.getElementById('sh').style.display="block";
                document.getElementById('blur').style.display="block";
            }
            else{
                document.getElementById("sh").innerHTML = "Somthing Went Wrong Send Request Again";
                document.getElementById('sh').style.display="block";
                document.getElementById('blur').style.display="block";
            }
            setTimeout("hide()", 2000);
            
        }
}

//to dismiss the alert
function hide(){
    document.getElementById("sh").innerHTML = "";
    document.getElementById('sh').style.display="none";
    document.getElementById('blur').style.display="none";
    window.location.href='index.html';
}
    
function errData(data){
    console.log(Error);
}

    function placeMarker(map, location) {
        if(count == 1){
            marker.setMap(null);
            count = 0;
        }
        if(count !=1){// to check the user enter one marker
              marker = new google.maps.Marker({position: location,map: map});//icon: "images/bus_arrived.png";
              lng =location.lng();
              lat = location.lat();
              count = 1;
              document.getElementById("toMap").disabled = false;
            document.getElementById("toMap").style.backgroundColor ="#0c9fc6";
            
        }
        
       //window.location.href='index.html';
    }
        
    function back(){
            if(w_count == 0){
                window.location.href='index.html';
            }
            else if(w_count == 1){
                //creat the div
                document.getElementById("div").style.width="30%";
                document.getElementById("div").innerHTML="<form><div><img src=\"images/sign.png\" style=\"height: 200px; width: 200px; border-radius: 50%; margin-top: 30px; \" onclick=\"chooseImage()\"></div><input type=\"text\"id=\"name\"><br><br><input type=\"email\"id =\"email\"><br><br><input type=\"password\"style=\"color: white;\" id =\"pass\"><br><br><input type=\"tel\"style=\"color: white;\" id =\"tel\"><br><br><input type=\"date\" style=\"color: white;\" id =\"date\"><br><br></form>";
                document.getElementById("name").value= name;
                document.getElementById("email").value = email;
                document.getElementById("tel").value = tel;
                document.getElementById("pass").value = pass;
                document.getElementById("date").value = birthdate;
                document.getElementById("toMap").value = "Next";
                document.getElementById("toMap").disabled = false;
                document.getElementById("toMap").style.backgroundColor ="#0c9fc6";
                
                w_count = 0;
            }
        }
        
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
            
            //get the current organization
            var currentRef = database.ref("org");
            currentRef.on('value',gotCurrentData,errCurrentData);
            //upload the image of the organizatoin
        var fileupload = document.getElementById('FileUpload1');
        document.getElementById('FileUpload1').addEventListener('change' , uploadimg);
    }
    
//upload the img to storage
function uploadimg(e){
    var fileName = e.target.files[0];
    var storageref = firebase.storage().ref('passengers/'+fileName.name);
    var task = storageref.put(fileName);
    task.on('state_changed',
           function (snapshot){},function (){},
           function (err){
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            document.getElementById('OrgImage').setAttribute('src',downloadURL);
            imgURL = downloadURL;
    console.log('File available at', downloadURL);
  });
    });
}
     
// get the current organization name
function gotCurrentData(data){
        var nowVal = data.val();
        if(nowVal == null){
            
        }
        else{
           var nowKeys = Object.keys(nowVal);
            currentPath = "org/"+nowVal['now']
                console.log(currentPath); 
            }
    }

function errCurrentData(data){
        
    }