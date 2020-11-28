console.log('Client side java script')

//client side js which they can use to interact with the website

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()//prevent to refresh page everytime somthing is searched
    
    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecast
        }
    })
})
})