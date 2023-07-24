import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import style from "./Favourite.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Favourite() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate()


  useEffect(()=>{
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth) {
      navigate("/login");
    }

   

  },[auth])

  const getData = async (token) => {
    const response = await fetch(`http://localhost:4000/favourite/${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200) {
      const res = await response.json();
      console.log(res,'this is resp')
      setData([...data, ...res.data]);
    }
    if(response.status == 404){
      toast.error("No data found");
    }
  };

  console.log(data)

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


  const getOriginalData=async(token)=>{
    const response = await fetch(`http://localhost:4000/favourite/${1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200) {
      const res = await response.json();
      console.log(res,'this is resp')
      setData([ ...res.data]);
    }
    if(response.status == 404){
      toast.error("No data found");
    }
  }

  const handleRemoveFavourite = async (item) => {
    const { _id, author, width, url, download_url, height } = item;
    const auth = JSON.parse(localStorage.getItem("auth"));

    const { token, name } = auth;

    const response = await fetch(`http://localhost:4000/favourite/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200) {
      toast.success("Item Deleted successFully");
      const auth = JSON.parse(localStorage.getItem("auth"));

      const { token, name } = auth;

      getOriginalData(token)
    }

    if (response.status == 400) {
      toast.error("Product not found...");
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
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
                  <p onClick={() => handleRemoveFavourite(item)}>Remove From Favourite</p>
                  
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

export default Favourite;
