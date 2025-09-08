import React from "react";
import { motion } from "framer-motion";

const contacts = [
  { id: 1, name: "Ayush Yadav", phone: "+91 63596 73895" , email:"phoenixits29@gmail.com"},
  { id: 2, name: "Pratham Sharma", phone: "+91 94263 88125" , email:"pratham0254@gmail.com" },
  { id: 3, name: "Vatsal Prajapati", phone: "+91 63571 19011" , email:"vatsalprajapati2004@gmail.com" },
  { id: 4, name: "Jayrajsinh Zala", phone: "+91 63536 48317" , email:"jayrajsinhzala1101@gmail.com"},
];

const Contact = () => {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto min-h-screen mt-20 p-6 shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        Contact Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            className="p-6 shadow-md rounded-xl text-center cursor-pointer transition-all min-h-[150px] flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            whileHover={{
              scale: 1.12,
              boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.5)",
              transition: { duration: 0.15, ease: "easeInOut" },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl font-semibold text-green-700">{contact.name}</h2>
            <p className="text-gray-600">{contact.phone}</p>
            <p className="text-gray-600">{contact.email}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Contact;