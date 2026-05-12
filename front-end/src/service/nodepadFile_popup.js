import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const NotepadPopup = ({ isOpen, onClose, filename, content, onSave }) => {
  const [text, setText] = useState(content);

  const handleSave = () => {
    onSave(text);
    // onClose();
  };

  useEffect(() => {
    setText(content); // Sync the state with the content prop whenever it changes
  }, [content]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-8">
      <div className="bg-white rounded-lg w-full h-full p-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-black font-bold">Edit {filename} File</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow w-full border rounded-md p-4 text-black resize-none overflow-auto"
          style={{
            minHeight: "calc(100% - 8rem)", // Adjust height to fit within popup
          }}
        />

        {/* Footer Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            // className="w-full  bg-tc-dark-blue cursor-pointer text-white py-2 px-4 rounded-md "
            className="font-semibold bg-gray-300 text-gray-700 px-4 py-2 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            // className=" text-white px-4 py-2 rounded-md hover:bg-hover-tc-blue"
            className="bg-tc-dark-blue font-semibold bg-gray-300 text-white px-4 py-2 rounded-md border hover:border-tc-blue   focus:outline-none focus:hover-tc-blue"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotepadPopup;
