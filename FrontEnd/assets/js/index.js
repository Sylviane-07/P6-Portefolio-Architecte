import * as gallery from "./gallery.js"
import { addEditElements} from "./edit-layout.js"
import {renderModal} from "./modal.js"
import { renderGallery } from "./modal.js"


//CLEAR SESSION STORAGE WHEN CLICK ON LOGOUT

document.addEventListener('DOMContentLoaded', () =>{
    const loginBtn = document.querySelector(".login__nav")

    let getToken = window.sessionStorage.getItem('accessToken')
        if(getToken != null){
            //USER IS LOGGED IN
            loginBtn.textContent = "logout" 
            const removeFilters = document.getElementById("filter-btn-container")
            removeFilters.remove()
            //ADD EDIT MODE FUNCTION HERE
            addEditElements()
            renderModal()
        }

    loginBtn.addEventListener('click', function(){
        window.sessionStorage.removeItem('accessToken')
    })
})