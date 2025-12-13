// Front end JavaScript code goes here
//initial pop-up when page loads
const popup = document.getElementById('popup');

const closePopup = document.getElementById('close');

document.addEventListener('DOMContentLoaded', () => {
    popup.style.display = 'flex'
})

closePopup.addEventListener('click', () => {
    popup.style.display = 'none'
})
