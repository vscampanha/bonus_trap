import { useState } from "react";
import Router from "next/router";

const Home = () => {
  const [formData, setFormData] = useState({
    company: "",
    bonus: "",
    img: "",
    bg: "",
    color: "",
  });
  // const [placeHolder, setPlaceHolder] = useState("Company");
  // const [value, setValue] = useState("");

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let url = "/game?";
    for (const key in formData) {
      if (key === "img") {
        formData[key] = encodeURIComponent(formData[key]);
      }
      url += `${key}=${formData[key]}&`;
    }

    const finalURL = url.slice(0, -1);
    Router.push(`${finalURL}`);
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit} className="form">
        <label>
          <input
            className="input_name"
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />
          <input
            className="input_name"
            type="text"
            name="bonus"
            placeholder="Bonus Phrase"
            value={formData.bonus}
            onChange={handleChange}
          />
          <input
            className="input_name"
            type="text"
            name="img"
            placeholder="Image URL"
            value={formData.img}
            onChange={handleChange}
          />
          <input
            className="input_name"
            type="text"
            name="bg"
            placeholder="Background Color"
            value={formData.bg}
            onChange={handleChange}
          />
          <input
            className="input_name"
            type="text"
            name="color"
            placeholder="Bonus Color"
            value={formData.color}
            onChange={handleChange}
          />
          <div className="btn_form">
            <button type="submit">Submit</button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default Home;
