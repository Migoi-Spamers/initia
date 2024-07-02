const { MsgExecute } = require('@initia/initia.js');
const { checkAddress } = require('./checkClaimable');

const foodRate = [
    "AQ==", // common
    "Ag==", // rare
    "Aw==" // legendary
]

async function withdrawFood(lcd, wallet, callback) {
    try {
        const { data } = await checkAddress(wallet.key.accAddress);
        const food = JSON.parse(data.resource.move_resource).data;

        console.log(
            food,
        );

        if (
            food.tier2 !== '0' ||
            food.tier3 !== '0'
        ) {
            callback(true);
            return;
        }

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'jennie',
            'draw_food',
            undefined,
            [foodRate[1]]
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
    withdrawFood
};

