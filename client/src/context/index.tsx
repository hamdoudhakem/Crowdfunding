import React, { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  SmartContract,
} from "@thirdweb-dev/react";
import { BaseContract, ethers } from "ethers";
import { Form } from "../types";

const StateContext = createContext<{
  address: string | undefined;
  contract: SmartContract<BaseContract> | undefined;
  createCampaign: (form: Form) => Promise<void>;
} | null>(null);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const { contract } = useContract(
    "0x58cEc1340d9b9c1E3E88e0a8f37C7a3340c9d686"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: Form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.error("contract call successful", data);
    } catch (error) {
      console.error("contract call successful", error);
    }
  };

  return (
    <StateContext.Provider
      value={{ address, contract, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () =>
  useContext(StateContext) !== null
    ? useContext(StateContext)!
    : {
        address: undefined,
        contract: undefined,
        createCampaign: async () => {},
      };
