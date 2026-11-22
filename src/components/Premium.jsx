import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);

  const verfiyPremiumUser = async () => {
    const res = await axios.get(`${BASE_URL}/payment/verify`, {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        {
          membershipType: type,
        },
        { withCredentials: true },
      );

      const { keyId, amount, currency, orderId, notes } = order.data;

      var options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
        handler: verfiyPremiumUser,
      };
      const rzp1 = new window.Razorpay(options);
      // rzp1.on("payment.failed", function (response) {
      //   alert(response.error.code);
      //   alert(response.error.description);
      //   alert(response.error.source);
      //   alert(response.error.step);
      //   alert(response.error.reason);
      //   alert(response.error.metadata.order_id);
      //   alert(response.error.metadata.payment_id);
      // });
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isPremium ? (
        "You're already a premium user"
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-132px)]">
          <div className="flex w-full max-w-6xl">
            <div className="card bg-base-300 rounded-box grid grow p-4 gap-2">
              <h1 className="font-bold text-xl">Free</h1>
              <b className="font-bold text-3xl">₹0</b>
              <ol>
                <li>Create developer profile</li>
                <li>Browse developer profiles</li>
                <li>Send 10 connection requests per day</li>
                <li>Accept or reject requests</li>
                <li>Chat with connected developers</li>
              </ol>
              <button className="btn btn-neutral">Current Plan</button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid grow p-4 gap-2">
              <h1 className="font-bold text-xl">Silver</h1>
              <b className="font-bold text-3xl">
                ₹199 <span className="text-sm font-normal">/ month</span>
              </b>
              <ol>
                <li>Everything in Free</li>
                <li>Send 50 connection requests per day</li>
                <li>See who viewed your profile</li>
                <li>Advanced developer search filters</li>
                <li>Profile boost (2 times per month)</li>
                <li>Priority profile visibility</li>
              </ol>
              <button
                className="btn btn-primary"
                onClick={() => handleBuyClick("silver")}
              >
                Buy Silver
              </button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid grow p-4 gap-2">
              <h1 className="font-bold text-xl">Gold</h1>
              <b className="font-bold text-3xl">
                ₹399 <span className="text-sm font-normal">/ month</span>
              </b>
              <ol>
                <li>Everything in Silver</li>
                <li>Unlimited connection requests</li>
                <li>Unlimited profile boosts</li>
                <li>See who liked your profile</li>
                <li>Advanced filters (skills, experience, location)</li>
                <li>Priority placement in developer discovery</li>
                <li>Profile analytics</li>
                <li>Verified developer badge (after verification)</li>
              </ol>
              <button
                className="btn btn-secondary"
                onClick={() => handleBuyClick("gold")}
              >
                Buly Gold
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Premium;
