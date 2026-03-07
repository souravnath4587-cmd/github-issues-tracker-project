console.log('login js working...');

const handleLogin=()=>{
    console.log("log in button is click");
    const userName = document.getElementById('userName').value.trim().toLowerCase() ;
    const password = document.getElementById('password').value.toLowerCase() ;
    
    
    if(userName === 'admin' && password === 'admin123'){
        alert("Login Successfully...")
        localStorage.setItem("isLoggedIn", "true"); 
        window.location.assign('../index.html');
    }else{
        alert('Login Failed..');
        return;
    
    }
    
}

