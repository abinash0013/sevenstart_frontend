// const mainUrl = `http://localhost:8000/`;
const mainUrl = process.env.REACT_APP_API_URL;

const base = {
  getNumberOneToHundredForCalling: `${mainUrl}/getNumberOneToHundredForCalling`,
  getGameIdAndGameNameForUser:`${mainUrl}/getGameIdAndGameNameForUser`,
  getGameDetailsForUser:`${mainUrl}/getGameDetailsForUser`,
  ticketCardViewForUser: `${mainUrl}/ticketCardViewForUser`,
  updateTicketStatus: `${mainUrl}/updateTicketStatus`,
  disclaimerList: `${mainUrl}/disclaimerList`,
  aboutList: `${mainUrl}/aboutList`,
  announcementList: `${mainUrl}/announcementList`,
  activeAnnouncement: `${mainUrl}/activeAnnouncement`,
  getNumberToSpeak: `${mainUrl}/getNumberToSpeak`,
  saveFeedback: `${mainUrl}/saveFeedback`,
  // adminLogin: mainUrl + `adminLogin`,
  // saveAgent: mainUrl + `saveAgent`,
  // agentsList: mainUrl + `agentsList`,
  // editAgent: mainUrl + `editAgent`,
  // deleteAgent: mainUrl + `deleteAgent`,
  // saveUser: mainUrl + `saveUser`,
  // usersList: mainUrl + `usersList`,
  // editUser: mainUrl + `editUser`,
  // deleteUser: mainUrl + `deleteUser`,
  // saveTicket: mainUrl + `saveTicket`,
  // ticketList: mainUrl + `ticketList`,
  // editTicket: mainUrl + `editTicket`,
  // deleteTicket: mainUrl + `deleteTicket`,
  // ticketCardView: mainUrl + `ticketCardView`,
  // gameList: mainUrl + `gameList`,
  // saveGame: mainUrl + `saveGame`,
  // editGame: mainUrl + `editGame`,
};
export { base };
