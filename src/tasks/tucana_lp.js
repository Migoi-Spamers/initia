const { MsgExecute } = require('@initia/initia.js');
const { getRandomInt } = require('../utils');


const LPs = [
    ["FrbuJROsvX9uKlyA1LMdS9QsSwfe5LOLvx2xOzAwk+E=", "9v///w==", "vgAAAA==", "IokBAAAAAAA=", "oIYBAAAAAAA=", "AA=="]

];

async function tucanaLp(lcd, wallet, callback) {
    try {
        const LP = LPs[getRandomInt(0, LPs.length)];

        // for (let index = 0; index < LPs.length; index++) {
        //     console.log(index);
        //     const LP = LPs[index];

        //     try {
        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x8609f642a8ab1c13d661c14d733cab227bba15635a730af2057051b3f2ada3f6',
            'router',
            'open_position_with_liquidity_with_all',
            undefined,
            LP
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
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }

    } catch (err) {
        console.log('swap error: ', err);
        callback(false);
    }
};

module.exports = {
    tucanaLp
};

