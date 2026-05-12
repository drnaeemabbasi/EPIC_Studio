import React, { useState } from "react";

// Modal Component
const Modal = ({ show, onClose, data, onChange, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Row</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Table Component
const TableWithPopup = () => {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [selectedData, setSelectedData] = useState({
    id: null,
    name: "",
    email: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (row) => {
    setSelectedData(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData({ ...selectedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedData.id ? selectedData : item
      )
    );
    setShowModal(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="py-2 px-4 border-b">{row.id}</td>
              <td className="py-2 px-4 border-b">{row.name}</td>
              <td className="py-2 px-4 border-b">{row.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditClick(row)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        data={selectedData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TableWithPopup;
