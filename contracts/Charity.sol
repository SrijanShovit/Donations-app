// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Charity {
    struct Donation{
        string senderName;
        string senderMessage;
        uint timestamp;
        address from;
    }

    Donation[] donations;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    //function to make a donation
    function sendDonation(string memory name,string memory message) public payable {
        require(msg.value > 0,"Please pay some ETH");
        owner.transfer(msg.value);
        donations.push(Donation(name,message,block.timestamp,msg.sender));
    }

    function getDonations() public view returns(Donation[] memory){
        return donations;
    }



}