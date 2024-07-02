
const claimableUrl = address => `https://b545809c-5562-4e60-b5a1-22e83df57748.initiation-1.mesa-rest.ue1-prod.newmetric.xyz/initia/move/v1/accounts/${address}/resources/by_struct_tag?struct_tag=0x9065fda28f52bb14ade545411f02e8e07a9cb4ba::jennie::FoodStore`;

const currentXpURL = address => `https://b545809c-5562-4e60-b5a1-22e83df57748.initiation-1.mesa-rest.ue1-prod.newmetric.xyz/initia/move/v1/accounts/${address}/resources/by_struct_tag?struct_tag=0x9065fda28f52bb14ade545411f02e8e07a9cb4ba::initia_xp::UserStore`

const claimableXp = address => `https://xp-api.initiation-1.initia.xyz/xp/claimable/${address}`

async function checkAddress(address) {
    try {
        const response = await fetch(claimableUrl(address));

        const response2 = await fetch(currentXpURL(address));

        const response3 = await fetch(claimableXp(address));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} `);
        }

        const data = await response.json();
        const data2 = await response2.json();
        const claimable_data = await response3.json();

        return {
            data,
            data2,
            claimable_data
        };
    } catch (error) {
        console.error(`Failed to fetch data for address ${address}: `, error);
        return { address, claimable: false, error: error.message };
    }
}

module.exports = {
    checkAddress
}
