import * as renderGallery from "./gallery.js"
import * as editMode from "./edit.js"
import { addEditElements } from "./edit.js"

//CLEAR SESSION STORAGE WHEN CLICK ON LOGOUT

document.addEventListener('DOMContentLoaded', () =>{
    const loginBtn = document.querySelector(".login__nav")

    let getToken = window.sessionStorage.getItem('accessToken')
        if(getToken != null){
           loginBtn.textContent = "logout" 
           const removeFilters = document.getElementById("filter-btn-container")
           removeFilters.remove()
           //ADD EDIT MODE FUNCTION HERE
           addEditElements()
        }

    loginBtn.addEventListener('click', function(){
    window.sessionStorage.removeItem('accessToken')
    })
})