import { ethers } from "ethers";

export interface Form {
  pId?: number;
  name?: string;
  owner: string;
  title: string;
  description: string;
  target: string | ethers.BigNumber;
  deadline: string;
  image: string;
  amountCollected: string;
}
