import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConnections(res.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      <h1 className="font-bold text-3xl text-center my-4">Connections</h1>
      <div className="flex gap-6 justify-center">
        {connections?.length === 0 ? <p>No connections found</p> : ""}
        {connections &&
          connections.map((connection) => {
            const { _id, firstName, lastName, gender, age, photoUrl, about } =
              connection;
            return (
              <div key={_id} className="card bg-base-300 w-96 shadow-sm">
                <figure>
                  <img src={photoUrl} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Connections;
