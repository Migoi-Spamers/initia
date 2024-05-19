const { MsgDelegate } = require('@initia/initia.js');
const { bcs } = require('@mysten/bcs');
const { getRandomInt } = require('../utils');

const validatorList = [
    'initvaloper1q2al59gylz40jms6emey6ps8leuguhs7kvqhag',
    'initvaloper1pwrurhj7nq0ckfxnx00c02hd09rrqwlmjnvzgr',
    'initvaloper1p4378lu3ycdug07nry8fmpqmmqek5u7sth3pd5',
    'initvaloper1zg3j59erlat3yuwcqfchgtr7l4f2qhc8z3gxfp',
    'initvaloper1zlu3v7jan5vj0wff8ggl5f3n0n7d0yjlmskdrm',
    'initvaloper1rg3w5xmc82p9lse0j8rjzxs4tmjxzjek6zt9tu',
    'initvaloper1r3cuy3q2gxh0mpj2nu0cnpqtutaxx9z87r6qtt',
    'initvaloper19zg4rdjsedv5g2vfs4h54u8tjny5ytclzsvplu',
    'initvaloper19j6aw3lqs0qh97f9tlvhvgeufcr83a3wh0sxtn',
    'initvaloper1xxae4payg8jvs6tk9p8y5zdx43fn30zx6mje5c',
    'initvaloper1x5wgh6vwye60wv3dtshs9dmqggwfx2ldfn4nfa',
    'initvaloper1x7j4d9ccds889yxecuylp803d0h6lrfnv30k9y',
    'initvaloper18gtqadftw9pfqv6x2svwdqkfsw7hjptdj6xp0h',
    'initvaloper18gcqgg7lpn2vzzevul3a98uq5mk8vpdqsnkzla',
    'initvaloper18t529jj4qdma4kate8vx3umjm8pwfzrefemrw6',
    'initvaloper18uamly9vsqceywt0wv2d4v670ch5k32xvz4q5e',
    'initvaloper1ghafr9ul6ex5kw3aellqlpa0lresme8snep8k4',
    'initvaloper1fce4xcsrlv2fc7cedarefcguq2jf0t8vd2jdr6',
    'initvaloper12ygz083ccaxl0y8870yukdg53tyql922pzlvss'
];

const stake = async (lcd, wallet) => {
    try {
        const validator = validatorList[getRandomInt(0, validatorList.length - 1)];

        const serializedString = bcs.string().serialize(validator);

        const msg = new MsgDelegate(
            wallet.key.accAddress,
            '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
            'dex_utils',
        );

        const signedTx = await wallet.createAndSignTx({
            msgs: [msg],
        });

        const broadcastResult = await lcd.tx.broadcast(signedTx);
        console.log(broadcastResult);
    } catch (err) {
        console.log("Stake err");
    }
};

module.exports = {
    stake
};
