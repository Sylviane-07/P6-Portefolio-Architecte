//Fetch work from API
let fetchedWork = ""
fetch('http://localhost:5678/api/works')
    .then(res => {
        if(res.ok){
            res.json().then(data => {
                fetchedWork = data
            })
        }else{
            console.log(Error)
        }
    })
    console.log(fetchedWork)