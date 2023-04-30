let btn = document.querySelector('#button');
let result = document.querySelector('#result');
let eman = document.querySelector('#name');
btn.addEventListener('click', palinDrome)

function palinDrome() {
    const names = document.querySelector('input').value
    const url = `/names`
    fetch(url, {
        headers: {
            "Content-Type": "application/json",

        }, method: 'POST', body: JSON.stringify({ names: names })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            result.textContent = data.result;
        });
}

btn.addEventListener('click', palinDrome)
