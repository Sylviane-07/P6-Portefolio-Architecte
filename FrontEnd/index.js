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

function renderImg(){
    for(let i = 0; i < fetchedWork.length; i++){
        const gallery = document.querySelector("#portfolio .gallery")
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