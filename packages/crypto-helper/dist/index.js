"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.createSignature = exports.generatePublicAndPrivateKey = exports.generateMnemonicString = void 0;
var Mnemonic = require("bitcore-mnemonic");
var bitcore = require("bitcore-lib");
function generateMnemonicString() {
    var code = new Mnemonic(Mnemonic.Words.ENGLISH);
    return code.toString();
}
exports.generateMnemonicString = generateMnemonicString;
function generatePublicAndPrivateKey(mnemonicString) {
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
        publicKey: publicKeyStr,
    };
}
exports.generatePublicAndPrivateKey = generatePublicAndPrivateKey;
function createSignature(message, privateKeyStr) {
    var privateKey = bitcore.PrivateKey.fromWIF(privateKeyStr);
    var signature = bitcore.Message(JSON.stringify(message)).sign(privateKey);
    return signature;
}
exports.createSignature = createSignature;
function verifySignature(message, signature, publicKeyStr) {
    var pbk = new bitcore.Address(new bitcore.PublicKey(publicKeyStr));
    var verified = bitcore
        .Message(JSON.stringify(message))
        .verify(pbk, signature);
    return verified;
}
exports.verifySignature = verifySignature;
