const { createApp } = Vue;
const url = "https://mindhub-xj03.onrender.com/api/amazing"
createApp({
    data() {
        return {
            events: undefined,
            categories: undefined,
            filteredEvents: [],
            valueSearch: '',
            checked: []
        }
    },
    created() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.events = data.events.filter(event => event.category)
                this.filteredEvents = this.events
                this.categories = [... new Set(this.events.map(event => event.category))]
                console.log(this.categories)
            } )
            .catch(err => console.log(err))
    },
    methods: {
        filter(){
            this.filteredEvents = this.events.filter(event => {
                return (this.checked.includes(event.category) || this.checked.length === 0) 
                && event.name.toLowerCase().includes(this.valueSearch.toLowerCase())
            })
        }
    },
    computed: {

    }

}).mount("#app")