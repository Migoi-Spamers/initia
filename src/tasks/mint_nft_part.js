const { MsgExecute } = require('@initia/initia.js');
const { bcs } = require('@mysten/bcs');
const { checkAddress } = require('./checkClaimable');

const baseUrl = 'https://xp-api.initiation-1.initia.xyz/xp/mint_parts/';

const mintNFTPart = async (lcd, wallet, callback) => {
    try {
        const response = await fetch(`${baseUrl}${wallet.key.accAddress}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const tasks = await response.json();

        for (let index = 0; index < 6; index++) {
            try {

                const task = tasks[index];
                console.log(task);

                const { signature, task_id } = task;
                const signatureBase64 = bcs.vector(bcs.u8()).serialize(Buffer.from(signature, 'base64')).toBase64();

                const nft_base64 = Buffer.from([task_id]).toString('base64');

                console.log(task_id)

                const msg = new MsgExecute(
                    wallet.key.accAddress,
                    '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
                    'jennie',
                    'mint_part_v2',
                    undefined,
                    [nft_base64, signatureBase64]
                );

                const signedTx = await wallet.createAndSignTx({
                    msgs: [msg],
                });

                const broadcastResult = await lcd.tx.broadcast(signedTx);
                console.log(broadcastResult);
            } catch (err) { 
                console.log(err);
            }
        }
        // if (broadcastResult.raw_log !== '') {
        // callback();
        // }
    } catch (err) {
        console.log('mint part error: ', err);
        // callback();
    }
};

module.exports = {
    mintNFTPart
}
