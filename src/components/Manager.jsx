import React, { useEffect, useState } from "react";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  useEffect(()=>{
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
    
  },[])

  const [iconProps, setIconProps] = useState({
    //iconProps is the current state value (an object holding your icon's properties).
    //setIconProps is the function to update that state.
    src: "https://cdn.lordicon.com/dicvhxpz.json",
    trigger: "hover",
    stroke: "bold",
    colors: "primary:#ffffff,secondary:#30c9e8",
  });

  const showpassword = () => {
    alert("Show the password");
    setIconProps({
      ...iconProps, //to copy all the existing properties of the iconProps
      state: "morph-cross", //overrides the iconprops
    });
  };

  const savePass = () => {
    setpasswordArray([...passwordArray,form])
    localStorage.setItem("password",JSON.stringify([...passwordArray,form]))
    console.log([...passwordArray,form])
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-20">
      <h1 className="text-white text-5xl font-serif">PassMan</h1>
      <p className="text-white text-xl">your personal password manager</p>
      <div className="flex flex-col p-4 items-center">
        <div className="flex flex-col gap-8 py-4">
          <input
            value={form.username}
            onChange={handleChange}
            className="inpbox"
            name="username"
            type="text"
            placeholder="Username"
          />
          <input
            value={form.site}
            onChange={handleChange}
            className="inpbox"
            name="site"
            type="text"
            placeholder="Website URL"
          />
          <div className="relative">
            <input
              value={form.password}
              onChange={handleChange}
              className="inpbox flex-1"
              name="password"
              type="text"
              placeholder="Password"
            />
            <span
              className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={showpassword}
              style={{ userSelect: "none" }}
            >
              <lord-icon
                src={iconProps.src}
                trigger={iconProps.trigger}
                stroke={iconProps.stroke}
                colors={iconProps.colors}
                state={iconProps.state}
              ></lord-icon>
            </span>
          </div>
        </div>

        <button onClick={savePass} className="savebtn text-white ">
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
