const { MsgExecute } = require('@initia/initia.js');
const { checkAddress } = require('./checkClaimable');


const feedTier = [
    "AQ==", // tier 1
    "Ag==", // tier 2
    "Aw==", // tier 3
]

const feed = async (lcd, wallet, callback) => {
    try {
        const { data2, data } = await checkAddress(wallet.key.accAddress);
        const food = JSON.parse(data.resource.move_resource).data;

        const foodBase64 = food.tier3 !== '0' ? feedTier[2] : food.tier2 !== '0' ? feedTier[1] : feedTier[0];

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'jennie',
            'feed_jennie',
            undefined,
            [foodBase64]
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
        console.log('mint jennie error : ', err);
        callback(false);
    }
};

module.exports = {
    feed
}
