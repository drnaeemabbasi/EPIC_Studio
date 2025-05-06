import axios from "axios";
import { useEffect, useState } from "react";
import trashIcon from "../assets/trash-icon.svg";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBearerToken } from "./../utils/auth.utils.js";
import { Link } from "react-router-dom";
import editIcon from "../assets/edit-icon.svg";

import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./../components/ui/Table.jsx";
const UsersDataTable = ({ registerStatus }) => {
  const [users, setUsers] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (registerStatus) {
      fetchUsers();
    }
  }, [registerStatus]);
  useEffect(() => {
    const fetchUsersByCategory = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/createuser/fetchusersbycategory`,
          {
            params: { category: selectCategory },
            headers: {
              "Content-Type": "application/json",
              Authorization: getBearerToken(),
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users by data:", error);
      }
    };

    if (selectCategory) {
      fetchUsersByCategory();
    } else {
      fetchUsers();
    }
  }, [selectCategory]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/createuser/fetchusers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getBearerToken(),
          },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchUsersBySearch = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/createuser/fetchusersbysearch`,
          {
            params: { search },
            headers: {
              "Content-Type": "application/json",
              Authorization: getBearerToken(),
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users by search:", error);
      }
    };

    if (search) {
      fetchUsersBySearch();
    } else {
      fetchUsers();
    }
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, category) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/createuser/deleteuser`,
        {
          params: { id, category },
          headers: {
            "Content-Type": "application/json",
            Authorization: getBearerToken(),
          },
        }
      );

      if (res.status === 200) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        console.log("Failed to delete user");
      }
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  };

  return (
    <>
      <div className="mx-5">
        <h1>User Data Table</h1>
        <div className="w-full grid grid-cols-4 text-base gap-5">
          <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
            <select
              className="w-25 bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Paid">Paid</option>
              <option value="VIP">VIP</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
            <input
              type="text"
              placeholder="Search users"
              value={search}
              onInput={(e) => setSearch(e.target.value)}
              className="w-25 bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
            />
          </div>
        </div>
      </div>
      <div className="mx-5 my-10 hide-scroll border-[1px] border-gray-300 border-solid rounded-md overflow-x-auto max-w-full font-poppins shadow-2xl">
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                {["Sr.no", "Name", "Email", "Category", "Action"].map(
                  (item) => (
                    <TableHead>{item}</TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 &&
                users.map((user, index) => (
                  <TableRow>
                    <TableCell>{user.id || "-"}</TableCell>
                    <TableCell>{user.companyName || "-"}</TableCell>
                    <TableCell>{user.email || "-"}</TableCell>
                    <TableCell>{user.category || "Paid"}</TableCell>
                    <TableCell>
                      {/* <div className="flex justify-center gap-x-1"> */}
                      <div className="flex justify-center gap-x-1">
                        <Link
                          className="h-[23px]"
                          to={`/user-data/${user.id}/dashboard`}
                        >
                          <img
                            src={editIcon}
                            className="p-1 rounded hover:bg-slate-300 size-7"
                          />
                        </Link>
                        <img
                          src={trashIcon}
                          className="p-1 rounded hover:bg-slate-300 size-7"
                          alt="delete icon"
                          onClick={() => handleDelete(user.id, user.category)}
                        />
                        {/* </div> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ToastContainer
        theme={"colored"}
        hideProgressBar={true}
        transition={Slide}
        autoClose={1500}
        pauseOnFocusLoss={false}
        style={{
          "--toastify-font-family": "Poppins",
          "--toastify-color-success": "#00CC9CFF",
          "--toastify-color-warning": "#e74c3c",
        }}
      />
    </>
  );
};

export default UsersDataTable;
