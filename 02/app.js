if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js')
    .then( reg => {
        Notification.requestPermission().then ( result => {
            console.log(result);
            reg.showNotification('Hola mundo');
        })
    })
}