import React from "react";
import { useNavigate } from "react-router-dom";

import { loader } from "../assets";

import { Form } from "../types";
import FundCard from "./FundCard";

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
}: {
  title: string;
  isLoading: boolean;
  campaigns: Form[];
}) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign: Form) => {
    navigate(`/campaign-detail/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt={"loader"}
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p
            className="font-epilogue font-semibold text-[14px] 
          leading-[30px] text-[#818183]"
          >
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleCLick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
