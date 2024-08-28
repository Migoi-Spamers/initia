const { bcs, MsgExecute, MsgVote } = require('@initia/initia.js');
const { getRandomInt } = require('../utils');

const baseUrl = (address, cycle = 1) => `https://vip-api.initiation-1.initia.xyz/gauge_vote/results/${address}/${cycle}`;

async function getSignature(address) {
    try {
        const response = await fetch(baseUrl(address));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch claim data: ${address}:`, error);
        return [];
    }
}

async function vote(lcd, wallet, callback) {
    try {
        const {
            voting_power,
            merkle_proofs
        } = await getSignature(wallet.key.accAddress);

        const msg = new MsgExecute(
            wallet.key.accAddress,
            "0x95691e3da5230f783140af54d56f9d958d0bc85f",
            "vip_weight_vote",
            "vote",
            [],
            [
                "AQAAAAAAAAA=",
                bcs.vector(bcs.vector(bcs.u8())).serialize(
                    merkle_proofs.map(qt => Buffer.from(qt, "base64"), {
                        size: 1000000
                    })
                ).toBase64(),
                bcs.u64().serialize(voting_power).toBase64(),
                "AQ4AAAAAAAAA",
                "AQAAZKeztuANAAAAAAAAAAA="
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
    vote
};

