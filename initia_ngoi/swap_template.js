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
    '0x1',
    'dex',
    'swap_script',
	undefined,
	// ["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=","jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=","wMYtAAAAAAA=","AVNZKQAAAAAA"] // 3 INIT
	["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=","jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=","wMYtAAAAAAA=","AA=="] 
);

const execute = async () => {
    const signedTx = await wallet.createAndSignTx({
        msgs: [msg],
    });

    const broadcastResult = await lcd.tx.broadcast(signedTx);
    console.log(broadcastResult);
};
execute();
