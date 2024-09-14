import React, { useState, useEffect } from "react";
import "./Ticket.css";
import GameInfo from "../GameInfo/GameInfo";
import { getApiCall, postApiCall, putApiCall } from "../../services/AppSetting";
import { base } from "../../constants/Data.constant";

const Ticket = (props) => {
  const { number, gameId, ticket } = props;
  // console.log("ticketprops", ticket);
  // console.log("numberprops", number);
  const [ticket1, setTicket1] = useState([]);
  const [searchTickets, setSearchTickets] = useState("");

  useEffect(() => {
    const ticketCutHiglight = async () => {
      number?.map((numberData, index) => {
        const filterTicket = ticket.filter((data) => data.userName != ""); //new add
        let aarr = filterTicket;
        console.log("aarrrr", aarr);        
        aarr?.map((ticketData) => {
          ticketData?.dateSet?.map((ticketDataNumber, index) => {
            if (
              numberData.number == ticketDataNumber.number &&
              numberData.status == "true"
            ) {
              ticketDataNumber.status = true;
            }
          }); 
        });
        setTicket1(aarr);
      });
    };
    ticketCutHiglight();
  }, [number]);

  return (
    <div className="ticketSection">
      <input 
        type="text" 
        id="name" 
        name="name" 
        placeholder="Search.." 
        className="searchTickets"  
        onChange={(e) => {
          setSearchTickets(e.target.value)
        }}
      />
      {/* {ticket1?.length > 0 &&
        ticket1?.map((item, index) => {
          if (item.userName != "") {
            return (
              <div className="outerContainer">
                <div className="container mx-auto mt-8">
                  <div className="containerInfo">
                    <div className="containerInfoFirstInnerItem">
                      <div className="containerInfoInnerItemSerial">
                        {item.id}
                      </div>
                      <div className="containerInfoInnerItem">
                        {item.userName}:
                        {item.userPhone}
                      </div>
                    </div>
                    {item.winnerTag != "" && (
                    <div className="containerInfoInnerItem">
                      {item.winnerTag}
                    </div>
                    )}
                  </div>
                  <div className="number-card"> 
                    {item?.dateSet?.map((item) => { 
                      return (
                        <div
                          className="number"
                          style={{
                            background: item.status == true ? "red" : "#fff",
                            color: item.status == true ? "#fff" : "#000",
                            borderRadius: item.status == true && "100%",
                          }}
                        >
                          {item.number}
                          {item.status}
                        </div>
                      );
                    })} 
                  </div>
                </div>
              </div>
            );
          }
        })} */}
      {ticket1?.length > 0 &&
        ticket1.filter((item) =>            
            item.userName.toLowerCase().includes(searchTickets.toLowerCase())
          ).map((item, index) => {
            if (item.userName != "") {
              return (
                <div className="outerContainer" key={index}>
                  <div className="container mx-auto mt-8">
                    <div className="containerInfo">
                      <div>
                        <div className="containerInfoFirstInnerItem">
                          <div className="containerInfoInnerItemSerial">
                            {item.id}
                          </div>
                          <div className="containerInfoInnerItem">
                            {item.userName}: {item.userPhone}
                          </div>
                        </div>
                        <div className="containerInfoFirstInnerItem" style={{marginTop:5}}> 
                          <div className="containerInfoInnerItem">
                            {item.ticketUniquieId}
                          </div>
                        </div>
                      </div>
                      {item.winnerTag != "" && (
                        <div className="containerInfoInnerItem">
                          {item.winnerTag}
                        </div>
                      )}
                    </div>
                    <div className="number-card">
                      {item?.dateSet?.map((item, idx) => (
                        <div
                          className="number"
                          key={idx}
                          style={{
                            background: item.status === true ? "red" : "#fff",
                            color: item.status === true ? "#fff" : "#000",
                            borderRadius: item.status === true && "100%",
                          }}
                        >
                          {item.number}
                          {item.status}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          })
        }
    </div>
  );
};

export default Ticket;
