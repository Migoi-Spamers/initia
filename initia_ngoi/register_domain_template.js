import { LCDClient, Wallet, MnemonicKey, MsgExecute } from '@initia/initia.js';
import { bcs, fromB64 } from '@mysten/bcs';


const lcd = new LCDClient('https://lcd.initiation-1.initia.xyz', {
    chainId: 'initiation-1',
    gasPrices: '0.151uinit',
    gasAdjustment: '2.0',
});

const key = new MnemonicKey({
    mnemonic: "YOUR_SEED_PHRASE",
});

const serializedString = bcs.string().serialize('YOUR_DOMAINNAME');
const base64string = serializedString.toBase64();


const wallet = new Wallet(lcd, key);

// Register domain name
const msg = new MsgExecute(
    key.accAddress,
    '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
    'usernames',
    'register_domain',
	undefined,
	[base64string, "4IfhAQAAAAA="]
);

const execute = async () => {
    const signedTx = await wallet.createAndSignTx({
        msgs: [msg],
    });

    const broadcastResult = await lcd.tx.broadcast(signedTx);
    // console.log(broadcastResult);
	console.log(serializedString, "Mint OK");
};
execute();

// Set primary domain
// const msg2 = new MsgExecute(
//     key.accAddress,
//     '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
//     'usernames',
//     'set_name',
//         undefined,
//         [base64string]
// );
// 
// const execute2 = async () => {
//     const signedTx = await wallet.createAndSignTx({
//         msgs: [msg2],
//     });
// 
//     const broadcastResult = await lcd.tx.broadcast(signedTx);
//     console.log(broadcastResult);
// };
// execute2();
