var winston = require('winston');

function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/'); //отобразим метку с именем файла, который выводит сообщение

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: path,
                timestamp: true,
            }),
            new winston.transports.File({
                level: 'info',
                filename: './logs/all-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            })
        ]
    });
}

module.exports = getLogger;