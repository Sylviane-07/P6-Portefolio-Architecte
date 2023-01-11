export function addEditElements(){
    const editBarEl = document.createElement("div")
    editBarEl.classList.add("edit__bar")
    document.body.insertBefore(editBarEl, document.body.children[0])

    const modifyIcon = `<i class="fa-regular fa-pen-to-square"></i>`

    const editBarTitle = document.createElement("p")
    editBarTitle.innerHTML = `${modifyIcon} Mode édition`
    editBarEl.appendChild(editBarTitle)

    const publishModifBtn = document.createElement("button")
    publishModifBtn.classList.add("edit__publish-btn")
    publishModifBtn.textContent = "publier les changements"
    editBarEl.appendChild(publishModifBtn)

    //ADD MODIFY PARAGRAPH * 3

    const modifyText = `${modifyIcon} modifier` 

    const introPic = document.querySelector("#introduction figure")
    const modifyEl1 = document.createElement("button")
    modifyEl1.classList.add("edit__modify-btn")
    modifyEl1.innerHTML = modifyText
    introPic.appendChild(modifyEl1)

    const introText = document.querySelector("#introduction article")
    const modifyEl2 = document.createElement("button")
    modifyEl2.classList.add("edit__modify-btn")
    modifyEl2.innerHTML = modifyText
    introText.insertBefore(modifyEl2, introText.children[0])

    const gallerySection = document.querySelector("#portfolio")

    const glrTtlContainer = document.createElement("div")
    glrTtlContainer.classList.add("gallery__title-container")
    gallerySection.insertBefore(glrTtlContainer, gallerySection.children[0])

    const galleryTitle = document.querySelector("#portfolio h2")
    glrTtlContainer.appendChild(galleryTitle)
    const modifyEl3 = document.createElement("button")
    modifyEl3.classList.add("edit__modify-btn")
    modifyEl3.innerHTML = modifyText
    glrTtlContainer.appendChild(modifyEl3)
}