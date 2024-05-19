const { MsgExecute } = require('@initia/initia.js');
const { bcs } = require('@mysten/bcs');


const mintJennieNFT = async (lcd, wallet) => {
    try {
        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'jennie',
            'mint_jennie'
        );

        const signedTx = await wallet.createAndSignTx({
            msgs: [msg],
        });

        const broadcastResult = await lcd.tx.broadcast(signedTx);
        console.log(broadcastResult);
    } catch (err) {
        console.log('mint jennie error : ', err)
    }
};

module.exports = {
    mintJennieNFT
}
