const { MsgSend } = require('@initia/initia.js');
const { getRandomInt } = require('../utils');

const addresses = [
    'init1ntj7tfv44mksqrjwdlsw0serfp2a8vzm0em4p4',
    'init1y3z0lrq3m34uxw9z5kghnq9n2tgws2d308fqgv',
    'init1zq74dq4aagnctntv3ty26tjtdfz9fyf033jqm6',
    'init1kvewuzt67j9fg0f8fmyx0mufpexeu4e23dle4t',
    'init1yzalwgxnkqa99530ps4spjral90d3wg5lwe6va',
    'init1aqnjm3j4yses8umzpeqtf3hk8426psf6dpf0yj',
    ''
];

const sendToken = async (lcd, wallet, index, callback) => {
    try {
        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            const msg = new MsgSend(
                wallet.key.accAddress,
                address,
                // '2000000utuc'
                // "4000000move/944f8dd8dc49f96c25fea9849f16436dcfa6d564eec802f3ef7f8b3ea85368ff"
                `${getRandomInt(5000000, 9000000)}uinit`,
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
