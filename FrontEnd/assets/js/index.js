import * as gallery from "./gallery.js"
import { addEditElements} from "./edit-layout.js"
import {renderModal} from "./modal.js"


//CLEAR local STORAGE WHEN CLICK ON LOGOUT

document.addEventListener('DOMContentLoaded', () =>{
    const loginBtn = document.querySelector(".login__nav")

    let getToken = window.localStorage.getItem("accessToken")
        if(getToken != null){
            //USER IS LOGGED IN
            loginBtn.textContent = "logout" 
            const removeFilters = document.getElementById("filter-btn-container")
            removeFilters.remove()
            //ADD EDIT MODE FUNCTION HERE
            addEditElements()
            renderModal()
        }
//CLEAR LOCAL STORAGE EN LOGOUT
    loginBtn.addEventListener("click", function(){
        window.localStorage.removeItem("accessToken")
    })
})