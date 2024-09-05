import React, { useEffect, useState } from 'react'
import "./Chat.css";
import { getApiCall } from '../../services/AppSetting';
import { base } from '../../constants/Data.constant';

const Chat = () => {

  
useEffect(() => {
  about_list()
}, [])

const [whatsAppNumber, setWhatsAppNumber] = useState("");

const about_list = async () => {
  let result = await getApiCall(base.aboutList)  
  if(result.length > 0){
    setWhatsAppNumber(result[0].whatsappNumber)
  }
}

  return (
    <div className='chatOuter'>
      <a
        href={`https://wa.me/${whatsAppNumber}`}
        // href=""
        class="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa fa-whatsapp whatsapp-icon"></i>
      </a>
    </div>
  )
}

export default Chat