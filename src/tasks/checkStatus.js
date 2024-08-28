
const claimableUrl = address => `https://b545809c-5562-4e60-b5a1-22e83df57748.initiation-1.mesa-rest.ue1-prod.newmetric.xyz/initia/move/v1/accounts/${address}/resources/by_struct_tag?struct_tag=0x9065fda28f52bb14ade545411f02e8e07a9cb4ba::jennie::FoodStore`;

const currentXpURL = address => `https://b545809c-5562-4e60-b5a1-22e83df57748.initiation-1.mesa-rest.ue1-prod.newmetric.xyz/initia/move/v1/accounts/${address}/resources/by_struct_tag?struct_tag=0x9065fda28f52bb14ade545411f02e8e07a9cb4ba::initia_xp::UserStore`;

const claimableXp = address => `https://xp-api.initiation-1.initia.xyz/xp/claimable/${address}`;

const ranking = address => `https://xp-api.initiation-1.initia.xyz/leaderboard/rankings/${address}`;

let count = 0;

async function checkStatus(address, callback) {
    try {
        const response = await fetch(claimableUrl(address));

        const response2 = await fetch(currentXpURL(address));

        const response3 = await fetch(claimableXp(address));

        const response4 = await fetch(ranking(address));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} `);
        }

        const data = await response.json();
        const data2 = await response2.json();
        const claimable_data = await response3.json();
        const rank_data = await response4.json();

        const current_xp = JSON.parse(data2.resource.move_resource).data.xp_point;
        const food = JSON.parse(data.resource.move_resource).data;
        let claimable_xp = 0;
        claimable_data.claimable_list.map(claimable => {
            claimable_xp += claimable.task_point
        });
        const total_xp = Number.parseInt(current_xp) + Number.parseInt(claimable_xp);


        if (Number.parseInt(rank_data.hp) > 5) {
            count++;
        }

        // console.log(count);

        console.log(food);
        console.log(
            `current xp: ${current_xp}\n`,
            `claimable xp: ${claimable_xp}\n`,
            `hp: ${rank_data.hp}\n`,
            `rank: ${rank_data.rank}\n`,
            `frame level: ${rank_data.frame_level}\n`,
            `total xp: ${total_xp}`
        );

        callback(true);

    } catch (error) {
        console.error(`Failed to fetch data for address ${address}: `, error);
        callback(false);

        return { address, claimable: false, error: error.message };
    }
}

module.exports = {
    checkStatus
}
