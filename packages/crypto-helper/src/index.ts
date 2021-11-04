var Mnemonic = require("bitcore-mnemonic");
var bitcore = require("bitcore-lib");

export function generateMnemonicString(): string {
  var code = new Mnemonic(Mnemonic.Words.ENGLISH);
  return code.toString();
}

interface KeyPair {
  privateKey: string;
  publicKey: string;
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
    publicKey: publicKeyStr,
  };
}

export interface SignatureMessage {
  fromUserId: number;
  toUserId: number;
  taskId: number;
  createdOn: string;
  status: string;
}

export interface ServerReleaseSignatureMessage {
  ipToUserId: number;
  paymentToUserId: number;
  taskId: number;
  createdOn: string;
  status: string;
}

export function createSignature(
  message: SignatureMessage | ServerReleaseSignatureMessage,
  privateKeyStr: string
): string {
  var privateKey = bitcore.PrivateKey.fromWIF(privateKeyStr);
  var signature = bitcore.Message(JSON.stringify(message)).sign(privateKey);
  return signature;
}

export function verifySignature(
  message: SignatureMessage | ServerReleaseSignatureMessage,
  signature: string,
  publicKeyStr: string
): string {
  var pbk = new bitcore.Address(new bitcore.PublicKey(publicKeyStr));
  var verified = bitcore
    .Message(JSON.stringify(message))
    .verify(pbk, signature);
  return verified;
}
