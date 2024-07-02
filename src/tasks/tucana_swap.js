const { MsgExecute } = require('@initia/initia.js');

async function tucanaSwap(lcd, wallet, callback) {
    try {
        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x8609f642a8ab1c13d661c14d733cab227bba15635a730af2057051b3f2ada3f6',
            'router',
            'swap',
            [],
            ["FrbuJROsvX9uKlyA1LMdS9QsSwfe5LOLvx2xOzAwk+E=", "AA==", "AQ==", "sK0BAAAAAAA=", "WJgBAAAAAAA=", "rzMbqDJ/uzWxxP7/AAAAAA=="]
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
    tucanaSwap
};

