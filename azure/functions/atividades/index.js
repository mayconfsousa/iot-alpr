module.exports = function (context, req) {
    var dispositivoId = context.bindingData.dispositivoId;
    var atividadeId   = context.bindingData.atividadeId;

    var contDone = (status, body) => {
        context.res = {
            status,
            body,
            headers: { 'Content-Type': 'application/json' }
        };
        context.done();
    };
    var getSuccess = result => {
        var bodyResult = dispositivoId ? result[0] : result;
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
            // Valida ID do Dispositivo
            if ( !dispositivoId ) {
                context.res = {
                    status: 400,
                    body: { message: "Informar uuid do dispositivo (URi ou body)" }
                };
                context.done();
                break;
            }
            // Valida Placa
            if ( !req.body.placa ) {
                context.res = {
                    status: 400,
                    body: { message: "Informar a placa do veículo (body)" }
                };
                context.done();
                break;
            }

            const uuidv4 = require('uuid/v4');
            var sbMsg = {
                uuid_dispositivo: dispositivoId,
                uuid_atividade: uuidv4(),
                placa: req.body.placa,
                timestamp: req.body.timestamp || new Date()
            }

            context.bindings.outputSbMsg = sbMsg;

            context.res = {
                body: sbMsg
            };
            context.done();
            break;

        case 'GET':
            var arangojs = require("arangojs");
            var db = new arangojs.Database('https://<SERVER>:<PORT>');
            db.useBasicAuth("<USER>", "<PASS>");
            db.useDatabase("<DB_NAME>");

            var filterDisp = ""
            var filterAtiv = ""
            if ( dispositivoId ) {
                filterDisp = "FILTER d.uuid_dispositivo == '" + dispositivoId + "' "
            }
            if ( atividadeId ) {
                filterAtiv = "FILTER a.uuid_atividade == '" + atividadeId + "' "
            }

            var aql = "FOR d in Dispositivos"
                    + "    SORT d.timestamp"
                    + "    " + filterDisp 
                    + "    let ativ = ("
                    + "        FOR a IN Atividades"
                    + "            FILTER a.uuid_dispositivo == d.uuid_dispositivo"
                    + "            " + filterAtiv
                    + "            SORT a.timestamp"
                    + "            RETURN { "
                    + "                uuid_atividade: a.uuid_atividade, "
                    + "                placa: a.placa, "
                    + "                timestamp: a.timestamp "
                    + "            }"
                    + "    )"
                    + "    return { "
                    + "        uuid_dispositivo: d.uuid_dispositivo, "
                    + "        name: d.name, "
                    + "        timestamp: d.timestamp, "
                    + "        atividades: ativ "
                    + "    }";
            db.query(aql).then(cursor => cursor.all()).then(getSuccess,getError);
            break;

        default:
          contDone(400, { message: "Método não implementado" });
    }
};