<!-- <p align="center">
  <a href="" rel="noopener">
 <img src="https://i.imgur.com/AZ2iWek.png" alt="Project logo"></a>
</p>
<h3 align="center">Project Title</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-name-orange.svg)](http://hackathon.url.com)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p> -->

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Roadmap](#roadmap)

<!-- - [Dependencies / Limitations](#limitations)
- [Future Scope](#future_scope)
- [Setting up a local environment](#getting_started)
- [Usage](#usage)
- [Technology Stack](#tech_stack)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments) -->

## 🧐 Problem Statement <a name = "problem_statement"></a>

Smart contracts by design do not store private information about it's state. This is a problem for some specific use cases that
involves sharing some private information between signers of the contract. Let's say for example, that a contract exists to 
show that someones owns a piece of information, like an academic research paper. This person would only want people that actually
paid for his paper to be able to see it.

The best solution would be a smart contract that enables some form of private information to be accessible only by the owner of the
contract. With this approach, if the contract is an ERC-721 token (NFT) the issuer of the token would be able to sell the information
inside the contract and guarantee that no one else but the owner would be able to access it. With this approach, he could do it
in a decentralized way, without requiring a back-end to store the secret of the NFT.

In reality, it is easier to store the secret in an API, and use the contract to call that API and retrieve the hashed secret with the
owner's public key. Despite not being decentralized, it works. It could arguably be decentralized if each issuer of the NFT uses his own back-end to encrypt the secret message it contains, I guess.

Not being able to store private information inside the blockchain limits a lot the usefulness of NFT's. If it wasn't the case, we could
have entirely decentralized platforms that sell some kind of information, like Udemy for example, content creators could receive 100%
of the profits of their work, without having to rely on third parties. NFT's are also capable of giving royalities to creators upon sell
of owners. 

<!-- 
- IDEAL: This section is used to describe the desired or “to be” state of the process or product. At large, this section
  should illustrate what the expected environment would look like once the solution is implemented.
- REALITY: This section is used to describe the current or “as is” state of the process or product.
- CONSEQUENCES: This section is used to describe the impacts on the business if the problem is not fixed or improved upon.
  This includes costs associated with loss of money, time, productivity, competitive advantage, and so forth. -->

<!-- Following this format will result in a workable document that can be used to understand the problem and elicit
requirements that will lead to a winning solution. -->

## 💡 Idea / Solution <a name = "idea"></a>

We want to be able to set and get some private data in a smart contract in Solidity.

## 💡 Roadmap for development  <a name = "roadmap"></a>


Steps before implementation:

- Understand an NFT and it's functions fully: https://www.youtube.com/watch?v=YPbgjPPC1d0 
- Understand how to use Chainlink Any API properly https://docs.chain.link/docs/make-a-http-get-request/
- Understand how to encrypt a message using public key of wallet in the backend. Since we are mostly familiar with javascript,
I would look into this: https://ethereum.stackexchange.com/questions/3092/how-to-encrypt-a-message-with-the-public-key-of-an-ethereum-address
- Understand how to implement metamask extension on the front-end and use it to buy NFTs.

Implementation steps: 

- Write and run the back-end that encrypts a message with the wallet public key.
- Write the ERC-721 contract, with the capability to GET the encrypted information with the owner public key from the back-end API.
- Test the contract, it should be able to encrypt the message and we should be able to decrypt it. In any step de secret information should
show up in the smart contract state in plaintext.
- Implement a front-end that uses metamask where users can see/buy these Papers/Courses NFT's.  
- Deploy it all! (With all crypto related stuff on testnets)


Extras:

implement the same project but with Oasis Protocol. It should do the same thing, except entirely in the blockchain, because it's contracts can handle private information.




<!-- ## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

- What are the dependencies of your project?
- Describe each limitation in detailed but concise terms
- Explain why each limitation exists
- Provide the reasons why each limitation could not be overcome using the method(s) chosen to acquire.
- Assess the impact of each limitation in relation to the overall findings and conclusions of your project, and if
  appropriate, describe how these limitations could point to the need for further research.

## 🚀 Future Scope <a name = "future_scope"></a>

Write about what you could not develop during the course of the Hackathon; and about what your project can achieve
in the future.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development
and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## ⛏️ Built With <a name = "tech_stack"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors)
who participated in this project.

## 🎉 Acknowledgments <a name = "acknowledgments"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References -->
