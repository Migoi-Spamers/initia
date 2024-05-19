import { LCDClient, Wallet, MnemonicKey, MsgExecute } from '@initia/initia.js';
import { bcs, fromB64 } from '@mysten/bcs';

// const lcd = new LCDClient('https://lcd.initiation-1.initia.xyz', {
const lcd = new LCDClient('http://65.108.232.174:17317', {
    chainId: 'initiation-1',
    gasPrices: '0.151uinit',
    gasAdjustment: '2.0',
});

const key = new MnemonicKey({
      mnemonic: "YOUR_SEED_PHRASE",
});

const VALIDATOR = 'YOUR_VALIDATOR_ADDR'
const serializedString = bcs.string().serialize(VALIDATOR);
const base64_validator = serializedString.toBase64();

const wallet = new Wallet(lcd, key);
const msg = new MsgExecute(
    key.accAddress,
    '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
    'dex_utils',
    'single_asset_provide_stake',
	undefined,
	["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=","jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=","gIQeAAAAAAA=","AUG8FwAAAAAA",base64_validator] // Stake INIT only
	// ["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=","KYJNlS4DVJD651Z97qXxW1BKaPpzYQBjwWCrH6h91gk=","QEIPAAAAAAA=","AZb9CwAAAAAA",base64_validator] // Stake 1 USDC
);

const execute = async () => {
    const signedTx = await wallet.createAndSignTx({
        msgs: [msg],
    });

    const broadcastResult = await lcd.tx.broadcast(signedTx);
    console.log(broadcastResult);
    console.log(base64_validator);
};
execute();
