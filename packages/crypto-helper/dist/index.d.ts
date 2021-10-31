export declare function generateMnemonicString(): string;
interface KeyPair {
    privateKey: string;
    publicKey: string;
}
export declare function generatePublicAndPrivateKey(mnemonicString: string): KeyPair;
export interface SignatureMessage {
    fromUserId: number;
    toUserId: number;
    taskId: number;
    createdOn: string;
    status: string;
}
export declare function createSignature(message: SignatureMessage, privateKeyStr: string): string;
export declare function verifySignature(message: SignatureMessage, signature: string, publicKeyStr: string): string;
export {};
