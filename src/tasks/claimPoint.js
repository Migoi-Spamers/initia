const { MsgExecute } = require("@initia/initia.js");
const { bcs } = require("@mysten/bcs");
const { checkAddress } = require("./checkClaimable");

const baseUrl = 'https://xp-api.initiation-1.initia.xyz/xp/claimable/';

async function _checkAddress(address) {
    try {
        const response = await fetch(`${baseUrl}${address}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.claimable_list;
    } catch (error) {
        console.error(`Failed to fetch claim data: ${address}:`, error);
        return [];
    }
}

async function claimPoint(lcd, wallet, callback) {
    try {
        const claimableList = await _checkAddress(wallet.key.accAddress);
        const msgs = [];

        for (let index = 0; index < claimableList.length; index++) {
            const claimable = claimableList[index];

            const msg = new MsgExecute(
                wallet.key.accAddress,
                '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
                'initia_xp',
                'claim_point',
                undefined,
                [
                    bcs.u64().serialize(claimable.stage).toBase64(),
                    bcs.vector(bcs.vector(bcs.u8())).serialize(claimable.merkle_proofs.map(ko => Buffer.from(ko, 'base64'))).toBase64(),
                    bcs.u64().serialize(claimable.task_point).toBase64(),
                    bcs.u64().serialize(claimable.referral_point).toBase64()
                ]
            );

            msgs.push(msg);
        }

        const signedTx = await wallet.createAndSignTx({
            msgs: msgs,
        });

        const broadcastResult = await lcd.tx.broadcast(signedTx);
        console.log(broadcastResult);
        if (broadcastResult.raw_log !== '') {
            callback(false);
        } else {
            callback(true);
        }
    } catch (err) {
        console.log('error', err);
        callback(false);
    }
}

module.exports = {
    claimPoint
}
