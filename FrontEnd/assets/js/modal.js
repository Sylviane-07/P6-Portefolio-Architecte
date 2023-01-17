//CREATE MODAL WINDOW
const modalEditdisplay = `
<div class="modal__body">
    <h2 id="modalTitle" class="modal__title">Galerie photo</h2>
    <div aria-label="edit gallery" class="modal__edit-gallery"></div>
    <div class="modal__input-container">
        <input aria-label="add picture" id="modal-add-btn" class="modal__add-btn" type="submit" value="Ajouter une photo">
        <input aria-label="delete picture" id="modal-delete-btn" class="modal__delete-btn" type="submit" value="Supprimer la galerie">
    </div>
</div>

`
export function addModal() {
    const modalContainer = document.createElement("div")
    modalContainer.classList.add("modal__container")
    modalContainer.setAttribute("id", "modal-container")
    document.body.insertBefore(modalContainer, document.body.children[0])
    
    const modalOverlay = document.createElement("div")
    modalOverlay.classList.add("modal__overlay", "modal-trigger")
    modalContainer.appendChild(modalOverlay)
   
    const modalEl = document.createElement("div")
    modalEl.setAttribute("role", "dialog")
    modalEl.setAttribute("aria-labelleby", "modalTitle")
    modalEl.classList.add("modal__main")
    modalEl.innerHTML = `${modalEditdisplay} ${modalAddDisplay}`
    modalContainer.appendChild(modalEl)

    const modalCloseBTn = document.createElement("button")
    modalCloseBTn.setAttribute("aria-label", "close modal")
    modalCloseBTn.classList.add("modal__close-btn")
    modalCloseBTn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    const modalElBody = document.querySelector(".modal__body")
    modalElBody.insertBefore(modalCloseBTn, modalElBody.children[0])
}


//DISPLAY & CLOSE MODAL
//RENDER MODAL
export function renderModal(){
    addModal()
    renderGallery()
    addImgModal()
    const modalContainer = document.querySelector(".modal__container")
    const modalTriggers = document.querySelectorAll(".modal-trigger")
    const modalElBody = document.querySelector(".modal__body")
    const modalAddImgBody = document.querySelector(".modal-add-img__body")
    const modalCloseBtn = document.querySelectorAll(".modal__close-btn")
    
    function toggleModal(){
        modalContainer.classList.toggle("active")
        modalElBody.classList.remove("hidden")
        modalAddImgBody.classList.add("hidden")
    }
    
    modalTriggers.forEach(trigger => trigger.addEventListener("click",toggleModal))

    function closeModal(){
        modalContainer.classList.remove("active")
    }
    modalCloseBtn.forEach(trigger => trigger.addEventListener("click", closeModal))
}


//MODAL ADD IMAGE

const modalAddDisplay = `
<div class="modal-add-img__body">
<span class="modal-add-img__icon-container">
    <button class="modal-add-img__go-back-icon" aria-label="go-back button"><i class="fa-solid fa-arrow-left-long""></i></button>
    <button class="modal__close-btn modal-add-img__close-icon" aria-label="close modal"><i class="fa-solid fa-xmark"></i></button>
</span>
<h2 id="modal-add-img__title" class="modal__title modal-add-img__title">Ajout photo</h2>
<div class="modal-add-img__form-container">
    <form action="" method="post" class="modal-add-img__form">
        <div class="modal-add-form__file-input-container">
            <i class="fa-regular fa-image"></i>
            <label class="modal-add-form__file-input-label" for="image">+ Ajouter photo</label>
            <input class="modal-add-form__file-input" type="file" id="image" name="image" accept=".jpg, .png" aria-label="select image to upload">
            <p>jpg, png : 4Mo max</p>
        </div>
        <div class="modal-add-form__display-image"></div>
        <p class="modal-add-form__message"></p>
        <label class="modal-add-form__input-title-label" for="title">Titre</label>
        <input class="modal-add-form__input-title" id="title" type="text" name="title" aria-label="image title input" required>
       
        <label class="modal-add-form__input-category-label" for="category">Catégorie</label>
        <i class="fa-solid fa-chevron-down"></i>
        <select class="modal-add-form__input-category" name="category" id="category" aria-label="select image category" required>
            <option value=""></option>
        </select>        
        <span class="modal-add-form__br">
            <p class="modal-add-form__upload-message"></p>
        </span>
        <input aria-label="validate add image" id="modal-add-btn" class="modal-add-form__valid-btn" type="submit" value="Valider" disabled>
    </form>
</div>
</div>
`

function addImgModal(){
    const modalElBody = document.querySelector(".modal__body")
    const addImgBtn = document.getElementById("modal-add-btn")
    const goBackBtn = document.querySelector(".modal-add-img__go-back-icon")
    const modalAddImgBody = document.querySelector(".modal-add-img__body")
    const modalAddImgContainer = document.querySelector(".modal-add-form__file-input-container")
    const displayEl = document.querySelector(".modal-add-form__display-image")
    const imgInput = document.querySelector(".modal-add-form__file-input")
    const sucessMessage = document.querySelector(".modal-add-form__upload-message")
    const displayMessageEl = document.querySelector(".modal-add-form__message")

    //DISPLAY MODAL ADD IMAGE PAGE
    addImgBtn.addEventListener("click", function(){
        modalElBody.classList.toggle("hidden")
        modalAddImgBody.classList.remove("hidden")
        modalAddImgContainer.classList.remove("hidden")
        displayEl.classList.add("hidden")
        imgInput.value = ""
        displayEl.innerHTML = ""
        displayMessageEl.innerHTML = ""
        sucessMessage.innerHTML = ""
        console.log("click")        
    })

    //GO BACK TO MODAL GALLERY
    goBackBtn.addEventListener("click", function(){
        modalElBody.classList.remove("hidden")
        modalAddImgBody.classList.add("hidden")
        modalAddImgContainer.classList.toggle("hidden")
        displayEl.classList.add("hidden")
        imgInput.value = ""
        displayEl.innerHTML = ""
    })

    //ADD CATEGORIES TO SELECT INPUT
    getCategories()
    //DISPLAY INPUT IMAGE
    displayUploadedImg()
    console.log(fetchGallery)
    console.log(fetchCategories)


    const uploadForm = document.querySelector(".modal-add-img__form")
    const image = document.getElementById("image")
    uploadForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        uploadWork()
        uploadForm.reset()
        image.value = ""
        displayEl.classList.add("hidden")
        modalAddImgContainer.classList.toggle("hidden")
    })
    
    imgInput.addEventListener("click", function(){
        sucessMessage.innerHTML = ""
    })
}

//ADD DISPLAY INPUT IMAGE
function displayUploadedImg(){
    const modalAddImgContainer = document.querySelector(".modal-add-form__file-input-container")
    const imgInput = document.querySelector(".modal-add-form__file-input")
    const displayEl = document.querySelector(".modal-add-form__display-image")
    const displayMessageEl = document.querySelector(".modal-add-form__message")
    const addImgSubmitBtn = document.querySelector(".modal-add-form__valid-btn")
   
    
    imgInput.addEventListener("change", function(){
        console.log(imgInput.value)
        let reader = new FileReader()
        reader.readAsDataURL(imgInput.files[0])
        displayEl.classList.toggle("hidden")
        modalAddImgContainer.classList.add("hidden")
        reader.addEventListener("load", ()=>{
            displayEl.innerHTML = `<img class="modal-add-form__uploaded-img" src="${reader.result}" alt=""/>`
        })
        if (imgInput.files.length > 0){
            const fileSize = imgInput.files.item(0).size
            const fileMb = fileSize / 1024 ** 2
            if(fileMb >= 4){
                displayMessageEl.innerHTML = "Veuillez choisir un fichier de moins de 4Mb"
                addImgSubmitBtn.disabled = true
            }else{
                addImgSubmitBtn.disabled = false
            }
        }
    }) 
}


//GET CATEGORIES
let fetchCategories = []

async function getCategories(){
    const response = await fetch('http://localhost:5678/api/categories')
    if (response.ok){
        const data = await response.json()
        fetchCategories.push(...data)
        for(let i = 0; i < fetchCategories.length; i++){
            const categoryId = fetchCategories[i].id
            const categoryName = fetchCategories[i].name
            const selectInput = document.querySelector(".modal-add-form__input-category")
            const createOption = document.createElement("option")
            createOption.setAttribute("value", `${categoryId}`)
            createOption.setAttribute("id", `category-id-${categoryId}`)
            createOption.innerHTML = `&nbsp;&nbsp;&nbsp;${categoryName}`
            selectInput.append(createOption)
        }
    }else{
        alert("HTTP-Error: " + response.status);
    }
}




//DISPLAY GALLERY IN MODAL

let fetchGallery = []

async function renderGallery(){
    const response = await fetch('http://localhost:5678/api/works')
    if (response.ok){
        const data = await response.json()
        fetchGallery.push(...data)
        displayGalleryImg(fetchGallery)
    }else{
        alert("HTTP-Error: " + response.status);
    }
}



function displayGalleryImg(gallery){
    for(let i = 0; i < gallery.length; i++){
        const modalGallery = document.querySelector(".modal__edit-gallery")
        const imgContainer = document.createElement("div")
        imgContainer.classList.add("modal__gallery-img-container")
        modalGallery.appendChild(imgContainer)
        const iconContainer = document.createElement("div")
        iconContainer.classList.add("icon-container")
        imgContainer.appendChild(iconContainer)
        const trashIcon = document.createElement("button")
        trashIcon.setAttribute("type", "button")
        trashIcon.classList.add("trash-icon-btn")
        trashIcon.innerHTML = `<i class="fa-regular fa-trash-can"></i>`
        iconContainer.appendChild(trashIcon)
        const imgEl = document.createElement("img")
        imgContainer.appendChild(imgEl).setAttribute("crossorigin", "anonymous")
        const workId = gallery[i].id
        imgEl.setAttribute("id", `${workId}`)
        imgEl.classList.add("modal__gallery-img")
        imgEl.src = gallery[i].imageUrl
        const editBtn = document.createElement("button")
        editBtn.classList.add("edit-btn")
        editBtn.innerText = "éditer"
        imgContainer.appendChild(editBtn)
    }
    //DELETE WORK FROM MODAL
    deleteWork()
}



export function deleteWork(){
    const trashBtn = document.querySelectorAll(".trash-icon-btn")
        for (let i = 0; i < trashBtn.length; i += 1){
            trashBtn[i].addEventListener("click", function(e){
                e.preventDefault()
                const modalGalleryTotalImg = document.querySelectorAll(".modal__gallery-img")
                const modalImgIndex = modalGalleryTotalImg[i]
                console.log(modalGalleryTotalImg[i])

                //GET ID FOR API ROUTE
                const id = modalImgIndex.id
                console.log(id)
                //DELETE REQUEST TO API
                async function requestDeleteWork(){
                    const userToken = JSON.parse(window.localStorage.getItem('accessToken'))
                    const token = userToken.token
                    console.log(userToken.token)
                    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                        }
                    })
                    if (response.ok){
                        const deleteResponse = await response
                        console.log(deleteResponse.status)
                        //REMOVE DISPLAY FROM DOM WITHOUT RELOAD
                        const modalImgCtnr = document.getElementsByClassName("modal__gallery-img-container")
                        modalImgCtnr[i].remove()
                        //HOMEPAGE GALLERY WORK UPDATE
                        const homepageGalleryImg = document.querySelectorAll(".gallery-img-container")
                        console.log(homepageGalleryImg[i])
                        homepageGalleryImg[i].remove()
                        
                    }else{
                        alert("HTTP-Error: " + response.status)
                    }

                }
                requestDeleteWork()

            })
        }
}


//UPLOAD WORK

async function uploadWork(){
    const image = document.getElementById("image")
    const title = document.getElementById("title").value
    const category = document.getElementById("category").value
    const sucessMessage = document.querySelector(".modal-add-form__upload-message")

    const formData = new FormData()
    formData.append("image", image.files[0])
    formData.append("title", title)
    formData.append("category", category)

    const userToken = JSON.parse(window.localStorage.getItem('accessToken'))
    const token = userToken.token
    console.log(userToken.token)
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
    if(response.ok){
        const result = await response.json()
        console.log(result)
        sucessMessage.innerHTML = "Photo ajoutée"
    }else{
        alert("HTTP-Error: " + response.status)
    }
}

//UPDATE & DISPLAY UPLOADED WORK

function updateWork(){
    const modalGallery = document.querySelector(".modal__edit-gallery")
    fetchGallery = []
    modalGallery.innerHTML = ""
    renderGallery()
}