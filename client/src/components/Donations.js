import { useState, useEffect } from 'react'

const Donations = ({ state }) => {
    const [donations, setDonations] = useState([]);
    const { contract } = state;
    const color1 = "#D8DDD4";
    const color2 = "#96D4D4";

    useEffect(() => {
        const donationMessage = async () => {
            const donations = await contract.getDonations();
            setDonations(donations);
        }
        contract && donationMessage();
    }, [contract])

    return (
        <>
            <p style={{ textAlign: "center", marginTop: "20px" ,color:"#00FFFF",fontWeight:"bold",fontSize:"30px"}}>Donations</p>
            {
                donations.map((donation) => {
                    return (
                        <div
                            className="container-fluid"
                            style={{ width: "100%" }}
                            key={Math.random()}
                            >

                            <table style={{
                                marginBottom: "10px",
                            }}>
                               
                                <tbody>
                                    
                                    <tr>
                                        <td style={{
                                            backgroundColor: color1,
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "100px",
                                        }}>{donation.from}</td>
                                        <td style={{
                                            backgroundColor: color2,
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "800px",
                                        }}>{donation.senderName}</td>
                                        <td style={{
                                            backgroundColor: color1,
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "300px",
                                        }}>{donation.senderMessage}</td>
                                        <td style={{
                                            backgroundColor: color2,
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "400px",
                                        }}>{
                                            new Date(donation.timestamp * 1000).toLocaleString()

                                        }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Donations