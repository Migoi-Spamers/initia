const { MsgSend } = require('@initia/initia.js');

const addresses = [
    'init1fteryjt38dfsf76nzjx2psm3up6atkcfuz4stw'
];

const sendToken = async (lcd, wallet, index, callback) => {
    try {
        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            const msg = new MsgSend(
                wallet.key.accAddress,
                address,
                // '2000000utuc'
                "2000000move/944f8dd8dc49f96c25fea9849f16436dcfa6d564eec802f3ef7f8b3ea85368ff"
                // `${getRandomInt(1000000, 2000000)}uinit`,
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
        }
    } catch (err) {
        console.log("Stake 1 init err", err);
        callback(false); ','
    }
};

module.exports = {
    sendToken
};
