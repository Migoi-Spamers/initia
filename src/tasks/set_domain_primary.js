const { MsgExecute } = require('@initia/initia.js');
const { bcs } = require('@mysten/bcs');


const setPrimaryDomain = async (lcd, wallet, domainName) => {
    try {
        const serializedString = bcs.string().serialize(domainName);
        const base64string = serializedString.toBase64();

        const msg = new MsgExecute(
            wallet.key.accAddress,
            '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
            'usernames',
            'set_name',
            undefined,
            [base64string]
        );

        const signedTx = await wallet.createAndSignTx({
            msgs: [msg],
        });

        const broadcastResult = await lcd.tx.broadcast(signedTx);
        console.log(broadcastResult);
    } catch (err) {
        console.log('setPrimaryDomain error: ', err);
    }
};

module.exports = {
    setPrimaryDomain
}
