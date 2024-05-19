const { LCDClient, MnemonicKey, Wallet } = require("@initia/initia.js");
const randomstring = require('randomstring');
const { readFile, getRandomInt, sleep } = require("../utils");
const { registerDomain } = require('./register_domain');
const { setPrimaryDomain } = require('./set_domain_primary');
const { mintNFTPart } = require('./mint_nft_part');
const { stake } = require('./stake_single_asset');
const { swap } = require('./swap');
const { mintJennieNFT } = require("./mint_nft_jennie");

const domainNameList = [
    'horizonbreeze',
    'silverstream',
    'glimmeringsands',
    'frostyvalley',
    'ambercascade',
    'digitalhaven',
    'tranquilhorizon',
    'cosmicwanderer',
    'emeraldvista',
    'radiantwave',
    'goldenmeadow',
    'stellarcompass',
    'datvantay'
]

const runTasks = async (mnemonic, index) => {
    const lcd = new LCDClient('http://65.108.205.51:1317/', {
        chainId: 'initiation-1',
        gasPrices: '0.2uinit',
        gasAdjustment: '3.0',
    });
    const key = new MnemonicKey({
        mnemonic: mnemonic,
    });
    const wallet = new Wallet(lcd, key);

    console.log(wallet.key.accAddress);
    const domainName = randomstring.generate({
        length: 6
    })
    // register domain
    // await registerDomain(lcd, wallet, domainName);
    // await sleep(10000);

    // set primary domain
    // await setPrimaryDomain(lcd, wallet, domainName);
    // await sleep(10000);

    // // stake
    // await stake(lcd, wallet);
    // await sleep(10000);

    // /// swap
    await swap(lcd, wallet);
    // await sleep(10000);

    // mint nft part
    for (let i = 1; i <= 5; i++) {
        // await mintNFTPart(lcd, wallet, i);
    }

    // min jennie nft
    // await mintJennieNFT(lcd, wallet);
};

const main = async () => {
    const mnemonicList = await readFile('./execute_wallet.txt');
    let i = 0;

    for (const mnemonic of mnemonicList) {
        await sleep(120000);
        await runTasks(mnemonic, i);
        i++;
    }
}

main();