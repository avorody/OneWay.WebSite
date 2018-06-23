
    // editing 70-> 50 (line 50)
    
    var database, selectLat , selectLng ,passRef,tripsRef,value , tripValue , tripKeys , myVar , flag =0 ,driver,imgURL;
    
    
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
            
            // get the request
            database = firebase.database();
            passRef = database.ref('passengers');
            passRef.on('value',got,err);
            
            // get the trips
            tripsRef = database.ref('Drivers');
            tripsRef.on('value',gotData2,errData2);
    
    //upload the image of the organizatoin
        var fileupload = document.getElementById('FileUpload1');
        document.getElementById('FileUpload1').addEventListener('change' , uploadimg);
    }
    
//upload the img to storage
function uploadimg(e){
    var fileName = e.target.files[0];
    var storageref = firebase.storage().ref('drivers/'+fileName.name);
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
    tripValue = data.val();
    if(tripValue == null){console.log("no trips found");}
    else{
    tripKeys = Object.keys(tripValue);
    }  
}
    
function errData2(data){
        console.log(Error);
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
            console.log(tripValue);
        var ref = database.ref('Drivers');
            driver = {
                name : name,
                email : email,
                password : pass,
                telephone : tel,
                trip : tripValue,
                imgUpload : imgURL,
                lat: '',
                long: ''
               }
            ref.push(driver);
            
            //check the driver is added or not
        var checkRef = database.ref('Drivers');
        checkRef.on('value',gotData3,errData3);
            
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
    
    
function gotData3(data){
    flag = 0;
    var driverValue = data.val();
    if(driverValue == null){}
    else{
        var driverKeys = Object.keys(driverValue);
        for(var i=0;i<driverKeys.length;i++){
                var k = driverKeys[i];
                if( driverValue[k].name  == driver.name && driverValue[k].password  == driver.password  && driverValue[k].email  == driver.email && driverValue[k].telephone  == driver.telephone && driverValue[k].trip  == driver.trip){
                    flag = 1;
                    break;
                }  
            }
            // check the data are found or not
            if(flag = 1){
                document.getElementById("sh").innerHTML = "The Trip successfully Added ";
                document.getElementById('sh').style.display="block";
                document.getElementById('blur').style.display="block";
            }
            else{
                document.getElementById("sh").innerHTML = "Somthing Went Wrong Regiester Again";
                document.getElementById('sh').style.display="block";
                document.getElementById('blur').style.display="block";
            }
            setTimeout("hide()", 2000);
            
        }
    }


function hide(){
    document.getElementById("sh").innerHTML = "";
    document.getElementById('sh').style.display="none";
    document.getElementById('blur').style.display="none";
}

function errData3(data){
    console.log(Error);
}

    function home(){window.location.href="index.html";}
    
    
    
