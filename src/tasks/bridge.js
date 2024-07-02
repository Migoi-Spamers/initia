const { MsgExecute, bcs } = require('@initia/initia.js');

const tucan = {
    offerMetaData: '0x8e4733bdabcf7d4afc3d14f0dd46c9bf52fb0fce9e4b996c939e195b8bc891d9',
    amount: "1000000",
    minOutput: "995000",
    opBridgeId: "14"
};

const blackwing = {
    offerMetaData: '0x8e4733bdabcf7d4afc3d14f0dd46c9bf52fb0fce9e4b996c939e195b8bc891d9',
    amount: "1000000",
    minOutput: "995000",
    opBridgeId: "8"
};

async function bridge(lcd, wallet, callback) {
    const targetLayer = tucan;

    try {
        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
            'swap_transfer',
            'mixed_route_swap_deposit',
            undefined,
            [
                bcs.address().serialize(targetLayer.offerMetaData).toBase64(),
                bcs.vector(bcs.vector(bcs.vector(bcs.u8()))).serialize([]).toBase64(),
                bcs.u64().serialize(targetLayer.amount).toBase64(),
                bcs.option(bcs.u64()).serialize(targetLayer.minOutput).toBase64(),
                bcs.u64().serialize(targetLayer.opBridgeId).toBase64(),
                bcs.address().serialize(wallet.key.accAddress).toBase64(),
                bcs.vector(bcs.u8()).serialize([]).toBase64()
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
    bridge
};

