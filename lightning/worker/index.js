if(!navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('https://jayvir101.github.io/sw.js',{
        scope: 'https://jayvir101.github.io'
    })
}