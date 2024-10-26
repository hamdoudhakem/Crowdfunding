import { ethers } from "ethers";

export interface Form {
  name: string;
  title: string;
  description: string;
  target: string | ethers.BigNumber;
  deadline: string;
  image: string;
}
