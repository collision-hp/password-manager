import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Credential = () => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [copied, setCopied] = useState({ index: null, field: null });
  const [editIndex, setEditIndex] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const renderCopied = (index, field) => {
    if (copied.index === index && copied.field === field) {
      return ("Copied to Clipboard");
    }
  };

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const handleCopy = (text, index, field) => {
    navigator.clipboard.writeText(text);
    setCopied({ index, field });
    setTimeout(() => setCopied({ index: null, field: null }), 1500);
  };

  // delete from backend
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/${id}`, { method: "DELETE" });
    getPasswords();
  };

  // ✅ edit password in backend
  const handleSaveEdit = async (id, index) => {
    const updatedPassword = { ...passwordArray[index], password: newPassword };
    await fetch(`http://localhost:3000/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPassword),
    });
    setEditIndex(null);
    getPasswords();
  };

  return (
    <div className="py-24 text-white">
      <h1 className="text-4xl font-bold mb-4 py-3">User Credentials</h1>

      {passwordArray.length === 0 ? (
        <div>No passwords to show</div>
      ) : (
        <table className="table-auto mx-auto whitespace-nowrap w-full max-w-3xl text-center rounded-xl overflow-hidden bg-gray-800">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-20 py-3 text-xl">Username</th>
              <th className="px-20 text-xl">Website URL</th>
              <th className="px-20 text-xl">Password</th>
              <th className="px-20 text-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {passwordArray.map((item, index) => (
              <tr key={item._id} className="border border-gray-600">
                <td className="py-2 px-4 border border-gray-600">
                  <div
                    className="relative group cursor-pointer inline-block"
                    onClick={() => handleCopy(item.username, index, "username")}
                    title="Copy"
                  >
                    {item.username}
                    {renderCopied(index, "username")}
                  </div>
                </td>
                <td className="py-2 px-4 border border-gray-600">
                  <a href={item.site} target="_blank" rel="noreferrer">
                    {item.site}
                  </a>
                </td>
                <td className="py-2 px-4 border border-gray-600">
                  <div
                    className="relative group cursor-pointer inline-block"
                    onClick={() => handleCopy(item.password, index, "password")}
                    title="Copy"
                  >
                    {item.password}
                    {renderCopied(index, "password")}
                  </div>
                </td>
                <td>
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        className="px-1 py-1 rounded text-black"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: "100px" }}
                      />
                      <button
                        className="ml-2 px-2 py-1 bg-green-600 text-white rounded"
                        onClick={() => handleSaveEdit(item.id, index)}
                      >
                        Save
                      </button>
                      <button
                        className="ml-2 px-2 py-1 bg-slate-500 text-white rounded"
                        onClick={() => setEditIndex(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span
                      className="cursor-pointer mr-6"
                      title="Edit"
                      onClick={() => {
                        setEditIndex(index);
                        setNewPassword(item.password);
                      }}
                    >
                      ✏️
                    </span>
                  )}

                  <span
                    className="cursor-pointer"
                    title="Delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="viewbtn w-60">
        <Link to="/">⬅️Back to Manager</Link>
      </div>
    </div>
  );
};

export default Credential;
