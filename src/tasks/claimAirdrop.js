const { MsgExecute } = require('@initia/initia.js');


const claimAirdrop = async (lcd, wallet, callback) => {
    try {
        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'jennie',
            'claim_filet_airdrop_for_ghost_jennie'
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
    claimAirdrop
}
