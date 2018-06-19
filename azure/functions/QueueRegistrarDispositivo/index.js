module.exports = function(context, mySbMsg) {
    var arangojs = require("arangojs");
    var db = new arangojs.Database('https://<SERVER>:<PORT>');
    db.useBasicAuth("<USER>", "<PASS>");
    db.useDatabase("<DB_NAME>");

    // Coleções
    dispCol = db.collection('Dispositivos');
    logCol = db.collection('Logs');

    // Dados do Dispositivo
    doc_disp = {
        //_key: mySbMsg.uuid_dispositivo,
        azure_id: context.executionContext.invocationId,
        name: mySbMsg.name,
        coordinate: [mySbMsg.latitude, mySbMsg.longitude],
        uuid_dispositivo: mySbMsg.uuid_dispositivo,
        timestamp: mySbMsg.timestamp
    };

    // Dados do Log
    doc_log = {
        //_key: context.executionContext.invocationId,
        azure_id: context.executionContext.invocationId,
        mensagem: mySbMsg,
        origem: 'QueueRegistrarDispositivo',
        timestamp: new Date()
    };

    // Salva Dispositivo
    dispCol.save(doc_disp).then(
        meta => {
            context.log('(S) Dispositivo:', meta._rev);
            // Salva Log
            logCol.save(doc_log).then(
                meta => {
                    context.log('(S) Log:', meta._rev);
                    context.done();
                },
                err => {
                    context.error('(E) Log:', err);
                    context.done();
                }
            );
        },
        err => {
            context.error('(E) Dispositivo:', err);
            context.done();
        }
    );
};