import React, { useReducer, useEffect, useCallback } from "react";
import { Stunner } from "./components/Stunner";
import { Textbox } from "./components/Textbox";

const initialState = {
  account: "",
  shonen_contract_address: "0xf4121a2880c225f90dc3b3466226908c9cb2b085",
  error: "",
  nfts: [],
  stunnin: false,
  clicked: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_NFTS":
      return { ...state, nfts: action.payload };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { account, contract_addr, error, nfts, stunnin, clicked } = state;
  useEffect(() => {});

  console.log(state);

  return (
    <div className="overflow-hidden bg-yellow-400 w-screen h-screen relative">
      <h1 className="sm:text-[4rem] w-screen text-center underline decoration-white underline-offset-4 text-blue-500 z-[10] mt-10">
        Stunna Shades
      </h1>
      <Textbox dispatch={dispatch} state={state} />
      <div className="overflow-scroll mt-[2rem] grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-5 place-items-center items-start w-screen h-full pb-[25rem]">
        {nfts.length > 0 &&
          nfts.map((nft) => (
            <div key={nft.media[0].thumbnail}>
              <Stunner imgSrc={nft.media[0].thumbnail} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
