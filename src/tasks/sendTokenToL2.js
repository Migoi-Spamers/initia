const { MsgInitiateTokenDeposit, Coin } = require('@initia/initia.js');

const bridge_is = [
    8, // blackwing
    6, // init AI
    14, // tucan
    2, // miniwasm
    17, // noon
    1, // minimove
    24, // civita
]

async function sendTokenToL2(lcd, wallet, callback) {
    const bridge_id = bridge_is[6];

    try {
        const msg = new MsgInitiateTokenDeposit(
            wallet.key.accAddress,
            bridge_id,
            wallet.key.accAddress,
            new Coin('uinit', '10000000')
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

