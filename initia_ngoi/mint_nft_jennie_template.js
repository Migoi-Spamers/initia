import { LCDClient, Wallet, MnemonicKey, MsgExecute } from '@initia/initia.js';

const lcd = new LCDClient('https://lcd.initiation-1.initia.xyz', {
    chainId: 'initiation-1',
    gasPrices: '0.151uinit',
    gasAdjustment: '2.0',
});
const key = new MnemonicKey({
    mnemonic: "YOUR_SEED_PHRASE",
});
const wallet = new Wallet(lcd, key);
const msg = new MsgExecute(
    key.accAddress,
    '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
    'jennie',
    'mint_jennie'
);

const execute = async () => {
    const signedTx = await wallet.createAndSignTx({
        msgs: [msg],
    });

    const broadcastResult = await lcd.tx.broadcast(signedTx);
    console.log(broadcastResult);
};
execute();
