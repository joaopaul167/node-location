let filiais =  {
    filiais: [
        {
            "name":"FILIAL ELDORADO DO SUL",
            "Lat":"-29.9984899",
            "Lon":"-51.306162",
        },
        {
            "name":"FILIAL FARROUPILHA",
            "Lat":"-29.2264495",
            "Lon":"-51.3469796",
        },
        {
            "name":"FILIAL GRAMADO",
            "Lat":"-29.3790463",
            "Lon":"-50.8761444",
        },                
        {
            "name":"FILIAL GUAÍBA",
            "Lat":"-30.1097202",
            "Lon":"-51.3165247",
        },                
        {
            "name":"FILIAL IVOTI",
            "Lat":"-29.5968144",
            "Lon":"-51.1632197",
        },
        {
            "name":"FILIAL LAJEADO",
            "Lat":"-29.4580257",
            "Lon":"-51.9741888",
        },
        {
            "name":"FILIAL LIVRAMENTO",
            "Lat":"-30.894797",
            "Lon":"-55.538244",
        },
        {
            "name":"FILIAL OSÓRIO",
            "Lat":"-29.8879052",
            "Lon":"-50.2671723",
        }
    ]
}        

function getCordenates(){
    let request = require('request');
    let url = `http://ip-api.com/json`
    let dados = '';

    request(url, (err, res, body) => {
        if (err) {
            console.log('error:', err);
        } else {
            let ipInfo = JSON.parse(body);
            dados = `
                IP: ${ipInfo.query}
                Country: ${ipInfo.country}
                City: ${ipInfo.city}
                Region: ${ipInfo.regionName}
                Lat: ${ipInfo.lat}
                Lon: ${ipInfo.lon}
                Organization: ${ipInfo.org}
                `
            console.log(dados);
          getCloser(ipInfo.lat,ipInfo.lon);
        }
    });
}
function getCloser(lat,lon){
    let distancia = [];
    for (let index = 0, latitude, longitude; index <= filiais.filiais.length - 1; index++) {
        latitude = (filiais.filiais[index].Lat - lat) * (filiais.filiais[index].Lat - lat);
        longitude = ( filiais.filiais[index].Lon - lon) * ( filiais.filiais[index].Lon - lon);
        distancia[index] = Math.sqrt(latitude + longitude);
    } 
    InsertionSort(distancia);
}

function InsertionSort(dist = []){
    let names = [];
    for (let z = 0; z <= filiais.filiais.length - 1; z++) {
        names[z] = filiais.filiais[z].name;
        console.log("Trazendo o item" + names[z] + " distancia de "+ dist[z]);
    }
    for (let i = 1; i < dist.length; i++) {
        let aux = dist[i];
        let auxN = names[i];
        let j = i - 1;
        while (j >= 0 && dist[j] > aux) {
            dist[j + 1] = dist[j];
            names[j + 1] = names[j];
            j -= 1;
        }
        dist[j + 1] = aux;
        names[j + 1] = auxN;
    }
    for (let i = 0; i <= dist.length - 1; i++) {
        console.log("Brach: " + names[i] + " distance = " + dist[i]);   
    }
}

getCordenates();