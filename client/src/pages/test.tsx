import { useState } from "react";

import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Test = () => {
    const navigate=useNavigate();
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
          name: "Electronics appliance",
          category: "Electronics appliance",
          description: `With Mic:Yes Bluetooth version: 5.3 Wireless Range: 10m
                Battery Time: upto Hours
                13mm Drivers
                IPX5 Water & Sweat Resistance`,
          image,
          price: 1000,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJjYTMxYWUzYzYwNDNlODExMzYyODMiLCJ1c2VybmFtZSI6ImpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yM1QwMzo0ODo0Mi4wMzBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yM1QwMzo0ODo0Mi4wMzBaIiwiX192IjowLCJpYXQiOjE2OTAwODQxMzZ9.sZ2nlMoTVLgfzxLkhzQTODji_23Y80XIpS3tV47pif0`,
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success("blog posted");
          navigate("/");
         
        }
      })
      .catch(() => {
        toast.error("Server error");
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Test;
