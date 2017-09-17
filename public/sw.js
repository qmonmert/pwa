self.addEventListener('install', function() {
    console.log('SW installed');
    caches.open('static')
        .then(function(cache) {
            // cache.add('/');
            // cache.add('/index.html');
            // cache.add('/src/js/app.js');
            cache.addAll([
                '/',
                '/index.html',
                '/src/js/app.js',
                '/src/css/style.css',
                '/src/images/iphone_x.jpg',
                'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css'
            ]);
        })
});

self.addEventListener('activate', function() {
    console.log('SW activated');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(res) {
                if (res) {
                    return res;
                } else {
                    return fetch(event.request);
                }
            })
    );
});