import React from "react";

const Manager = () => {
  return (
    <div className="py-20">
      <h1 className="text-white text-5xl py- font-serif">PassMan</h1>
      <p className="text-white text-xl">your personal password manager</p>
      <div className=" flex flex-col p-4 items-center">
        <div className="flex flex-col gap-8 py-4 ">
          <input className="inpbox" type="text" placeholder="Username" />
          <input className="inpbox" type="text" placeholder="Website Name" />
          <div className="relative">
            <input className="inpbox flex-1" type="text" placeholder="Password"/>
            <span
              className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              style={{ userSelect: "none" }}
            >
              <lord-icon
              src="https://cdn.lordicon.com/ntfnmkcn.json"
              trigger="hover">
            </lord-icon>
            </span>
          </div>
        </div>
        <button className="savebtn text-white ">
          <lord-icon
            src="https://cdn.lordicon.com/wixhsrdu.json"
            className="lrd"
            trigger="hover"
          ></lord-icon>
          Save
        </button>
      </div>
    </div>
  );
};
export default Manager;
