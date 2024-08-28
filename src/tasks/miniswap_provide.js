const { bcs, MsgExecute } = require('@initia/initia.js');


async function miniswapProvide(lcd, wallet, callback) {
    try {

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x1',
            'dex',
            'single_asset_provide_liquidity_script',
            undefined,
            ["s/TSKnNzlI0a/OECOi6HVCXMwYLYI7cU4Zp6iX/bF9U=", "7Xoi5MNRmKMo0nGTH9xzQjM+LrGVP+b8DDcDi2RUG68=", "IE4AAAAAAAA=", "AdkoAAAAAAAA"]
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
    miniswapProvide
};

