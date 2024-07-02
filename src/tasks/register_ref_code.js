const { MsgExecute } = require('@initia/initia.js');
const { bcs } = require('@mysten/bcs');
const { getRandomInt } = require('../utils');

const refs = [
    'QYO4RRSJ',
    'TWIW26Z8',
    'P7ML915X',
    'G1285YIL',
    'SJB7A3YP'
]

async function setRef(lcd, wallet, callback) {
    try {
        const serializedString = bcs.string().serialize(refs[getRandomInt(0, refs.length)]);
        const base64string = serializedString.toBase64();

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'initia_xp',
            'register_referral_code',
            undefined,
            [base64string]
        );

        const signedTx = await wallet.createAndSignTx({
            msgs: [msg],
        });

        const broadcastResult = await lcd.tx.broadcast(signedTx);
        console.log(broadcastResult);

        if (broadcastResult.raw_log !== '') {
            callback(false);
        } else {
            callback(true)
        }
    } catch (err) {
        console.log('swap error: ', err);
        callback(false);
    }
};

module.exports = {
    setRef
};

