const { Coin, MsgInitiateTokenWithdrawal } = require('@initia/initia.js');

async function opTransfer(lcd, wallet, callback) {

    try {
        const msg = new MsgInitiateTokenWithdrawal(
            wallet.key.accAddress,
            wallet.key.accAddress,
            new Coin('l2/afaa3f4e1717c75712f8e8073e41f051a4e516cd25daa82d948c4729388edefd', '1000000'),
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
    opTransfer
};

