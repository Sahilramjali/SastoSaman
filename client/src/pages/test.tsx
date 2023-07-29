import { useState } from "react";

import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Test = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [cookies, ,] = useCookies(["user"]);
  const navigate = useNavigate();
  const [image, setFile] = useState("");
  const handleFileChange = (e: any) => {
    const tempFile = e.target.files[0];
    if (tempFile) {
      const reader = new FileReader();
      reader.readAsDataURL(tempFile);
      reader.onloadend = () => {
        console.log(reader.result);
        setFile(reader.result);
      };
    }
  };
  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/product/addProduct",
        {
          name,
          category,
          description,
          image,
          price,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `bearer ${cookies.user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success("product uploaded");
          navigate("/");
        }
      })
      .catch(() => {
        toast.error("Server error");
      });
  };
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-3">
        <input type="file" name="file" onChange={handleFileChange} />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="border"
        />
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="category name"
          className="border"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
          className="border"
        />
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          placeholder="price"
          className="border"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Test;
