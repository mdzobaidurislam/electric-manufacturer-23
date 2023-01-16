import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/Firebase.init";
import SpinnerLoading from "../../../Share/SpinnerLoading";
// import { toast } from "react-toastify";
import { env } from "../../../../env";

const PaymenForm = ({ orderItem }) => {
  const [user, loading] = useAuthState(auth);

  const { _id, userEmail, user_name, price, order_quantity } = orderItem;
  // const totalPrice = order_quantity * price;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  // const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const paymentIntent = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
        const url = `${env.baseUrl}/api/create-payment-intent/`;
        const dataPaymentIntent = await axios.post(
          url,
          { price, order_quantity },
          config
        );
        if (dataPaymentIntent?.data.clientSecret) {
          setClientSecret(dataPaymentIntent.data.clientSecret);
        } else {
          // setMessage(dataPaymentIntent.data.msg);
          console.log(dataPaymentIntent);
        }
      };
      paymentIntent();
    } catch (error) {
      console.log(error);
    }
  }, [price, order_quantity]);

  console.log(clientSecret);
  // order update payment
  const orderUpdatePayment = async (payment) => {
    console.log(payment);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const url = `${env.baseUrl}/api/order-payment-update/${_id}/${user?.email}`;
    console.log("object");
    const paymenDataUpdate = await axios.patch(url, payment, config);
    if (paymenDataUpdate?.data) {
      setProcessing(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(elements);
    if (!stripe || !elements) {
      console.log(stripe);

      return;
    }
    const card = elements.getElement(CardElement);

    console.log(card);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      billing_details: {
        name: user_name,
        email: userEmail,
      },
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);
    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user_name,
            email: userEmail,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess("Congrats! Your payment is completed.");

      //store payment on database
      const payment = {
        orderId: _id,
        totalPrice: price * order_quantity,
        transactionId: paymentIntent.id,
      };
      orderUpdatePayment(payment);
      // console.log(payment);
    }
  };
  // if (message) {
  //   toast.error(message);
  // }
  if (loading) {
    return <SpinnerLoading />;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border p-4"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-success btn-lg w-full  mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || success || processing}
        >
          {processing ? "Prosecing......" : "Pay Now"}
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success} </p>
          <p>
            Your transaction Id:{" "}
            <span className="text-orange-500 font-bold">{transactionId}</span>{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default PaymenForm;
