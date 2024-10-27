import React, { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useContractWrite,
  SmartContract,
  useConnect,
  useDisconnect,
} from "@thirdweb-dev/react";
import { BaseContract, ethers } from "ethers";
import { Form } from "../types";

type ConnectType = ReturnType<typeof useConnect>;

const StateContext = createContext<{
  address: string | undefined;
  contract: SmartContract<BaseContract> | undefined;
  connect: ConnectType;
  disconnect: () => Promise<void>;
  createCampaign: (form: Form) => Promise<void>;
  getCampaigns: () => Promise<Form[]>;
  getUserCampaigns: () => Promise<Form[]>;
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
  const connect = useConnect();
  const disconnect = useDisconnect();

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

  const getCampaigns = async () => {
    const campaigns = await contract?.call("getCampaigns");

    if (campaigns) {
      const parsedCampaigns: Form[] = campaigns.map(
        (campaign: any, i: number) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: i,
        })
      );

      console.log("parsedCampaigns", parsedCampaigns);

      return parsedCampaigns;
    }

    return [];
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {};

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext)!;
