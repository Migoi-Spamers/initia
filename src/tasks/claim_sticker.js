const { bcs, MsgExecute } = require('@initia/initia.js');

const baseUrl = (address, week) => `https://xp-api.initiation-1.initia.xyz/xp/weekly/${address}/${week}`;

async function getSignature(address, week) {
    try {
        const response = await fetch(baseUrl(address, week));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.signature;
    } catch (error) {
        console.error(`Failed to fetch claim data: ${address}:`, error);
        return [];
    }
}

async function claimSticker(lcd, wallet, callback) {
    try {
        const signature = await getSignature(wallet.key.accAddress, 12);

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'jennie',
            'upgrade_frame',
            undefined,
            [
                "DA==",
                bcs.vector(bcs.u8()).serialize(Buffer.from(signature, 'base64')).toBase64()
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
    claimSticker
};

