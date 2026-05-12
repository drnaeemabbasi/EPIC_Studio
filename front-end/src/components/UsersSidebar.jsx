import { useState, useEffect } from "react";
import Button from "./../components/ui/Button";

const UsersSidebar = ({ selectedForm, setSelectedForm }) => {
  //   const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="bg-white absolute min-w-[300px] max-h-[656px] top-[1px] left-[40px] rounded-[8px] font-poppin">
      <div className="flex flex-col items-start gap-4">
        <h2 className="m-0 mb-4 text-center font-extrabold text-2xl">
          Select one
        </h2>
        <div className="flex flex-col gap-y-4">
          <Button
            className={selectedForm === "VIP" ? "bg-tc-green text-white" : ""}
            onClick={() =>
              setSelectedForm((previousValue) =>
                previousValue === "VIP" ? "" : "VIP"
              )
            }
          >
            VIP
          </Button>

          <Button
            className={selectedForm === "Paid" ? "bg-tc-green text-white" : ""}
            onClick={() =>
              setSelectedForm((previousValue) =>
                previousValue === "Paid" ? "" : "Paid"
              )
            }
          >
            Paid
          </Button>

          <Button
            className={selectedForm === "HR" ? "bg-tc-green text-white" : ""}
            onClick={() =>
              setSelectedForm((previousValue) =>
                previousValue === "HR" ? "" : "HR"
              )
            }
          >
            HR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsersSidebar;
