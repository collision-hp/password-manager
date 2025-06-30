import React from "react";

const Manager = () => {
  return (
    <div>
        <h1 className="text-white text-5xl py-2">PassMan</h1>
        <p className="text-white text-xl">Your personal password manager</p>
        <div className=" flex flex-col p-4 items-center">
          <div className="flex flex-col gap-8 py-5 ">
          <input className="inpbox" type="text" placeholder="Enter your username"/>
          <input className="inpbox" type="text" name="" />
          <input className="inpbox" type="text" name="" />
          </div>
          <button className="savebtn text-white ">
            <lord-icon
              src="https://cdn.lordicon.com/wixhsrdu.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
    </div>
  );
};
export default Manager;
