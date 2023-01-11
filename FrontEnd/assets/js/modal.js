//CREATE MODAL WINDOW
const modalEditdisplay = `
<h2 class="modal__title">Galerie photo</h2>
<div class="modal__edit-gallery"></div>
<input id="modal-add-btn" class="modal__add-btn" type="submit" value="Ajouter une photo">
<input id="modal-delete-btn" class="modal__delete-btn" type="submit" value="Supprimer la galerie">
`
export function addModal() {
    const modalContainer = document.createElement("div")
    modalContainer.classList.add("modal__container")
    document.body.insertBefore(modalContainer, document.body.children[0])
    const modalOverlay = document.createElement("div")
    modalOverlay.classList.add("modal__overlay", "modal-trigger")
    modalContainer.appendChild(modalOverlay)
    const modalEl = document.createElement("div")
    modalEl.classList.add("modal__main")
    modalEl.innerHTML = `${modalEditdisplay}`
    modalContainer.appendChild(modalEl)

    const modalCloseBTn = document.createElement("button")
    modalCloseBTn.classList.add("modal__close-btn", "modal-trigger")
    modalCloseBTn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    modalEl.insertBefore(modalCloseBTn, modalEl.children[0])

}


//DISPLAY & CLOSE MODAL

export function renderModal(){
    addModal()
    const modalContainer = document.querySelector(".modal__container")
    const modalTriggers = document.querySelectorAll(".modal-trigger")

    function toggleModal(){
        modalContainer.classList.toggle("active")
    }

    modalTriggers.forEach(trigger => trigger.addEventListener("click",toggleModal))
}