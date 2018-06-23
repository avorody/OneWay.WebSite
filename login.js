    var database ;
    
        if(window.screen.width < 768){
            document.getElementsByClassName('content').style.width = window.screen.width;
            
        }
	function login()
	{
         database = firebase.database();
		 var ref = database.ref('admins');
        ref.on('value',gotData,errData);
	}
    
    function gotData(data){
        var inputUsername = document.getElementById("username").value;
        var inputPaswword = document.getElementById("password").value;
        var value = data.val();
        var keys = Object.keys(value);
        console.log(keys);
        for(i = 0;i<keys.length;i++){
            var k = keys[i];
            if(value[k].username == inputUsername ){
                if(value[k].password == inputPaswword){
                   window.location.href='admin1.html';
                }
                else{
                     document.getElementById("password").style.backgroundColor="red";
                }
            }
            else{
                document.getElementById("username").style.backgroundColor="red";
                if(value[k].password != inputPaswword){         
                    document.getElementById("password").style.backgroundColor="red";
                }
                
            }
        }
    }
    
     function user(){
        document.getElementById("username").style.backgroundColor="white";
    }
     function pass(){
        document.getElementById("password").style.backgroundColor="white";
    }
    
    function errData(data){
        alert("Error");
    }
    
    function myFunction(){
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
            /*database = firebase.database();
		    var ref = database.ref('admins');
            var admin = {
            username:'admin',
            password:12345,
            org:'org'
        }
        ref.push(admin);*/
    }
    
    function back(){
        window.location.href="index.html";
    }
    