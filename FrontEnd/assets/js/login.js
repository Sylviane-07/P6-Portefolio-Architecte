const submitBtn = document.getElementById("submit-btn")
const authForm = document.querySelector(".login__form")
const loginBtn = document.querySelector(".login__nav")

document.addEventListener('DOMContentLoaded', () => {
    loginBtn.addEventListener('click', function(){
        sessionStorage.removeItem('accessToken')
    })
    authForm.addEventListener('submit', function(evt){
        //prevent form default behavior
        evt.preventDefault()
        //login to receive token
        login()
        //check token in sessionStorage
        let getToken = sessionStorage.getItem('accessToken')
        if(getToken != null){
            window.location.href = `./index.html`
        }
        console.log("check token")
        console.log(sessionStorage.getItem('accessToken'))
        console.log("submit")
    })
})


//Change FORM ACTION URL TO REQUEST API   

function login(){

    const form = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }
    const userID = JSON.stringify(form)
    let token = ""

    async function requestAuth(){
        const response = await fetch('http://localhost:5678/api/users/login',{
            method: 'POST',
            headers: { "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
        },
            body: userID
        })
        if(response.status === 200){
            console.log("response ok")
            let result = response.json
            console.log(result)
            let userToken = JSON.stringify(result)
            console.log(userToken)
            sessionStorage.setItem('accessToken', `${userToken}`)
            window.location.href = './index.html'
        } else {
            console.log('error')
           // alert("HTTP-Error: " + response.status)
            errorMessage()
        }
    }
    requestAuth()
}
const mainEl = document.querySelector("main")
const error = document.createElement("p")
error.classList.add("error-message")
mainEl.insertBefore(error, mainEl.children[1])

function errorMessage(){
    error.innerText = `Erreur dans l’identifiant ou le mot de passe`
}
