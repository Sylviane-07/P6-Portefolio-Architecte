//Fetch work from API
let fetchedWork = []

async function requestWork(){
    const response = await fetch('http://localhost:5678/api/works')
    if (response.ok){
        const data = await response.json()
        fetchedWork.push(...data)
        renderImg(fetchedWork)
    }else{
        console.log(response.status)
    }
}
requestWork()

//Add fetchedWork to the gallery container with JS
const portfolioSection = document.getElementById("portfolio")
const gallery = document.querySelector("#portfolio .gallery")

export function renderImg(work){
    for(let i = 0; i < work.length; i++){
        const figureEl = document.createElement("figure")
        figureEl.classList.add("gallery-img-container")
        gallery.appendChild(figureEl)
        const imgEl = document.createElement("img")
        imgEl.classList.add("gallery-img")
        imgEl.src = work[i].imageUrl
        imgEl.alt = work[i].title
        figureEl.appendChild(imgEl).setAttribute("crossorigin", "anonymous")
        const imgCaption = document.createElement("figcaption")
        imgCaption.innerText = work[i].title
        figureEl.appendChild(imgCaption)
    }
}

//Create filter container & buttons
//Create container
export let filterBtnContainer = document.createElement("div")
filterBtnContainer.setAttribute("id", "filter-btn-container")
portfolioSection.insertBefore(filterBtnContainer, portfolioSection.children[1])

//Create button
filterBtnContainer = document.getElementById("filter-btn-container")

const selectAll = document.createElement("button")
selectAll.setAttribute("id", "select-all")
selectAll.classList.add("filter-btn", "filter-btn--green")
selectAll.innerText = `Tous`
filterBtnContainer.appendChild(selectAll)

const selectObject = document.createElement("button")
selectObject.setAttribute("id", "select-object")
selectObject.classList.add("filter-btn", "filter-btn--white")
selectObject.innerText = `Objets`
filterBtnContainer.appendChild(selectObject)

const selectAppartment = document.createElement("button")
selectAppartment.setAttribute("id", "select-appartment")
selectAppartment.classList.add("filter-btn", "filter-btn--white")
selectAppartment.innerText = `Appartements`
filterBtnContainer.appendChild(selectAppartment)

const selectHotelRestaurant = document.createElement("button")
selectHotelRestaurant.setAttribute("id", "select-hotel-restaurant")
selectHotelRestaurant.classList.add("filter-btn", "filter-btn--white")
selectHotelRestaurant.innerText = `Hôtels & restaurants`
filterBtnContainer.appendChild(selectHotelRestaurant)

//AddEventListener to button
//Add filter
//Render filter 
selectAll.addEventListener("click", function(){
    gallery.innerHTML = " "
    renderImg(fetchedWork)
})

selectObject.addEventListener("click", function(){
    const filterObjects = fetchedWork.filter(function(fetchedWork){
        return fetchedWork.categoryId === 1
    })
    gallery.innerHTML = " "
    renderImg(filterObjects)
})

selectAppartment.addEventListener("click", function(){
    const filterAppartments = fetchedWork.filter(function(fetchedWork){
        return fetchedWork.categoryId === 2
    })
    gallery.innerHTML = " "
    renderImg(filterAppartments)
})

selectHotelRestaurant.addEventListener("click", function(){
    const filterHotelRestaurant = fetchedWork.filter(function(fetchedWork){
        return fetchedWork.categoryId === 3
    })
    gallery.innerHTML = " "
    renderImg(filterHotelRestaurant)
})
