
const fakeUa = require('fake-useragent');
const { readFile } = require('../utils');

const getNocaptchaApiToken = async () => {
    const nocaptchaApiKey = '80af77f4-6641-4cdf-8b44-659b3884a91e';

    // Call the Token API
    const response = await fetch('http://api.nocaptcha.io/api/wanda/recaptcha/universal', {
        method: 'POST',
        headers: {
            'User-Token': nocaptchaApiKey,
            'Content-Type': 'application/json',
            'Developer-Id': 'Yk3yGj'
        },
        body: JSON.stringify({
            sitekey: '6LdLhtYpAAAAAOe1xmceNR-i6MTtzq7N6AYztoVI',
            referer: 'https://faucet.testnet.initia.xyz',
            size: 'normal',
            title: 'Initia Faucet'
        })
    });

    if (!response.ok) {
        console.log('nocaptcha api error');
        return;
    }

    const { data } = await response.json();

    return data.token;
};

const faucet = async (address) => {
    try {
        const captchaToken = await getNocaptchaApiToken();

        const myHeaders = new Headers();
        myHeaders.append("User-Agent", fakeUa());
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch('https://faucet-api.initiation-1.initia.xyz/claim', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                address: address,
                denom: 'uinit',
                response: captchaToken
            }),
        });

        if (!response.ok) {
            console.log('faucet api error');
            console.log(await response.text());
            return;
        }

        const data = await response.json();

        console.log(data.data);
        console.log('===> Faucet successed: ', address);
    } catch (err) {
        console.log('===> Faucet failed: ', address);
    }
};


const main = async () => {
    const addressList = await readFile('faucet_addresses.txt');

    for (const address of addressList) {
        await faucet(address);
    }
}

main();
