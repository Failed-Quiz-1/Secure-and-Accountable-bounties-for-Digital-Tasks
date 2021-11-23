# Secure-and-Accountable-bounties-for-Digital-Tasks

![workflow status](https://github.com/Failed-Quiz-1/Secure-and-Accountable-bounties-for-Digital-Tasks/actions/workflows/docker-image.yml/badge.svg)

## Description
This application allows users to post jobs for freelancers to do. The jobs are split into multiple tasks tagged with a bounty. Freelancers can submit their drafts to the application. Upon approval from both parties, , payment is released to the freelancer and IP is released to the poster. 

## Motivation

The main motivation of this application implementing digital signatures is to ensure non repudiation and authentication of the user. 

Imagine a scenario with Alice and Bob. Alice have sent payment to Bob. However, Bob claims that Alice have not sent the money. There is no way of verification and hence it becomes a point of malice. 

To resolve this conflict, we can implement digital signatures. How it works is upon performing a task, the user must provide his secret private key. The private key will be encrypted with the message to form a digital signature. The message will contain all the information of this exchange such as task, sender, receipient, timestamp etc. (more details in implementation) The validity of digital signature can only be verified with the public key of the sender. 

This resolve the problem as 

1. There is a receipt for every action taken by sender; job poster and freelancer.
2. We can verify that the signature can only belong to the sender with the sender's public key.
3. Nobody can falsify a digital signature without the private key of sender, which is assumed safe with the user.

## Design


### Functional Requirements
1. User must be able to register for an account and login to Fiver.
2. The system must generate both private and public key pair upon registration of user.
3. The system must store public key, and give user a mnemonic which can deterministically produce his private key.
4. Upon login, the user must be able to create a job posting.
5. The poster must also be able to add multiple tasks under the job with a bounty and its description.
#### --Digital Signatures with draft submission by freelancer--
6. The freelancer must be able to submit drafts and “sign” it with his mnemonic.
7. The server must generate the private key, verify with public key in server and generate a digital signature.
8. The file submitted must be hashed and put inside the message which is used to generate the digital signature.
#### --Digital Signatures with draft approval/rejection by job poster--
9. The poster can reject the draft, or approve it with his mnemonic.
10. The status of draft (approval or rejection) must be reflected in the signature message.
11. Upon approval, the poster must sign to release payment to the server.
12. The server must generate the private key, verify with public key in server and generate digital signatures.
#### --Digital Signatures with release of IP by freelancer--
13. The system must then prompt the freelancer to release the IP to receive the payment.
14. The freelancer can release the IP to the server with his mnemonic.
15. The server must generate the private key, verify with public key in server and generate digital signatures.
#### --Digital Signatures with release of IP and bounty by server--
16. Upon verification of digital signatures and message signatures, the IP is released to the poster and the bounty is released to the freelancer.

Note that the payment and IP is first sent to the server. If the payment is sent directly to the freelancer, the freelancer would be able to take the money without releasing the IP. Likewise, if the freelancer releases the IP to the poster, the poster would not need to make payment. The server is treated as a trusted intermediary in this application. 

### Message Structure

Message signature Format for creating draft
```
{
   "fromUserId":
   "toUserId":
   "taskId":
   "createdOn": 
   "status":
   "filehash":
}
```

Message signature Format for approval, rejection, release IP
```
{
   "fromUserId":
   "toUserId":
   "taskId":
   "createdOn": 
   "status":
}
```

Message signature from server to freelancer and poster
```
{
   "fromUserId":
   "ipToUserId":
   "paymentToUserId":
   "taskId":
   "createdOn": 
   "status":
}
```

### DB Design
![img](https://github.com/Failed-Quiz-1/Secure-and-Accountable-bounties-for-Digital-Tasks/blob/main/Secure%20Bounty%20-%20Page%201.png)
https://lucid.app/lucidchart/45281327-603d-459a-bf80-9b9565ae9379/edit?viewport_loc=86%2C-177%2C1865%2C946%2C0_0&invitationId=inv_09cd3151-15be-46dd-ba22-d604ece171a9



## Development

### Technology stack
Frontend: React

Backend: NestJS

Database: PostgreSQL deployed on Heroku

### Crypto packages used
1. [bitcore-lib](https://github.com/bitpay/bitcore-lib)
2. [bitcore-mnemonic](https://github.com/bitpay/bitcore-mnemonic)

## Use of code
### Run the app locally


#### Manual setup

Install all dependencies

```
yarn setup
```
Start both frontend and backend
```
yarn start
```

Presentation slides [here](https://docs.google.com/presentation/d/1lBnCtuH6CUzQHM4sri9eJHDVPuQDBiB1QQNZBDBVlh4/edit?usp=sharing)
