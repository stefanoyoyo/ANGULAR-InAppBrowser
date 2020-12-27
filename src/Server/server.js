//#region Variables
let webSiteHtml = null;

//#endregion

//#region libraries
const http = require('http');
const { promise } = require('protractor');
//#endregion 




const requestListener = function (req, res) {
    listenToPostRequests(req, res);
    listenToGetRequests(req, res);
}

const server = http.createServer(requestListener);
server.listen(10000);


/**Funzione che permette di postare al client (i cui riferimenti sono contenuti in 'res') i dati specificati
dalla variabile 'data'*/
function postDataToClient(res, data) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});
    // Serializzo i dati da inviare
    const  dataToSend = data;
    const dataToSendAsStr = JSON.stringify(dataToSend);
    // Invio l'oggetto arricchito con l'header al client
    res.end(dataToSendAsStr);
}


/**Funzione che permette al server di ascoltare le possibili chiamate GET fatte dal client */
function listenToGetRequests() {

}

/**Funzione che permette al server di ascoltare le possibili chiamate POST fatte dal client */
function listenToPostRequests(request, response) {      
    if (request.method == 'POST') {
        console.log('POST')
        var body = ''
        // Adatto il body del messaggio inviato da client contenente la URL da esso inviata
        request.on('data', function(data) {
          body += data;
        })
        // Elaboro la post
        request.on('end', function() {
          // Visualizzo ed ottengo la url ricevuta dal client
          console.log('Body: ' + body); 
          const obj = JSON.parse(body);
          const receivedUrl = obj.url;
          getWebsiteHtmlText(receivedUrl);

          // Attendo che la variabile 'webSiteHtml' sia valorizzata. Da migliorare, rendere questa operazione
          // ASINCRONA! 
          setTimeout(() => {
            // console.log('webSiteHtml ' + webSiteHtml); 
            postDataToClient(response, webSiteHtml);
          }, 1000);          
        })
      }
}


/**Funzione che consente di recuperare il codice html della pagina raggiungibile all'URL specificato come parametro.
Restituisce una stringa contenente il codice html / css / javascript della pagina desiderata */
function getWebsiteHtmlText(url) {
    var request = require("request"); 
    request({ uri: url }, function (error, response, body) {
        webSiteHtml = body;
    });
}

