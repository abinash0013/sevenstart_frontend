import React, { useEffect, useState } from 'react';
import "./GameStart.css";
import "firebase/compat/database";
import Ticket from '../Ticket/Ticket';
import firebase from 'firebase/compat/app';
import { base } from '../../constants/Data.constant';
import { getApiCall, postApiCall } from '../../services/AppSetting';
import Winner from '../Winner/Winner';
import Banner from '../Banner/Banner'; 
import PrevTicket from '../Ticket/PrevTicket';

const GameStart = () => {
  const [number, setNumber] = useState([]);
  const [serialNumber, setSerialNumber]=useState([]);
  const [gameId, setGameId] = useState("");
  const [currentNumberCall, setCurrentNumberCall] = useState("");
  const [ticket, setTicket] = useState([]); 
  const [isLiveGameStatusClosed, setIsLiveGameStatusClosed]=useState(true);

  // Initialize Firebase with your config
  const REACT_APP_apiKey = process.env.REACT_APP_apiKey;
  const REACT_APP_authDomain = process.env.REACT_APP_authDomain;
  const REACT_APP_projectId = process.env.REACT_APP_projectId;
  const REACT_APP_storageBucket = process.env.REACT_APP_storageBucket;
  const REACT_APP_messagingSenderId = process.env.REACT_APP_messagingSenderId;
  const REACT_APP_appId = process.env.REACT_APP_appId;
  const REACT_APP_measurementId = process.env.REACT_APP_measurementId;
  const REACT_APP_databaseURL = process.env.REACT_APP_databaseURL;

  const firebaseConfig = {
    apiKey: REACT_APP_apiKey,
    authDomain: REACT_APP_authDomain,
    projectId: REACT_APP_projectId,
    storageBucket: REACT_APP_storageBucket,
    messagingSenderId: REACT_APP_messagingSenderId,
    appId: REACT_APP_appId,
    measurementId: REACT_APP_measurementId,
    databaseURL: REACT_APP_databaseURL,
  };
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database(); 
  var ref = db.ref('game')

  // Fetch the required data using the get() method
  const fetch_data = () => {
    console.log("fetchdataaa");
    ref.on("value", snapshot => {
      if (snapshot.val() != null) {
        setIsLiveGameStatusClosed(false)
        console.log("snapshotttt", snapshot?.val().currentCalledNumber);
        setNumber(JSON.parse(snapshot.val().number_set));
        setGameId(snapshot.val().game_id);
        setCurrentNumberCall(snapshot.val().currentCalledNumber)
        ticketCardView(snapshot.val().game_id);
        numberSpeakDynamic(snapshot?.val().currentCalledNumber) 
      } else {
        console.log("closed");
      }
    })
  }

  const synth = window.speechSynthesis;

  const handleSpeak = (val) => {
    console.log("handlespeakVal",val);
    // let seprateNumber = val.toString().split('');
    // let textForCalling = seprateNumber[0] + "and" + seprateNumber[1] + val
    // Create a new SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance(val);
    // Specify a female voice (you may need to adjust this based on available voices)
    const voices = synth.getVoices();
    // const femaleVoice = voices.find((voice) => voice.name.includes('Female'));
    const femaleVoice = voices.find((voice) => voice.name.includes('Male'));
    if (femaleVoice) {
    console.log("femaleVoicehandlespeakVal",femaleVoice);
      utterance.voice = femaleVoice;
    }
    // Set the speech rate (0.5 is slower, 2.0 is faster)
    utterance.rate = 0.8; // Adjust the rate as needed
    // Speak the text
    synth.speak(utterance);
  };

  useEffect(() => {
    fetch_data();
    serialNumberFunction();
    // cutTicketNumberIfMatched();
    // ticketCardView()
  }, []);
  
  const ticketCardView = async (gameId) => {
    let req = {
      gameId: gameId
    }
    let result = await postApiCall(base.ticketCardViewForUser, req)
    try {
      let convertJSON = JSON.parse(result.data[0].ticket_set);
      console.log("testingtes",convertJSON)
      setTicket(convertJSON)
    } catch (error) {
    }
  }

  let lastNumber = "";
  const numberSpeakDynamic = async (getNumber) =>{
    console.log("numberSpeakDynamicCalling");
    let req = {
      number: getNumber
    }
    // console.log("reqreqreqqw", req);
    let result = await postApiCall(base.getNumberToSpeak, req)
    console.log("resulttttw", result.data[0]?.Number_in_text);
    if(lastNumber!=result.data[0]?.Number_in_text){
      handleSpeak(result.data[0]?.Number_in_text) 
      lastNumber = result.data[0]?.Number_in_text
    }
  } 

  const serialNumberFunction = ()=>{
    const serialNumbers = Array.from({ length: 99 }, (_, index) => index + 1);
    setSerialNumber(serialNumbers)
  }
  
  return (
    <>
      <Banner number={currentNumberCall} />      
      {isLiveGameStatusClosed == true ? (
        <div class="ticketSection">
          <div class="outerContainer">
            <div class="container mx-auto mt-1">
              <div class="number-card">
              {serialNumber.map((itemSerialNumber,index)=>(
                <div div class="number" key={index} style={{ backgroundColor: "#fff", color: "#000" }}>
                  {itemSerialNumber} 
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ):(
      <div class="ticketSection">
        <div class="outerContainer">
          <div class="container mx-auto mt-1">
            <div class="number-card"> 
              {number?.map((itemNumber, index) => ( 
                <div div class="number" key={index} style={{ backgroundColor: itemNumber.status == "true" ? "red" : "#fff", color: itemNumber.status == "true" ? "#fff" : "#000", }}>
                  {itemNumber.number} 
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )} 

      <Winner ticket={ticket} />
      
      {isLiveGameStatusClosed == true ? (
        <PrevTicket />
      ):(
        <Ticket number={number} gameId={gameId} setTicket={setTicket} ticket={ticket} />
      )}
    </>
  )
}

export default GameStart