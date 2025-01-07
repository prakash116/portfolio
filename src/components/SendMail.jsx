import React, { useState } from 'react'
import emailjs from "@emailjs/browser";

function SendMail() {
    const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [message, setMessage] = useState("");
    
      const handelSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
          alert("Please fill all the fields");
          return;
        }
        alert(`Message sent to ${email}`);
    
        const serviseId = "service_p52ityf";
        const templateId = "template_j2yiuja";
        const publicKey = "rk3VyQHl2omE-tVMu";
    
        const templateParams = {
          to_name: "Prakash Mani",
          from_name: name,
          from_email: email,
          message: message,
        };
    
        emailjs
          .send(serviseId, templateId, templateParams, publicKey)
          .then((response) => {
            console.log("Email sent Successfully!", response);
            setName("");
            setEmail("");
            setMessage("");
          })
          .catch((e) => {
            console.log("Error sendind email", e);
          });
      };

  return (
    <>
      <form
            onSubmit={handelSubmit}
            noValidate=""
            className="flex flex-col space-y-4 pt-5 md:py-0 md:px-6"
          >
            <label className="block">
              <span className="mb-1">Full Name</span>
              <input
                type="text"
                placeholder="Enter your name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full text-blue-900 rounded-sm p-1 shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="mb-1">Email Address</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full text-blue-900 rounded-sm p-1 shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full text-blue-900 rounded-sm p-1 focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
              ></textarea>
            </label>
            <button
              type="submit"
              className=" btn self-center px-8 text-lg rounded hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600"
            >
              Submit
            </button>
          </form>
    </>
  )
}

export default SendMail
