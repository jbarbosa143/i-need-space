const sub = document.querySelector('#search');
const loc = document.querySelector('#address');
const userApi = document.querySelector('#api-key');
const norSat = document.querySelector('#norad');
const whenInfo = document.querySelector('.when');

sub.addEventListener('click', function(){
    // console.log('i was clicked');
    // console.log(loc.value);
    // console.log(userApi.value);
    // console.log(norSat.value);
    
    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc.value}.json?access_token=${userApi.value}`;
    
    const encoded = encodeURI(URL);
    
    // console.log('encoded',encoded);
    // console.log('url:', URL);
    fetch(encoded)
    
    .then((res) => res.json())
    
    .then((json) => {
        const long = json.features[0].center[0];
        const lati = json.features[0].center[1];
        // console.log(json)
        console.log('Long', long);
        console.log('lat', lati);
        const satUrl = `https://satellites.fly.dev/passes/${norSat.value}?lat=${lati}&lon=${long}&limit=1&days=15&visible_only=true`;
        
        const coded = encodeURI(satUrl);
        
        fetch(coded)
        
        .then((res) => res.json())
        
        .then((json) => {
            console.log('satJson', json);
            const rise = json[0].rise.utc_datetime;
            const culm = json[0].culmination.utc_datetime;
            const set = json[0].set.utc_datetime;
            console.log('rise:',rise);
            console.log('cul:',culm);
            console.log('set:', set)

    let newHtml = 
        `<div class = "sat-loc">
        <h2>Here Your Info on the Next time!</h2>
            <h3>Rise<h3>
            <p>${rise}</p>
            <h3>Culminate<h3>
            <p>${culm}</p>
            <h3>Set<h3>
            <p>${set}</p>
        <div>`  
    whenInfo.innerHTML +=newHtml;
        })

    })

})


