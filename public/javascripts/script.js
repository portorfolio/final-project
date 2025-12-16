document.addEventListener('DOMContentLoaded', () => {
    //initial pop-up when page loads
    const overlay = document.getElementById('overlay')
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
    const dropZone = document.getElementById('drop-zone')
    const coins = document.querySelectorAll('.coin')

    //tap to toss coins for mobile devices
    const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        coins.forEach(coin => {
            coin.addEventListener('click', async () => {
                const coinId = coin.id;

                await tossCoin(coinId);

                if (sidebarOpen) {
                    const stats = await getStats();
                    updateStats(stats);
                }
            });
        });
    }

    //disables drag n drop
    if (isTouchDevice) {
        coins.forEach(coin => {
            coin.setAttribute('draggable', 'false');
        });
    }

    //attaches dragstart to each coin in the coin collection
    coins.forEach(coin => {
        coin.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text/plain", event.target.id)
        })
    })

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault()
    })

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault()
        const coinId = event.dataTransfer.getData("text/plain")
        console.log('Dropped coin:', coinId)

        tossCoin(coinId)
    })

    dropZone.addEventListener('dragenter', () => {
        dropZone.classList.add('active')
    })

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('active')
    })

    dropZone.addEventListener('drop', () => {
        dropZone.classList.remove('active')
    })

    //fetch backend route to connect with frontend to allow coin count iteration
    async function tossCoin(coinId) {
        try {
            const res = await fetch(`/coins/toss/${coinId}`, {
                method: 'PUT'
            })
            const updatedStats = await res.json()

            //run functions only if sidebar is open
            if (sidebarOpen) {
                updateStats(updatedStats)
                console.log(updatedStats)
            }

        } catch (error) {
            console.log(error)
        }
    }

    //fetch backend stats to connect with frontend
    async function getStats() {
        try {
            let url = '/coins/stats'
            if (selectedCoin) {
                url += `?coin=${selectedCoin}`
            }
            const res = await fetch(url)
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    //to update stats when a coin is thrown
    function updateStats(stats) {
        console.log(stats)
        //get stats details container and clears it on default
        const statsContainer = document.getElementById('stats-content')
        statsContainer.innerHTML = ''

        //create p element for total coins and total value, changes their text content into coin stats
        const totalCoins = document.createElement('p');
        totalCoins.textContent = `Total Coins: ${stats.totalCoins}`;

        const totalValue = document.createElement('p');
        totalValue.textContent = `Total Value: $${stats.totalValue}`;

        //pushes them into the stats div
        statsContainer.appendChild(totalCoins);
        statsContainer.appendChild(totalValue);

        // loops through each coin type and gets the info for each and adds it to the stats container
        for (const coin in stats.CoinBreakdown) {
            const coinData = stats.CoinBreakdown[coin];

            const coinEl = document.createElement('p');
            coinEl.textContent = `${coin}: ${coinData.count} coins ($${coinData.dolVal})`;

            statsContainer.appendChild(coinEl);
        }
    }

    //sidebar and its elements
    const sidebar = document.getElementById('sidebar')
    let sidebarOpen = false
    let selectedCoin = null
    const filterBtns = document.querySelectorAll('.coin-filter')
    filterBtns.forEach(btn => {
        btn.style.display = 'none'
    })
    const openBtn = document.getElementById('openSidebar')
    const closeBtn = document.getElementById('closeSidebar')

    filterBtns.forEach(btn => {
        btn.addEventListener('click', async (event) => {
            const coin = event.target.dataset.coin

            if (selectedCoin === coin) {
                selectedCoin = null
            } else {
                selectedCoin = coin
            }

            if (sidebarOpen) {
                const stats = await getStats()
                updateStats(stats)
            }
        })
    })

    function openSidebar() {
        sidebar.style.width = "25%";
        sidebarOpen = true

        getStats().then(stats => updateStats(stats))
        filterBtns.forEach(btn => btn.style.display = 'block')
        openBtn.style.display = 'none'
        closeBtn.style.display = 'block'
    }

    openBtn.addEventListener('click', openSidebar)

    function closeSidebar() {
        sidebar.style.width = "0%";
        sidebarOpen = false
        filterBtns.forEach(btn => btn.style.display = 'none')
        openBtn.style.display = 'block'
        closeBtn.style.display = 'none'
    }

    closeBtn.addEventListener('click', closeSidebar)
})
