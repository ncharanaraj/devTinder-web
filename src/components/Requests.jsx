import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      dispatch(addRequests(res.data?.connectionRequests));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <h1 className="font-bold text-3xl text-center my-4">
        Connection Requests
      </h1>
      <div className="flex gap-6 justify-center">
        {requests?.length === 0 ? <p>No requests found</p> : ""}
        {requests &&
          requests.map((request) => {
            const { _id, firstName, lastName, gender, age, photoUrl, about } =
              request.fromUserId;
            return (
              <div key={_id} className="card bg-base-300 w-96 shadow-sm">
                <figure>
                  <img src={photoUrl} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Requests;
