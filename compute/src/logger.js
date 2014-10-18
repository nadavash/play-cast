
/**
 * Debug to console
 * @param {String} con - e.g. log, warn, error
 * @param {String} type - e.g. log, info, warning, error
 * @param {Arguments} args
 */
function debug(con, type, args) {
    console[con].apply(console,
        ['[' + type + ']'].concat(Array.prototype.slice.call(args, 0))
    );
}

module.exports = {

    info: function() {
        debug('log', 'INFO', arguments);
    },

    error: function() {
        debug('error', 'ERR ', arguments);
    },

    warn: function() {
        debug('warn', 'WARN', arguments);
    }
}
