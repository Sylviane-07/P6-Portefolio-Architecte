//CREATE MODAL WINDOW
const modalEditdisplay = `
<h2 id="modalTitle" class="modal__title">Galerie photo</h2>
<div aria-label="edit gallery" class="modal__edit-gallery"></div>
<input aria-label="add picture" id="modal-add-btn" class="modal__add-btn" type="submit" value="Ajouter une photo">
<input aria-label="delete picture" id="modal-delete-btn" class="modal__delete-btn" type="submit" value="Supprimer la galerie">
`
export function addModal() {
    const modalContainer = document.createElement("div")
    modalContainer.classList.add("modal__container")
    document.body.insertBefore(modalContainer, document.body.children[0])
    
    const modalOverlay = document.createElement("div")
    modalOverlay.classList.add("modal__overlay", "modal-trigger")
    modalContainer.appendChild(modalOverlay)
   
    const modalEl = document.createElement("div")
    modalEl.setAttribute("role", "dialog")
    modalEl.setAttribute("aria-labelleby", "modalTitle")
    modalEl.classList.add("modal__main")
    modalEl.innerHTML = `${modalEditdisplay}`
    modalContainer.appendChild(modalEl)

    const modalCloseBTn = document.createElement("button")
    modalCloseBTn.setAttribute("aria-label", "close modal")
    modalCloseBTn.classList.add("modal__close-btn", "modal-trigger")
    modalCloseBTn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    modalEl.insertBefore(modalCloseBTn, modalEl.children[0])
}


//DISPLAY & CLOSE MODAL

export function renderModal(){
    addModal()
    renderGallery()
    
    const modalContainer = document.querySelector(".modal__container")
    const modalTriggers = document.querySelectorAll(".modal-trigger")
    
    function toggleModal(){
        modalContainer.classList.toggle("active")
    }
    
    modalTriggers.forEach(trigger => trigger.addEventListener("click",toggleModal))
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
            trashBtn[i].addEventListener("click", function(){
                const galleryTotalImg = document.querySelectorAll(".modal__gallery-img")
                const imgIndex = galleryTotalImg[i]
                const id = imgIndex.id
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
                        const deleteResponse = await response.json()
                        console.log(deleteResponse)
                        
                    }else{
                        alert("HTTP-Error: " + response.status);
                    }

                }
                requestDeleteWork()
            })
        }
}


