const { Coin, MsgTransfer, Height } = require('@initia/initia.js');
const { getRandomInt } = require('../utils');

async function msgTransferToken(lcd, wallet, callback) {
    try {
        const msg = new MsgTransfer(
            'transfer',
            'channel-310',
            new Coin('uinit', `${getRandomInt(2000000, 3500000)}`),
            wallet.key.accAddress,
            wallet.key.accAddress,
            new Height(0, 0),
            '1731280445116000000'
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
    msgTransferToken
};

