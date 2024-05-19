const { MsgExecute } = require('@initia/initia.js');
const { bcs } = require('@mysten/bcs');


const mintNFTPart = async (lcd, wallet, nftPartNo) => {
    try {
        const buffer = Buffer.from([nftPartNo]);
        const nft_base64 = buffer.toString('base64');

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'jennie',
            'mint_part',
            undefined,
            [nft_base64]
        );

        const signedTx = await wallet.createAndSignTx({
            msgs: [msg],
        });

        const broadcastResult = await lcd.tx.broadcast(signedTx);
        console.log(broadcastResult);
    } catch (err) {
        console.log('mint part error: ', nftPartNo, err)
    }
};

module.exports = {
    mintNFTPart
}
