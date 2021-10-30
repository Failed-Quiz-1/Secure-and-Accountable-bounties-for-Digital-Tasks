export declare function generateMnemonicString(): string;
interface KeyPair {
    privateKey: string;
    publicKey: string;
}
export declare function generatePublicAndPrivateKey(mnemonicString: string): KeyPair;
export declare function createSignature(message: string, privateKeyStr: string): string;
export declare function verifySignature(message: string, signature: string, publicKeyStr: string): string;
export {};
