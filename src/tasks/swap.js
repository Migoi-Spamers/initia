const { MsgExecute } = require('@initia/initia.js');
const { getRandomInt } = require('../utils');

const pairs = [
    "2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "QEIPAAAAAAA=", "AQ+gCgAAAAAA",
    "sTSuZ4bxDvdClOYn0lGbY7fHQqZzX5hoKSn+qahHRNI=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "QEIPAAAAAAA=", "AYUlAQAAAAAA",
    "orDTyOU+N57eMfOjYf8CcW1Q7FPGtluMSKgdWwZUggA=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "QEIPAAAAAAA=", "AeIAAAAAAAAA"
];

async function swap(lcd, wallet, callback) {
    try {
        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x1',
            'dex',
            'swap_script',
            undefined,
            [
                "s/TSKnNzlI0a/OECOi6HVCXMwYLYI7cU4Zp6iX/bF9U=",
                "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=",
                "oIYBAAAAAAA=",
                "AehmAQAAAAAA"
            ]
        );

        const signedTx = await wallet.createAndSignTx({
            msgs: [msg],
        });

        const broadcastResult = await lcd.tx.broadcast(signedTx);
        console.log(broadcastResult);

        if (broadcastResult.raw_log !== '') {
            callback(false);
        } else {
            callback(true);
        }
    } catch (err) {
        console.log('swap error: ', err);
        callback(false);
    }
};

module.exports = {
    swap
};

