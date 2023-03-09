import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { BackGroundTwo } from "../../assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import toast from "react-hot-toast";
const Spinner = React.lazy(() => import("../Spinner"));

const Index = () => {
  const queryClient = useQueryClient();
  const formSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, { message: "Name must have at least three characters " })
      .max(30, {
        message: "Name must not be greater than 30 characters",
      }),
    email: z
      .string()
      .email("This is not a valid email.")
      .trim()
      .min(8, { message: "Email length must be at least 8." }),
    amount: z
      .number({
        required_error: "amount is required",
        invalid_type_error: "amount must be a number",
      })
      .refine((val) => val >= 1, "amount must be greater than or equal to 1"),
  });

  type FormSchmaType = z.infer<typeof formSchema>;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchmaType>({
    resolver: zodResolver(formSchema),
  });
  const createTransaction = async (data: FormSchmaType) => {
    const config = {
      headers: { "Content-Type": "application/json", Accept: "text/plain" },
    };
    const body = JSON.stringify(data);
    try {
      const res = await axios.post(
        "http://localhost:7000/api/v1/transaction",
        body,
        config
      );
      return res.data;
    } catch (error: any) {
      const errors = error.response.data.errors;
      if (errors) {
        for (let err in errors) {
          console.log(errors[err][0]);
          toast.error(errors[err][0]);
        }
      }
    }
  };
  const { mutate, isLoading } = useMutation(createTransaction, {
    onSuccess: (data) => {
      toast.success("Transaction created");
      //   window.open(data.result);
      window.location = data.result;
    },
    onError: () => {
      toast.error("An error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
  const onSubmit: SubmitHandler<FormSchmaType> = async (data) => {
    mutate(data);
  };
  if (isLoading)
    return (
      <React.Suspense fallback={<Spinner />}>
        <Spinner />
      </React.Suspense>
    );

  return (
    <React.Suspense fallback={<Spinner />}>
      <div className="lg:flex  justify-between items-center block  w-screen min-h-screen">
        <div className=" hidden  lg:w-2/4 lg:bg-[#fff] lg:h-screen lg:flex lg:justify-center lgitems-center lg:flex-col ">
          <img
            src={BackGroundTwo}
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>
        <div className="w-full lg:w-2/4  flex  items-center  bg-[#fff]  px-[1rem] lg:px-[4rem] h-screen shadow-[0_15px_90px_0px_rgba(0,0,0,0.3)]">
          <div className="w-full my-0 mx-auto max-w-[500px]">
            <h1 className=" leading-9 text-center lg:text-left font-bold text-[1.5rem] lg:text-[2rem] text-[#213F7D]">
              Make your payment.
            </h1>
            <p className=" lg:mt-[1rem] text-center lg:text-left  text-[#545F7D] text-base lg:text-lg my-2 font-normal">
              Fast, easy and reliable.
            </p>
            <form
              className="mt-[1rem] lg:mt-[1.5rem]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className={`w-full border-2 text-sm bg-[#fff] lg:text-base text-[#545F7D] border-[rgba(84, 95, 125, 0.15)] p-3 rounded-md outline-none placeholder:text-[#545F7D] placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="name"
                placeholder="Name"
                type="text"
                id="name"
                {...register("name", { required: "This is required." })}
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="name" />

              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="my-1 text-[#E4033B] text-xs lg:text-sm">
                    {message}
                  </p>
                )}
              />
              <input
                className={`w-full border-2 text-sm bg-[#fff] lg:text-base mt-5 lg:mt-7 text-[#545F7D] border-[rgba(84, 95, 125, 0.15)] p-3 rounded-md outline-none placeholder:text-[#545F7D] placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="email"
                placeholder="Email"
                type="email"
                id="email"
                {...register("email", { required: "This is required." })}
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="email" />

              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="my-1 text-[#E4033B] text-xs lg:text-sm">
                    {message}
                  </p>
                )}
              />
              <input
                className={`w-full border-2 text-sm bg-[#fff] lg:text-base mt-5 lg:mt-7 text-[#545F7D] border-[rgba(84, 95, 125, 0.15)] p-3 rounded-md outline-none placeholder:text-[#545F7D] placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="amount"
                placeholder="Amount"
                type="number"
                id="amount"
                {...register("amount", {
                  required: "This is required.",
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                })}
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="amount" />

              <ErrorMessage
                errors={errors}
                name="amount"
                render={({ message }) => (
                  <p className="my-1 text-[#E4033B] text-xs lg:text-sm">
                    {message}
                  </p>
                )}
              />
              {/* <pre className="text-[#000]">
                {JSON.stringify(watch(), null, 2)}
              </pre> */}

              <div className=" w-full">
                {isSubmitting ? (
                  <div>
                    <Spinner toggle={false} />
                  </div>
                ) : (
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#39CDCC] text-[#fff] text-sm lg:text-base  p-3 mt-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-[#39CDCC] hover:border hover:border-[#39CDCC]"
                  >
                    Pay
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Suspense>
  );
};

export default Index;
