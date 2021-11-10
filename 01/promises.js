console.log('test pwa´s');

function sumarUno(num) {
    return new Promise( function(resolve, reject){
        if(num > 5){
            reject('Numero muy alto');
        }
        setTimeout(function(){
            resolve(num+1);
        }, 900);
    })
}

function sumarDos(num) {
    return new Promise( function(resolve, reject){
        if(num > 10){
            reject('Numero muy alto');
        }
        setTimeout(function(){
            resolve(num+2);
        }, 300);
    })
}

sumarUno(3)
.then(newNum => {
    console.log('Promise');
    console.log(newNum);
})
.catch( error => {
    console.log('Error en la promesa');
    console.log(error);
})

let promesas = [sumarUno(3), sumarDos(7)];

Promise.all(promesas)
.then( responses => {
    console.log('Promise ALL');
    console.log(responses);
});

Promise.race(promesas)
.then( response => {
    console.log('Promise RACE');
    console.log(response);
});