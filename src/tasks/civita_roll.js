const { MsgExecute } = require('@initia/initia.js');


async function civitaRoll(lcd, wallet, callback) {
    try {
        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x99132d33b555cd1565c59cee1e0e4ff52fbc7fb7',
            'civitia',
            'roll_dice'
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
    civitaRoll
};

