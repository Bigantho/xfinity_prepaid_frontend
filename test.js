const soap = require('soap');

const endpoint = 'https://backoffice.voipinnovations.com/Services/APIService.asmx?WSDL';







soap.createClient(endpoint, (err, client) => {
    if (err) {
        console.error('Error al crear el cliente SOAP:', err);
        return;
    }
  
    // queryDID(err, client);
    // getDIDs(err, client);
    // reserveDID(err, client);
    // assignDID(err, client);
    releaseDID(err, client);
});


const releaseDID = function (err, client) {
    // To delete the number
    const phoneNumber = '7033487652';

    const args = {
        login: login,
        secret: secret,
        didParams: {
            DIDParam: [
                {	'tn': phoneNumber,
                }
            ]
        } 
    };

    client.releaseDID(args, (err, result) => {
        if (err) {
            console.error('Error al llamar al método releaseDID:', err);
            return;
        }

        console.log("Respuesta del servicio: ", result);
        console.log("\n");
        console.table(result.releaseDIDResult.DIDs.DID);
    });
};


const assignDID = function (err, client) {
    // To buy totally the number
    const tier = 2;
    const endpointGroup = tier === 0 ? 11799 : 12363;
    const phoneNumber = '7033487652'; // to buy

    const args = {
        login: login,
        secret: secret,
        didParams: {
            DIDParam: [
                {	'tn'    : phoneNumber,
                    'cnam'  : '',
                    'refId' : null,
                    'epg'   : endpointGroup,
                }
            ]
        } 
    };

    client.assignDID(args, (err, result) => {
        if (err) {
            console.error('Error al llamar al método assignDID:', err);
            return;
        }

        console.log("Respuesta del servicio: ", result);
        console.log("\n");
        console.table(result.assignDIDResult.DIDs.DID);
    });
};


const reserveDID = function (err, client) {

    const tier = 2;
    const endpointGroup = tier === 0 ? 11799 : 12363;
    const phoneNumber = '7033487652'; // to buy

    const args = {
        login: login,
        secret: secret,
        didParams: {
            DIDParam: [
                {	'tn'    : phoneNumber,
                    'cnam'  : '',
                    'refId' : null,
                    'epg'   : endpointGroup,
                }
            ]
        } 
    };

    client.reserveDID(args, (err, result) => {
        if (err) {
            console.error('Error al llamar al método reserveDID:', err);
            return;
        }

        console.log("Respuesta del servicio: ", result);
        console.log("\n");
    });
};


const getDIDs = function (err, client) {
    // To search number availables
    const args = {
        state: 'VA',
        npa: '703', //area code
        // nxx: null,
        // tier: '1', // only tier: 0 & 1
        sms: 1, // allow sms 
        login: login,
        secret: secret
    };
    
    client.getDIDs(args, (err, result) => {
        if (err) {
            console.error('Error al llamar al método getDIDs:', err);
            return;
        }

        console.log("Respuesta del servicio: ", result);
        console.log("\n");
        
        if(result.getDIDsResult.DIDLocators){
            console.table(result.getDIDsResult.DIDLocators.DIDLocator);
        }else{
            console.log('Message: ' + result.getDIDsResult.responseMessage);
        }
    });
};


const queryDID = function (err, client) {
    // Para el estado del numero, o disponibilidad
    const phoneNumber = '7033487652';

    const args = {
        did: phoneNumber,
        login: login,
        secret: secret
    };
    
    client.queryDID(args, (err, result) => {
        if (err) {
            console.error('Error al llamar al método queryDID:', err);
            return;
        }
        
        console.log('Respuesta del servicio:', result);
    });
};
