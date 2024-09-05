import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'; 
import { getApiCall, postApiCall } from '../../services/AppSetting';
import { base } from '../../constants/Data.constant';

const Footer = () => {
  const cancelButtonRef = useRef(null);
  const [feedbackFormOpen, setFeedbackFormOpen] = useState(false);
  const [aboutUsDialog, setAboutUsDialog] = useState(false);
  const [aboutUsDescription, setAboutUsDescription] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
    getAboutUs();
  })


  const getAboutUs = async () => {
    let result = await getApiCall(base.aboutList) 
    if(result.length > 0){
      setAboutUsDescription(result[0]?.about_message)
    }
  }

  const handleFeedbackForm = () => {
    setFeedbackFormOpen(true);
  };

  const handleAboutUs = () => {
    setAboutUsDialog(true)
  }

  const submitFeedbackForm = async () => {
    setFeedbackFormOpen(false)
    if(username == ""){
      alert("name is mandatory")
    } else if(email == ""){
      alert("email is mandatory")
    } else if(description == ""){
      alert("description is mandatory")
    } else {
      let req = {
        username: username,
        email: email,
        description: description
      }
      let result = await postApiCall(base.saveFeedback, req)
      console.log("resultLoggg", result);      
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-around items-center mt-5 px-4 sm:px-0">
      <p onClick={handleFeedbackForm} className="cursor-pointer text-sm sm:text-base text-center winnerSectionHeadingContainer">Feedback</p>
      <Transition.Root show={feedbackFormOpen} as={Fragment} data-modal-backdrop="static">
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setFeedbackFormOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Feedback Form
                        </Dialog.Title>
                        <div className="mt-2">
                          <form className="w-full">
                            <div className="mt-4">
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                              />
                            </div>
                            <div className="mt-4">
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                              />
                            </div>
                            <div className="mt-4">
                              <textarea
                                name="message"
                                placeholder="Message"
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => submitFeedbackForm()}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setFeedbackFormOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>              
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <p onClick={handleAboutUs} className="cursor-pointer text-sm sm:text-base text-center winnerSectionHeadingContainer">About Us</p>
      <Transition.Root show={aboutUsDialog} as={Fragment} data-modal-backdrop="static">
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setAboutUsDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 max-w-4xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          About us
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="mt-2 text-sm text-gray-500">
                            {aboutUsDescription}
                          </p>
                        </div>
                      </div>
                     </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">  
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setAboutUsDialog(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>              
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Footer;
