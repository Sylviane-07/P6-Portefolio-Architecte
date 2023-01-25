const submitBtn = document.getElementById("submit-btn")
const authForm = document.querySelector(".login__form")
const loginBtn = document.querySelector(".login__nav")


// CHECK FOR TOKEN TO LOGIN USER
function login(){
    document.addEventListener("DOMContentLoaded", () => {
        window.localStorage.removeItem("accessToken")
    loginBtn.addEventListener("click", function(){
        localStorage.removeItem("accessToken")
    })
    authForm.addEventListener("submit", function(evt){
        //prevent form default behavior
        evt.preventDefault()
        //login to receive token
        userAuth()
        //check token in localStorage
        let getToken = JSON.parse(window.localStorage.getItem("accessToken"))
        if(getToken != null){
            window.location.href = `./index.html`    
        }
    })
})
}

login()


//GET USER ID TO REQUEST TOKEN  

function userAuth(){

    const form = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }
    const userID = JSON.stringify(form)
    let token = ""
    async function requestAuth(){
        const response = await fetch("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: userID
        })
        if(response.status === 200){
            console.log("response ok")
            let result = await response.json()
            let userToken = JSON.stringify(result)
            console.log(result)
            console.log(userToken)
            window.localStorage.setItem("accessToken", `${userToken}`)
            window.location.href = './index.html'
        } else {
            console.log(response.status)
            errorMessage()
        }
    }
    requestAuth()
}

//CREATE ERROR SENTENCE ELEMENT
const mainEl = document.querySelector("main")
const error = document.createElement("p")
error.classList.add("login__error-message")
mainEl.insertBefore(error, mainEl.children[1])

function errorMessage(){
    error.innerText = `Erreur dans l’identifiant ou le mot de passe`
}