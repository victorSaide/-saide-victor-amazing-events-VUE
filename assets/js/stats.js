const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlApi)
    .then(response => response.json())
    .then(data => {
        showFirstTable(data.events, "first-table")

        const secondTable = document.getElementById("second-table")
        let upcomingEvents = data.events.filter(element => element.estimate)
        showTablesByCategory(upcomingEvents, secondTable)

        const thirdTable = document.getElementById("third-table")
        let pastEvents = data.events.filter(element => element.assistance)
        showTablesByCategory(pastEvents, thirdTable)
    })

function showFirstTable(arrayEvents, tableContainer) {
    let highestAttendance = arrayEvents.filter(event => event.assistance).reduce((eventOne, eventTwo) =>
        // if((eventOne.assistance / eventOne.capacity) > (eventTwo.assistance / eventTwo.capacity)) return eventOne
        // return eventTwo
        (eventOne.assistance / eventTwo.capacity) > (eventTwo.assistance / eventTwo.capacity) ? eventOne : eventTwo
    )

    let lowestAttendance = arrayEvents.filter(event => event.assistance).reduce((eventOne, eventTwo) => {
        if ((eventOne.assistance / eventOne.capacity) < (eventTwo.assistance / eventTwo.capacity)) return eventOne
        return eventTwo
    })

    let largerCapacity = arrayEvents.reduce((eventOne, eventTwo) => {
        if (eventOne.capacity > eventTwo.capacity) return eventOne
        return eventTwo
    })

    let table = document.getElementById(tableContainer);
    table.innerHTML = `
        <tr>
            <td>${highestAttendance.name}  (${(highestAttendance.assistance * 100 / highestAttendance.capacity).toFixed(2)}%)</td>
            <td>${lowestAttendance.name} (${(lowestAttendance.assistance * 100 / lowestAttendance.capacity).toFixed(2)}%)</td>
            <td>${largerCapacity.name} (${(largerCapacity.capacity)})</td>
        </tr>
`
}

function profitsCalc(arrayEvents, categoryName) {
    let filteredArray = arrayEvents.filter(element => element.category == categoryName).reduce((total, event) => {
        if (event.assistance != undefined) return total += event.price * event.assistance
        return total += event.price * event.estimate
    }, 0)
    return filteredArray
}

function attendanceCalc(arrayEvents, categoryName) {
    let filteredArray = arrayEvents.filter(element => element.category == categoryName).reduce((total, event) => {
        if (event.assistance != undefined) return total += event.assistance / event.capacity
        return total += event.estimate / event.capacity
    }, 0)
    return (filteredArray * 100 / arrayEvents.filter(element => element.category == categoryName).length).toFixed(2)
}

function showTablesByCategory(arrayEvents, tableContainer) {
    let categories = [... new Set(arrayEvents.map(element => element.category))]

    let fragmentCode = document.createDocumentFragment()
    for (let category of categories) {
        let table = document.createElement('tr')
        table.innerHTML = `
        <td>${category}</td>
        <td>${profitsCalc(arrayEvents, category)}</td>
        <td>${attendanceCalc(arrayEvents, category)}%</td>
        `
        fragmentCode.appendChild(table)
    }
    tableContainer.appendChild(fragmentCode)
}