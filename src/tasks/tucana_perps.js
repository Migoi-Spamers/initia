const { MsgExecute, bcs } = require('@initia/initia.js');

async function tucanaPerps(lcd, wallet, callback) {
    try {

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x298A9DC53EDA7750A5683960B01775D3A34DDB5F',
            'router',
            'add_liquidity',
            undefined,
            [
                "oIYBAAAAAAA=",
                "64WvP6wAJgs/gCqhuEQ9pXGrKKgjuk08mCVTuXJ2Jd8=",
                bcs.address().serialize(wallet.key.accAddress).toBase64(),
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
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
    tucanaPerps
};

