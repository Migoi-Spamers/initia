const { LCDClient, MnemonicKey, Wallet } = require("@initia/initia.js");
const randomstring = require('randomstring');
const { readFile, getRandomInt, sleep, retry } = require("../utils");
const { registerDomain } = require('./register_domain');
const { setPrimaryDomain } = require('./set_domain_primary');
const { mintNFTPart } = require('./mint_nft_part');
const { stake } = require('./stake_single_asset');
const { swap } = require('./swap');
const { mintJennieNFT } = require("./mint_nft_jennie");
const { stake_1init } = require("./stake_1init");
const { setRef } = require("./register_ref_code");
const { sendToken } = require("./sendCoin");
const { claimAirdrop } = require("./claimAirdrop");
const { feed } = require("./feed");
const { withdrawFood } = require("./withdraw_food");
const { claimPoint } = require("./claimPoint");
const { tucanaSwap } = require("./tucana_swap");
const { tucanaLp } = require("./tucana_lp");
const { bridge } = require("./bridge");
const { sendTokenToL2 } = require("./sendTokenToL2");
const { transferToken } = require("./transfer");
const { checkStatus } = require("./checkStatus");
const { civitaRoll } = require("./civita_roll");
const { tucanaPerps } = require("./tucana_perps");
const { civitiaClaimReward } = require("./claimReward_civitia");

let error_wallets_3 = [];

const usdcPair = [
    ["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "IKEHAAAAAAA=", "AZ6cBQAAAAAA"],
    ["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "QEIPAAAAAAA=", "ATU5CwAAAAAA"],
    ["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "ADUMAAAAAAA=", "AY36CAAAAAAA"]
];

const tiaPairs = [
    ["sTSuZ4bxDvdClOYn0lGbY7fHQqZzX5hoKSn+qahHRNI=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "IKEHAAAAAAA=", "AUUrAwAAAAAA"],
]

const ethPairs = [
    ["orDTyOU+N57eMfOjYf8CcW1Q7FPGtluMSKgdWwZUggA=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "QA0DAAAAAAA=", "ATw7AQAAAAAA"],
    ["orDTyOU+N57eMfOjYf8CcW1Q7FPGtluMSKgdWwZUggA=", "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=", "IKEHAAAAAAA=", "ARQUAwAAAAAA"]
]

// http://65.108.205.51:1317/
const runTasks = async (lcd, wallet,index, callback) => {
    console.log(wallet.key.accAddress);

    // register domain
    // const domainName = randomstring.generate({
    //     length: 11
    // })
    // await registerDomain(lcd, wallet, domainName, () => {
    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // set primary domain
    // await setPrimaryDomain(lcd, wallet, domainName);

    // stake 1 init
    // await stake_1init(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }
    // });

    // stake
    // await stake(lcd, wallet, ethPairs[getRandomInt(0, ethPairs.length)], (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }
    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    /// swap
    // await swap(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // mint nft part
    // await mintNFTPart(lcd, wallet, () => {
    //     if (nftParts[nftIdx] == 0) {
    //         error_wallets_3.push(wallet.key.accAddress);
    //     }
    // });

    // min jennie nft
    // await mintJennieNFT(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // set reference
    // await setRef(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // withdraw food
    // await withdrawFood(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // feed
    // await feed(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // claim xp
    // await claimPoint(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }
    // });

    // send
    // await sendToken(lcd, wallet, index, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }
    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // claim airdrop
    // await claimAirdrop(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // tucana swap
    await tucanaSwap(lcd, wallet, (isSuccess) => {
        if (isSuccess) {
            callback();
            return;
        }

        error_wallets_3.push(wallet.key.accAddress);
    });

    // tucana lp
    // await tucanaLp(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // tucana perps
    // await tucanaPerps(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }
    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // civita roll
    // await civitaRoll(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }
    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // civita claim reward
    // await civitiaClaimReward(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }
    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // send to l2
    // await sendTokenToL2(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // bridge
    // await bridge(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // transfer
    // await transferToken(lcd, wallet, (isSuccess) => {
    //     if (isSuccess) {
    //         callback();
    //         return;
    //     }

    //     error_wallets_3.push(wallet.key.accAddress);
    // });

    // status
    // await checkStatus(wallet.key.accAddress, () => {
    //     callback();
    // });
};

const main = async () => {
    const blackwingLCD = new LCDClient('https://maze-rest-18bdff44-3aa4-425e-9bc0-06a2afa40af8.ue1-prod.newmetric.xyz', {
        chainId: 'tomcat-1',
        gasPrices: '0.151l2/aee375e9d0b181f0d9d3a49f9a3d1d6b05d62b0ac81f8c92b9282afa4213d884',
        gasAdjustment: '1.5',
    });

    const civitaLCD = new LCDClient('https://maze-rest-sequencer-beab9b6f-d96d-435e-9caf-5679296d8172.ue1-prod.newmetric.xyz', {
        chainId: 'landlord-1',
        gasPrices: '0.151l2/afaa3f4e1717c75712f8e8073e41f051a4e516cd25daa82d948c4729388edefd',
        gasAdjustment: '2.0',
    });

    const tucanaLCD = new LCDClient('https://maze-rest-c9796789-107d-49ab-b6de-059724d2a91d.ue1-prod.newmetric.xyz', {
        chainId: 'birdee-1',
        gasPrices: '0.151utuc',
        gasAdjustment: '2.0',
    });

    const initiaLcd = new LCDClient('https://lcd.initiation-1.initia.xyz', {
        chainId: 'initiation-1',
        gasPrices: '0.15move/944f8dd8dc49f96c25fea9849f16436dcfa6d564eec802f3ef7f8b3ea85368ff',
        gasAdjustment: '2',
    });

    const lcd = initiaLcd;

    const wallets = [];
    const mnemonicList = await readFile('./execute_wallet.txt');

    for (const mnemonic of mnemonicList) {
        const key = new MnemonicKey({
            mnemonic: mnemonic,
        });
        const wallet = new Wallet(lcd, key);
        wallets.push(wallet);
    }

    let selectedWallets = wallets;
    let triedTimes = 0;
    
    do {
        let index = 0;
        console.log(selectedWallets.map(wallet => wallet.key.accAddress));
        const succedAddresses = [];
        error_wallets_3 = [];

        for (const wallet of selectedWallets) {
            await runTasks(lcd, wallet, index, () => {
                succedAddresses.push(wallet.key.accAddress);
            });
            index++;
        }

        selectedWallets = selectedWallets.filter(
            wallet_ => !succedAddresses.includes(wallet_.key.accAddress)
        )
        triedTimes++;
    } while (selectedWallets.length > 0 && triedTimes < 2)

    console.log(error_wallets_3);
}

main();
