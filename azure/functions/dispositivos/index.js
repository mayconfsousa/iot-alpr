module.exports = function (context, req) {
    var dispositivoId = context.bindingData.id;
    
    var contDone = (status, body) => {
        context.res = {
            status,
            body,
            headers: { 'Content-Type': 'application/json' }
        };
        context.done();
    };
    var getDispositivo = result => {
        if ( result.length > 0 ) {
            var sbMsg = {
                uuid_dispositivo: result[0].uuid_dispositivo,
                name: result[0].name,
                latitude: result[0].latitude,
                longitude: result[0].longitude,
                timestamp: result[0].timestamp
            }
            contDone(409, sbMsg);
        } else {
            const uuidv4 = require('uuid/v4');
            var sbMsg = {
                uuid_dispositivo: uuidv4(),
                name: req.body.name,
                latitude: req.body.latitude || null,
                longitude: req.body.longitude || null,
                timestamp: req.body.timestamp || new Date()
            }
            context.bindings.outputSbMsg = sbMsg;
            contDone(200, sbMsg);
        }
    };
    var getSuccess = result => {
        var bodyResult = dispositivoId ? result[0] : result
        contDone(200, bodyResult);
    };
    var getError = err => {
        contDone(400, { message: "Erro ao executar consulta", error: err });
    };

    switch( req.method ) {
        case 'POST':
            if ( !dispositivoId ) {
                dispositivoId = req.body.uuid_dispositivo;
            }

            // Valida Name
            if ( !req.body.name ) {
                context.res = {
                    status: 400,
                    body: { message: "Informar nome do dispositivo" }
                };
                context.done();
                break;
            }

            // Verifica se Dispositivo está cadastrado
            var arangojs = require("arangojs");
            var db = new arangojs.Database('https://<SERVER>:<PORT>');
            db.useBasicAuth("<USER>", "<PASS>");
            db.useDatabase("<DB_NAME>");

            var aql = "FOR d IN Dispositivos"
                    + "    FILTER d.name == '" + req.body.name + "'"
                    + "    RETURN { "
                    + "        uuid_dispositivo: d.uuid_dispositivo, "
                    + "        name: d.name,"
                    + "        latitude: d.latitude,"
                    + "        longitude: d.longitude,"
                    + "        timestamp: d.timestamp"
                    + "    }";
            db.query(aql).then(cursor => cursor.all()).then(getDispositivo, getError);
            break;

        case 'GET':
            var arangojs = require("arangojs");
            var db = new arangojs.Database('https://<SERVER>:<PORT>');
            db.useBasicAuth("<USER>", "<PASS>");
            db.useDatabase("<DB_NAME>");

            var filterDisp = "";
            if ( dispositivoId ) {
                filterDisp = "    FILTER doc.uuid_dispositivo == '" + dispositivoId + "' ";
            }

            var aql = "FOR doc IN Dispositivos" 
                    + "    SORT doc.name"
                    + filterDisp 
                    + "    RETURN {"
                    + "        uuid_dispositivo: doc.uuid_dispositivo,"
                    + "        name: doc.name,"
                    + "        latitude: doc.coordinate[0],"
                    + "        longitude: doc.coordinate[1],"
                    + "        timestamp: doc.timestamp"
                    + "    }";
            db.query(aql).then(cursor => cursor.all()).then(getSuccess, getError);
            break;

        default:
            contDone(400, { message: "Método não implementado" });
    }
};