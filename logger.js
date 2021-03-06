// Prepare Log
let logger = null;

// Module Base
const logBase = async  function (type, args) {

    // Production
    if (!require('./isEmulator')()) {

        // Try Get Log
        if (!logger) {
            try {
                logger = require("firebase-functions/lib/logger");
            } catch (err) {
                logger = null;
                console.error('Firebase Logger Module not found or something happened.');
            }
        }

        // Exist Log
        if (logger) {
            const result = await logger[type].apply(logger, args);
            return {
                result: result,
                type: 'firebase-functions/lib/logger'
            };
        }

        // Nope
        else {
            return {
                result: console[type].apply(console, args),
                type: 'console/javascript-vanilla'
            };
        }

    }

    // Nope
    else {
        return {
            result: console[type].apply(console, args),
            type: 'console/javascript-vanilla'
        };
    }

};

// Module
module.exports = {

    // Log
    log: function () { return logBase('log', arguments); },

    // Info
    info: function () { return logBase('info', arguments); },

    // Warn
    warn: function () { return logBase('warn', arguments); },

    // Error
    error: function () { return logBase('error', arguments); },

};