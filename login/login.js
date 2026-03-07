console.log('login js working...');

const handleLogin=()=>{
    console.log("log in button is click");
    const userName = document.getElementById('userName').value ;
    console.log(userName);
    const password = document.getElementById('password').value ;
    console.log(password);
    if(userName === 'admin' && password === 'admin123'){
        alert("Login Successfully...")
        localStorage.setItem("isLoggedIn", "true"); 
        window.location.assign('../index.html');
    }else{
        alert('Login Failed..');
        return;
    
    }
    
}

