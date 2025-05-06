import React, { useState } from "react";
import axios from "axios";
import { FaBattleNet } from "react-icons/fa";

const RunExepop = () => {
  const [output, setOutput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [totalRunTime, setTotalRunTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunEpic = async () => {
    setLoading(true);
    setShowModal(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/run-epic/`
      );
      const data =
        typeof response.data === "string" ? response.data : response.data;

      setTotalRunTime(data.output.totalRunTime);
      setOutput(data.output.years);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setOutput("");
    setTotalRunTime(null);
  };

  return (
    <>
      {/* <div className="w-full flex justify-end mt-4 pr-16"> */}
      <button
        onClick={handleRunEpic}
        // className="font-semibold border-[2.5px] border-tc-dark-blue  py-2 px-4 cursor-pointer text-black rounded-md hover:bg-tc-blue hover:text-tc-dark-blue focus:outline-none focus:tc-blue"

        className="border-[2.5px] font-semibold border-tc-dark-blue flex items-center justify-between cursor-pointer text-black py-2 px-12 rounded-md hover:bg-tc-blue focus:outline-none focus:tc-blue"
      >
        {/* <FaBattleNet /> */}
        Run
      </button>
      {/* </div> */}

      {/* Modal for displaying output */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {loading ? (
              <div className="flex justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">
                  Execution Output
                </h2>
                <pre className="text-white bg-tc-dark-blue p-4 rounded-md overflow-auto max-h-64 whitespace-pre-wrap break-words">
                  {Array.isArray(output) ? (
                    <table className="w-full text-center text-sm">
                      <thead>
                        <tr className="bg-tc-blue text-white">
                          <th className="py-1">Year</th>
                          <th className="py-1">Total Years</th>
                        </tr>
                      </thead>
                      <tbody>
                        {output.map((item, index) => (
                          <tr key={index} className="bg-white text-black">
                            <td className="py-1">{item.year}</td>
                            <td className="py-1">{item.totalYears}</td>
                          </tr>
                        ))}
                        {totalRunTime && (
                          <>
                            <tr className="font-bold">
                              <td colSpan={2} className="pt-4">Total Run Time</td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                hours: {totalRunTime.hours}, minutes: {totalRunTime.minutes}, seconds: {totalRunTime.seconds}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  ) : typeof output === "string" ? (
                    <div>{output}</div>
                  ) : typeof output === "object" && output !== null ? (
                    Object.keys(output).map((key) => (
                      <div key={key}>
                        <strong>{key}:</strong>
                        <pre>{JSON.stringify(output[key], null, 2)}</pre>
                      </div>
                    ))
                  ) : (
                    <div>No output available.</div>
                  )}
                </pre>

                <button
                  onClick={closeModal}
                  className="mt-4 text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md block mx-auto"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RunExepop;
