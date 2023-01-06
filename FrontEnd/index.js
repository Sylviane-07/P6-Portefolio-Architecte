// let fetchedWork = []
// fetch('http://localhost:5678/api/works')
//     .then(response => {
//         if(response.ok){
//             console.log("SUCCESS")
//             response.json()
//                 .then(data => {
//                     fetchedWork.push(...data)
//                 })
//         }else{
//             console.log(Error)
//         }
//     return fetchedWork
//     })

// console.log(fetchedWork)
// let work = fetchedWork[0]
// console.log(work)


//Fetch work from API
let fetchedWork = []

async function requestWork(){
    const response = await fetch('http://localhost:5678/api/works')
    const data = await response.json()
    fetchedWork.push(...data)
      renderImg()
    }
requestWork()

//Add fetchedWork to the gallery container with JS
const portfolioSection = document.getElementById("portfolio")
const gallery = document.querySelector("#portfolio .gallery")

function renderImg(){
    for(let i = 0; i < fetchedWork.length; i++){
        const figureEl = document.createElement("figure")
        gallery.appendChild(figureEl)
        const imgEl = document.createElement("img")
        imgEl.src = fetchedWork[i].imageUrl
        imgEl.alt = fetchedWork[i].title
        figureEl.appendChild(imgEl).setAttribute("crossorigin", "anonymous")
        const imgCaption = document.createElement("figcaption")
        imgCaption.innerText = fetchedWork[i].title
        figureEl.appendChild(imgCaption)
    }
}

//Create filter container & buttons
//Create container
let filterBtnContainer = document.createElement("div")
filterBtnContainer.setAttribute("id", "filter-btn-container")
portfolioSection.insertBefore(filterBtnContainer, portfolioSection.children[1])

//Create button
filterBtnContainer = document.getElementById("filter-btn-container")

const selectAll = document.createElement("button")
selectAll.setAttribute("id", "select-all")
selectAll.innerText = `Tous`
filterBtnContainer.appendChild(selectAll)

const selectObject = document.createElement("button")
selectObject.setAttribute("id", "select-object")
selectObject.innerText = `Objets`
filterBtnContainer.appendChild(selectObject)

const selectAppartment = document.createElement("button")
selectAppartment.setAttribute("id", "select-appartment")
selectAppartment.innerText = `Appartements`
filterBtnContainer.appendChild(selectAppartment)

const selectHotelRestaurant = document.createElement("button")
selectHotelRestaurant.setAttribute("id", "select-hotel-restaurant")
selectHotelRestaurant.innerText = `Hôtels & restaurants`
filterBtnContainer.appendChild(selectHotelRestaurant)

//addEventListener to button
//Use .filter() method