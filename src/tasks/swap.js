const { MsgExecute, MsgDelegate } = require('@initia/initia.js');
const { coins } = require('@cosmjs/amino');

async function swap(lcd, wallet) {
    try {
        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x1',
            'dex',
            'swap_script',
            undefined,
            // ["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=","jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=","wMYtAAAAAAA=","AVNZKQAAAAAA"] // 3 INIT
            ["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "wMYtAAAAAAA=", "AA=="]
        );

        const signedTx = await wallet.createAndSignTx({
            msgs: [msg],
        });

        const broadcastResult = await lcd.tx.broadcast(signedTx);
        console.log(broadcastResult);
    } catch (err) {
        console.log('swap error: ', err);
    }
};

module.exports = {
    swap
};

