const container = document.getElementById('container');
const fragment = document.createDocumentFragment();
const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlApi)
    .then(response => response.json())
    .then(data => {
        const queryString = location.search
        console.log(queryString)
        const params = new URLSearchParams(queryString)
        const id = params.get("id")

        const element = data.events.find(element => element._id == id)
        const cont = document.getElementById(container);
        console.log(cont)

        function showCardsDetails() {
            let card = document.createElement('div');
            card.className = "card d-flex col-xl-10 p-3 m-2 col-lg-10 p-3 m-2 col-md-10 p-3 m-2 col-sm-10 m-2 col-xs-10";
            card.innerHTML = `
        <img src="${element.image}" class="object-fit-cover p-1" alt="events">
        <div class="card-body p-1">
            <h4 class="card-title p-2">${element.name}</h4>
            <p class="fs-6 p-2">${element.description}</p>
            <p class="fs-6 p-2">Date: ${element.date}</p>
            <p class="fs-6 p-2">Category: ${element.category}</p>
            <p class="fs-6 p-2">Place: ${element.place}</p>
            <p class="fs-6 p-2">Capacity: ${element.capacity}</p>
            <p class="fs-6 p-2">Assistance: ${element.assistance}</p>
            <p class="fs-6 p-2">Price: $ ${element.price},00</p>
        </div>
        `
            container.appendChild(card);
        }

        showCardsDetails()

    })
