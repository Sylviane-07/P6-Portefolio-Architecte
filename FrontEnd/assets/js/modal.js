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
        <label class="modal-add-form__input-title-label" for="title">Titre</label>
        <input class="modal-add-form__input-title" id="title" type="text" name="title" aria-label="image title input" required>
       
        <label class="modal-add-form__input-category-label" for="category">Catégorie</label>
        <i class="fa-solid fa-chevron-down"></i>
        <select class="modal-add-form__input-category" name="category" id="category" aria-label="select image category" required>
            <option value=""></option>
        </select>        
        <div class="modal-add-form__br"></div>
        <input aria-label="validate add image" id="modal-add-btn" class="modal-add-form__valid-btn" type="submit" value="Valider">
    </form>
</div>
</div>
`

function addImgModal(){
    const modalElBody = document.querySelector(".modal__body")
    const addImgBtn = document.getElementById("modal-add-btn")
    const goBackBtn = document.querySelector(".modal-add-img__go-back-icon")
    const modalAddImgBody = document.querySelector(".modal-add-img__body")
    addImgBtn.addEventListener("click", function(){
        modalElBody.classList.toggle("hidden")
        modalAddImgBody.classList.remove("hidden")
        console.log("click")
    
    })
    goBackBtn.addEventListener("click", function(){
        modalElBody.classList.remove("hidden")
        modalAddImgBody.classList.add("hidden")
    })
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

console.log(fetchGallery)

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
                        alert("HTTP-Error: " + response.status);
                    }

                }
                requestDeleteWork()

            })
        }
}


