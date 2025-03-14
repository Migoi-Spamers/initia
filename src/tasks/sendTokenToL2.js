const { MsgInitiateTokenDeposit, Coin } = require('@initia/initia.js');
const { getRandomInt } = require('../utils');

const bridge_ids = [
    8, // blackwing
    6, // init AI
    14, // tucan
    2, // miniwasm
    17, // noon
    1, // minimove
    24, // civita
    98, // milkyway
]

async function sendTokenToL2(lcd, wallet, callback) {
    const bridge_id = bridge_ids[7];

    try {
        const msg = new MsgInitiateTokenDeposit(
            wallet.key.accAddress,
            bridge_id,
            wallet.key.accAddress,
            new Coin('uinit', `${getRandomInt(1500000, 3000000)}`)
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
    sendTokenToL2
};

