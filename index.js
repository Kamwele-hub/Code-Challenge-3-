fetch('http://localhost:3000/films')//*fetch data from json files
.then((res) => res.json())
.then((data) => displayNames(data))

function displayNames(names){
    names.forEach(films => {
      display.innerHTML = `${films.title}`
      menu.appendChild(display)
})
}

fetch('http://localhost:3000/films')
.then((res) => res.json())
.then((data) => displayContent(data))


function displayContent(content){
    content.forEach(films => {
        let main = document.querySelector('main')
        let list = document.createElement('li')
        list.innerHTML = `
        <img src='${films.poster}'>
        <p id='items'>Available tickets${films.capacity}<br>
        Starting time:${films.showtime}<br>
        length: ${films.runtime}<br>
        <button id="bt">Get Ticket</button>
        <button id='delete'>DELETE</button>
        `
        main.appendChild(list)
        let button = list.querySelector('button')
        button.addEventListener('click' , bookTicket)
        button.style.color="white"
        

    function bookTicket(){
        if(films.capacity > -10){
        let remainingTickets = films.capacity  - 1
        let soldTickets = films.tickets_bought + 1
        let final = {
            capacity : remainingTickets,
            tickets_bought : soldTickets
        }
        
        fetch(`http://localhost:3000/films/${films.id}` , {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(final)
        })
    }else{
        let soldOut = {
            capacity : '30'
        }

        fetch(`http://localhost:3000/films/${films.id}` , {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(soldOut)
        })
    }
}
})
}

//*Beginning of the javascript code for the collapsible sidebar*//
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
