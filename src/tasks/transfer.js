const { Coin, MsgTransfer, Height } = require('@initia/initia.js');

async function transferToken(lcd, wallet, callback) {

    try {
        const msg = new MsgTransfer(
            'transfer',
            'channel-0',
            new Coin('ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5', '1000000'),
            wallet.key.accAddress,
            '0x1::cosmos::transfer',
            new Height(0, 0),
            '1729175743696000000',
            '{"move":{"message":{"module_address":"0x1","module_name":"cosmos","function_name":"transfer","type_args":[],"args":["K2luaXQxOG40amNwcXZmMjI1dXRzMHlsN3NjaHp4N2ZxZTVsd3lsZHBnbTc=","KYJNlS4DVJD651Z97qXxW1BKaPpzYQBjwWCrH6h91gk=","QEIPAAAAAAA=","CHRyYW5zZmVy","CWNoYW5uZWwtMA==","AAAAAAAAAAA=","AAAAAAAAAAA=","QKGPDqky2Bc=","AA=="]}}}'
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
    transferToken
};

