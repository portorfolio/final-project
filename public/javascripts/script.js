// Front end JavaScript code goes here

const { default: tippy } = require("tippy.js");

//initial pop-up when page loads
const popup = document.getElementById('popup');

const closePopup = document.getElementById('close');

document.addEventListener('DOMContentLoaded', () => {
    popup.style.display = 'flex'
})

closePopup.addEventListener('click', () => {
    popup.style.display = 'none'
})

tippy('#coin-stats', {
    allowHTML: true,
    interactive: true,
    trigger: 'mouseenter click',
    onShow: async (coinDetails) => {
        try {
            const res = await fetch('/coins/stats')
            const coinData = await res.json();

            coinDetails.setContent(`
                Total Coins: ${coinData.totalCoins}<br>
                Total Value: $${coinData.totalValue}<br>
                Coin Types: ${coinData.CoinBreakdown}`)
        } catch (error) {
            instance.setContent('Could not load')
        }
    }

})