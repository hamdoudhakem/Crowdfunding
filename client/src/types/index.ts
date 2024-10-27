import { ethers } from "ethers";

export interface Form {
  pId?: number;
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
  amountCollected: string;
}
