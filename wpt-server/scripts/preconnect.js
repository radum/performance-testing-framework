// https://andydavies.me/blog/2019/08/07/experimenting-with-link-rel-equals-preconnect-using-custom-script-injection-in-webpagetest/
// Experimenting With Link Rel=preconnect Using Custom Script Injection in WebPageTest
(function () {
    // More origins can be added to the entries array as needed,
    // and if an origin serves fonts the crossOrigin: 'anonymous' property should be added too.
    // var entries = [
    //     {'href': 'https://res.cloudinary.com'},
    //     {'href': 'https://res.cloudinary.com', 'crossOrigin': 'anonymous'}
    // ];
    var entries = [
        {'href': 'https://res.cloudinary.com'}
    ];
 
    var fragment = document.createDocumentFragment();
    for(entry of entries) {
        var link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = entry.href;
        if(entry.hasOwnProperty('crossOrigin')) {
                link.crossOrigin = entry.crossOrigin;
        }
        fragment.appendChild(link);
    }
    document.head.appendChild(fragment);
    performance.mark('wpt.injectEnd'); // Not essential 
 })();