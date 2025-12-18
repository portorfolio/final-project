document.addEventListener('DOMContentLoaded', () => {
    //import sound 
    const coinSound = new Audio('/sounds/waterdrop.wav')
    coinSound.volume = 1

    //initial pop-up when page loads
    const overlay = document.getElementById('overlay')
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close');

    overlay.style.display = 'block'
    popup.style.display = 'flex'
    document.body.classList.add('popup-open')

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none'
        overlay.style.display = 'none'
        document.body.classList.remove('popup-open')
    })

    //drag and drop coins to fountain event
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

                if (sidebar.classList.contains('open')) {
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
            //sets it to play at 0 sec
            coinSound.currentTime = 0
            coinSound.play()

            const res = await fetch(`/coins/toss/${coinId}`, {
                method: 'PUT'
            })
            const updatedStats = await res.json()

            //run functions only if sidebar is open
            if (sidebar.classList.contains('open')) {
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
            coinEl.textContent = `${coin}: ${coinData.count}`;

            statsContainer.appendChild(coinEl);
        }
    }

    //sidebar and its elements
    const sidebar = document.getElementById('sidebar')
    let selectedCoin = null
    const filterBtns = document.querySelectorAll('.coin-filter')
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

            if (sidebar.classList.contains('open')) {
                const stats = await getStats()
                updateStats(stats)
            }
        })
    })

    function openSidebar() {
        sidebar.classList.add('open')
        getStats().then(stats => updateStats(stats))
        openBtn.style.display = 'none'
    }

    openBtn.addEventListener('click', openSidebar)

    function closeSidebar() {
        sidebar.classList.remove('open')
        openBtn.style.display = 'block'
    }

    closeBtn.addEventListener('click', closeSidebar)
})
