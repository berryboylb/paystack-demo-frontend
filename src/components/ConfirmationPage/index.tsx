import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Spinner = React.lazy(() => import("../Spinner"));

const verifyTransaction = async (ref: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:7000/api/v1/transaction?trxref=${ref}`
    );
    return data;
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
};
const Index = () => {
  const { trxref } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    "fetch",
    () => verifyTransaction(trxref as string),
    {
      onSuccess: (data) => {
        console.log(data);
        if (data) toast.success("Payment Successful");
      },
      onError: () => {
        toast.error("An error occured");
      },
    }
  );

  if (isLoading) return <Spinner />;
  if (isError)
    return <div>"An error has occurred: " + {(error as any).message};</div>;

  return (
    <div className="w-full py-10  mx-auto max-w-[1240px] px-5 ">
      {/* {data && (
        <pre className="text-[#000]">{JSON.stringify(data, null, 2)}</pre>
      )}{" "} */}
      {data ? (
        <div>
          <h1 className=" leading-9 text-center  font-bold text-[2rem] lg:text-[2.5rem] text-[#213F7D]">
            Here is your payment Information...
          </h1>

          <h3 className=" leading-9 mt-5 text-center lg:text-left font-bold text-[1.5rem] lg:text-[2rem] text-[#213F7D]">
            Payment Information
          </h3>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              Transaction Id:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result._id}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              Amount:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.amount}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              reference:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.reference}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              accessCode:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.accessCode}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              status:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.status ? "Succesful" : "failed"}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              ip address:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.ip_address}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              gateway response:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.gateway_response}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              domain:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.domain}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              verified:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.verified ? "verfied" : "not-verfied"}
            </h2>
          </div>

          <h3 className=" leading-9 mt-3 text-center lg:text-left font-bold text-[1.5rem] lg:text-[2rem] text-[#213F7D]">
            Logs
          </h3>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              start_time:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.logs.start_time}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              time_spent:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.logs.time_spent}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              attempts:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.logs.attempts}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              errors:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.logs.errors}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              success:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.logs.success ? "Yes" : "No"}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              Mobile:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.logs.mobile ? "Yes" : "No"}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              history:
            </h4>
            <>
              {data?.result.logs.history.map((item: any, i: number) => (
                <h2
                  key={i}
                  className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans"
                >
                  type: {item.type} message: {item.message} time: {item.time}
                </h2>
              ))}
            </>
          </div>

          <h3 className=" leading-9 mt-3 text-center lg:text-left font-bold text-[1.5rem] lg:text-[2rem] text-[#213F7D]">
            Transaction Authorization
          </h3>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              authorization code:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.authorization_code}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              bin:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.bin}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              last four digits:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.last4}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              expiry month:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.exp_month}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              expiry year:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.exp_year}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              channel:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.channel}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              Card type:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.card_type}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              bank:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.bank}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              country code:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.country_code}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              brand:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.brand}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              reusable:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.reusable}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              signature:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.signature}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              account_name:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.account_name
                ? data?.result.transaction_authorization.account_name
                : "N/A"}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              receiver bank account number:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization
                .receiver_bank_account_number
                ? data?.result.transaction_authorization
                    .receiver_bank_account_number
                : "N/A"}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              receiver bank:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization.receiver_bank
                ? data?.result.transaction_authorization.receiver_bank
                : "N/A"}
            </h2>
          </div>

          <div className="mt-3 flex flex flex-wrap justify-start items-center ">
            <h4 className="text-[#545F7D] text-xs lg:text-sm font-normal uppercase font-workSans">
              id:
            </h4>
            <h2 className=" ml-5 text-[#545F7D] text-base lg:text-lg font-semibold capitalize font-workSans">
              {data?.result.transaction_authorization._id}
            </h2>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className=" leading-9 mt-3 text-center  font-bold text-[1.5rem] lg:text-[2rem] text-[#213F7D]">
            "Your transaction hasn't been completed :(" ;
          </h1>
        </div>
      )}
    </div>
  );
};

export default Index;
