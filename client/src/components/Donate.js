import { ethers } from 'ethers';
import React from 'react'

const Donate = ({state}) => {
    const buyDonation = async(event)=>{
        event.preventDefault();
        const {contract} = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector('#message').value;
        console.log(name,message,contract);
        const value = {value:ethers.utils.parseEther("0.0001")};
        const transaction = await contract.sendDonation(name,message,value);
        await transaction.wait();
        alert("Transaction done!");

    }
  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" ,color:"#87CEEB"}}>
      <form onSubmit={buyDonation}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Good Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay 0.0001 ETH
          </button>
        </form>
      </div>

    </>
  )
}

export default Donate