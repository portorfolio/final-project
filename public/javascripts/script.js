document.addEventListener('DOMContentLoaded', () => {
    //initial pop-up when page loads
    const popup = document.getElementById('popup');

    const closePopup = document.getElementById('close');
    overlay.style.display = 'block'
    popup.style.display = 'flex'

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none'
        overlay.style.display = 'none'
    })

    //drag and drop coins to fountain event
    const fountain = document.getElementById('fountain')
    const coins = document.querySelectorAll('.coin')

    //attaches dragstart to each coin in the coin collection
    coins.forEach(coin => {
        coin.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text/plain", event.target.id)
        })
    })

    fountain.addEventListener('dragover', (event) => {
        event.preventDefault()
    })

    fountain.addEventListener('drop', (event) => {
        event.preventDefault()
        const coinId = event.dataTransfer.getData("text/plain")
        console.log('Dropped coin:', coinId)

        tossCoin(coinId)
    })

    //fetch backend route to connect with frontend to allow coin count iteration
    async function tossCoin(coinId) {
        try {
            const res = await fetch(`/coins/toss/${coinId}`, {
                method: 'PUT'
            })

            //run functions only if sidebar is open
            if (sidebarOpen) {
                const stats = await getStats()
                updateStats(stats)
            }

            //console log data regardless
            console.log(stats)
        } catch (error) {
            console.log(error)
        }
    }

    //fetch backend stats to connect with frontend
    async function getStats() {
        try {
            const res = await fetch('/coins/stats')
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    //to update stats when a coin is thrown
    function updateStats() {

    }

    //sidebar and its elements
    const sidebar = document.getElementById('sidebar')
    let sidebarOpen = false
    const filterBtn = document.getElementById('coin-filter')
    const openBtn = document.getElementById('openSidebar')
    const closeBtn = document.getElementById('closeSidebar')

    function openSidebar() {
        sidebar.style.width = "25%";
        sidebarOpen = true
        filterBtn.style.display = 'block'
        openBtn.style.display = 'none'
        closeBtn.style.display = 'block'
    }

    openBtn.addEventListener('click', openSidebar)

    function closeSidebar() {
        sidebar.style.width = "0%";
        sidebarOpen = false
        filterBtn.style.display = 'none'
        openBtn.style.display = 'block'
        closeBtn.style.display = 'none'
    }

    closeBtn.addEventListener('click', closeSidebar)
})
