import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import style from "./Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver";
import {useNavigate} from 'react-router-dom'

function Home() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [auth, setAuth] = useState(null)
  const navigate = useNavigate()



  const getData = async (token) => {
    const response = await fetch(`http://localhost:4000/getImages/${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200) {
      const res = await response.json();
      setData([...data, ...res.data]);
    }
  };

  useEffect(()=>{
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth) {
      navigate("/login");
    }

   

  },[auth])

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    const { token, name } = auth;

    setName(name);

    getData(token);
  }, [page]);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleFavourite = async (item) => {
    const { _id, author, width, url, download_url, height } = item;
    const auth = JSON.parse(localStorage.getItem("auth"));

    const { token, name } = auth;

    const response = await fetch(`http://localhost:4000/favourite/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 201) {
      toast.success("Item added in Favourite");
    }

    if (response.status == 400) {
      toast.error("Product are not available");
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleDownload = async (downloadUrl, filename) => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "image.jpg";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleLogout = () => {
    
    localStorage.setItem('auth', null)
   
    setAuth(true);
  };

  

  return (
    <div className={style.mainContainer}>
      <ToastContainer />
      <Navbar name={name} logout={handleLogout} />
      <div className={style.gridContainer}>
        {data.map((item) => {
          return (
            <div
              key={item._id}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={item.download_url} alt="" />

              {hoveredItem === item && (
                <div className={style.hoverEffect}>
                  <p>{item.author}</p>
                  <p onClick={() => handleFavourite(item)}>Add to Favourite</p>
                  <p
                    onClick={() =>
                      handleDownload(item.download_url, "image.jpg")
                    }
                  >
                    Download
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={handleLoadMore} className={style.loadMore}>
        Load more...
      </button>
    </div>
  );
}

export default Home;
