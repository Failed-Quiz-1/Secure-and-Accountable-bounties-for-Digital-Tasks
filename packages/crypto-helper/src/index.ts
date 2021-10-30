var Mnemonic = require('bitcore-mnemonic');
var bitcore = require('bitcore-lib');


export function generateMnemonicString(): string {
    var code = new Mnemonic(Mnemonic.Words.ENGLISH);
    return code.toString();
}

interface KeyPair {
    privateKey: string,
    publicKey: string
}

export function generatePublicAndPrivateKey(mnemonicString: string): KeyPair {
    var code = new Mnemonic(mnemonicString);
    var xpriv = code.toHDPrivateKey();
    var derived = xpriv.derive("m/0'");
    var privateKey = derived.privateKey;
    var pk = new bitcore.PrivateKey(privateKey.toString());
    var publicKey = new bitcore.PublicKey(pk);

    var privateKeyStr = pk.toString();
    var publicKeyStr = publicKey.toString();

    return {
        privateKey: privateKeyStr,
        publicKey: publicKeyStr
    }
}

export function createSignature(message: string, privateKeyStr: string): string {
    var privateKey = bitcore.PrivateKey.fromWIF(privateKeyStr);
    var signature = bitcore.Message(message).sign(privateKey);
    return signature;
}

export function verifySignature(message: string, signature: string, publicKeyStr: string): string {
    var pbk = new bitcore.Address(new bitcore.PublicKey(publicKeyStr));
    var verified = bitcore.Message(message).verify(pbk, signature);
    return verified;
}