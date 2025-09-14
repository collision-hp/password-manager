import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const viewCred = () => {
    navigate(`/credentials`);
  };

  const handleIconClick = () => {
  // setShowPassword(!showPassword);
  //     alert(showPassword ? "Do you want to hide the password?" : "Do you want to show the password?");

    if (!showPassword) {
      alert("Do you want to show the password?");
      setShowPassword(true);
    } else {
      alert("Do you want to hide the password?");
      setShowPassword(false);
    }
  };

  const savePass = async () => {
    if (!form.username.trim() || !form.site.trim() || !form.password.trim()) {
      alert("Please fill in all the fields before saving.");
      return;
    }
    setPasswordArray([...passwordArray, form]);

    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }), // remove 'id' property from here
    });

    setForm({ site: "", username: "", password: "" });
    getPasswords();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-24">
      <h1 className="text-slate-400 text-5xl font-serif">⟪ PassMan ⟫</h1>
      <p className="text-slate-400 text-xl">your personal password manager</p>
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
              className="inpbox"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <span className="eyeicon" onClick={handleIconClick}>
              <img
                src={showPassword ? "/eyecross.png" : "/eyeopen.png"}
                alt={showPassword ? "Hide password" : "Show password"}
                style={{ width: "32px", height: "32px" }}
              />
            </span>
          </div>
        </div>

        <button onClick={savePass} className="savebtn text-white">
          <lord-icon
            src="https://cdn.lordicon.com/wixhsrdu.json"
            className="lrd"
            trigger="hover"
          ></lord-icon>
          Save
        </button>
        <button className="viewbtn" onClick={viewCred}>
          View your Credentials➡️
        </button>
      </div>
    </div>
  );
};

export default Manager;
