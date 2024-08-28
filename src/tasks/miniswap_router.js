const { bcs, MsgExecute } = require('@initia/initia.js');
const { getRandomInt } = require('../utils');

const amounts = [
    'wMYtAAAAAAA', // 3
    'oCUmAAAAAAA', // 2.5
    'gIQeAAAAAAA' // 2
]

async function miniSwapRouter(lcd, wallet, callback) {
    try {

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
            'minitswap_router',
            'swap',
            undefined,
            // [
            //     "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=",
            //     "JjnYP0/zx59/+jgNkDxgaXtMMsnK+o/d4vH3JyELlSQ=",
            //     amounts[getRandomInt(0, amounts.length)],
            //     bcs.address().serialize(wallet.key.accAddress).toBase64(),
            //     "AQ==",
            //     "AA==",
            //     "AYTdFgAAAAAA",
            //     "AQEAAAAAAAAA"
            // ]

            [
                "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=",
                "JjnYP0/zx59/+jgNkDxgaXtMMsnK+o/d4vH3JyELlSQ=",
                "oIYBAAAAAAA=",
                bcs.address().serialize(wallet.key.accAddress).toBase64(),
                "AA==",
                "AA==",
                "Afp+AQAAAAAA",
                "AQEAAAAAAAAA"
            ]
            [
                "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=",
                "JjnYP0/zx59/+jgNkDxgaXtMMsnK+o/d4vH3JyELlSQ=",
                "QEIPAAAAAAA=",
                bcs.address().serialize(wallet.key.accAddress).toBase64(),
                "AA==",
                "AA==",
                "AXYMDwAAAAAA",
                "AQEAAAAAAAAA"
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
    miniSwapRouter
};

