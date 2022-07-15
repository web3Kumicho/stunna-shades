import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { initializeAlchemy, getNftsForOwner } from "@alch/alchemy-sdk";

export const Textbox = ({ dispatch, state }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const stunninEm = async (acct) => {
    dispatch({ type: "SET_ACCOUNT", payload: acct });
  };

  useEffect(() => {
    if (state.account) {
      const test = async () => {
        const alchemy = initializeAlchemy();
        const junk = await (
          await getNftsForOwner(alchemy, state.account)
        ).ownedNfts;
        console.log(junk);
        try {
          const shonenJunk = junk.filter(
            (r) => r.contract.address === state.shonen_contract_address
          );
          dispatch({ type: "SET_NFTS", payload: shonenJunk });
        } catch (err) {
          console.error(err);
        }
      };
      test();
    }
  }, [state.account]);

  const onSubmit = (values) => stunninEm(values.account);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen flex justify-center items-center focus:outline-purple-700 relative"
    >
      <label
        className="flex flex-col w-full items-center justify-center
      bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-[20px] md:text-[1.5rem] lg:text-[3rem]"
      >
        Enter an account:
        <input
          className="bg-yellow-400 bg-clip-text text-[11px] md:text-[1.5rem] lg:text-[2rem] text-transparent bg-gradient-to-r from-pink-500 to-violet-500 border-0 border-b-[10px] border-purple-800/50 flex w-[80%] text-center focus:outline-none focus:bg-yellow-400 active:bg-yellow-400 hover:bg-yellow-400 autofill:bg-clip-text autofill:text-transparent autofill:bg-gradient-to-r autofill:from-pink-500 autofill:to-violet-500"
          type="text"
          autoComplete="off"
          {...register("account")}
        />
      </label>
    </form>
  );
};
