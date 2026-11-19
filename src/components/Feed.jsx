import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feeds) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-132px)] my-6">
      {!feeds?.length ? <p>No user found</p> : <UserCard feed={feeds[0]} />}
    </div>
  );
};

export default Feed;
