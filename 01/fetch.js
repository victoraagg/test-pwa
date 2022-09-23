//option 1
var request = new XMLHttpRequest();
request.open('GET', 'https://reqres.in/api/users', true);
request.send(null);
request.onreadystatechange = function(state){
    console.log(request);
    if(request.readyState == 4){
        var resp = request.response;
        var respObj = JSON.parse(resp); 
        console.log(respObj);
    }
};

//option 2
fetch('https://reqres.in/api/users')
.then(response => {
    response.json().then( data => {
        console.log(data.page);
    });
})

//test POST
let user = {
    nombre: 'VICTOR',
    edad: 33
}
fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then( response => {
    response.json().then( data => {
        console.group(data);
    })
})
.catch( error => {
    console.error('Error');
    console.log(error);
})

//test image
let imgDom = document.querySelector('img');
fetch('./image.jpg')
.then(resp => {
    resp = resp.blob().then( image => {
        var imgPath = URL.createObjectURL(image);
        imgDom.src = imgPath;
    })
});

//option clone
fetch('https://reqres.in/api/users/1')
.then(response => {
    response.clone().json().then( data => {
        console.log(data.data);
    });
    response.json().then( data => {
        console.log(data.data);
    });
})

//work 1
var swAvatar = {
    nombre: '',
    gender: ''
};
fetch('https://swapi.dev/api/people/1')
.then(response => {
    response.json().then( data => {
        swAvatar.nombre = data.name;
        swAvatar.gender = data.gender;
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify(swAvatar),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            response.json().then( data => {
                console.group(data);
            })
        })
    })
})