import React, { useState, useEffect } from "react";

import { useStateContext } from "../context";
import { Form } from "../types";
import { DisplayCampaigns } from "../components";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Form[]>([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const campaigns = await getUserCampaigns();
      setCampaigns(campaigns);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [address, contract]);
  return (
    <DisplayCampaigns
      title="All Campaign"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};
