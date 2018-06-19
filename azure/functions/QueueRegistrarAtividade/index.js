module.exports = function(context, mySbMsg) {
    var arangojs = require("arangojs");
    var db = new arangojs.Database('https://<SERVER>:<PORT>');
    db.useBasicAuth("<USER>", "<PASS>");
    db.useDatabase("<DB_NAME>");

    // Coleções
    ativCol = db.collection('Atividades');
    logCol = db.collection('Logs');

    // Dados da Atividade
    doc_ativ = {
        azure_id: context.executionContext.invocationId,
        uuid_dispositivo: mySbMsg.uuid_dispositivo,
        uuid_atividade: mySbMsg.uuid_atividade,
        placa: mySbMsg.placa,
        timestamp: mySbMsg.timestamp
    };

    // Dados do Log
    doc_log = {
        azure_id: context.executionContext.invocationId,
        mensagem: mySbMsg,
        origem: 'QueueRegistrarAtividade',
        timestamp: new Date()
    };

    // Salva atividade
    ativCol.save(doc_ativ).then(
        meta => {
            context.log('(S) Atividade:', meta._rev);
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
            context.error('(E) Atividade:', err);
            context.done();
        }
    );
};