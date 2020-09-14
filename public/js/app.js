const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para1 = document.querySelector('#para-1')
const para2 = document.querySelector('#para-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    para1.textContent = 'Loading...'
    para2.textContent = ''

    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                para1.textContent = data.error
                para2.textContent = ''
            } else {
                para1.textContent = data.forecast
                para2.textContent = data.location
            }
        })
    })
})