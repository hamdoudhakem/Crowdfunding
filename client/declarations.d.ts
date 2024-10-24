// declaration.d.ts
declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*/assets" {
  const tagType: any;
  const createCampaign: any;
  const dashboard: any;
  const logo: any;
  const logout: any;
  const payment: any;
  const profile: any;
  const sun: any;
  const withdraw: any;
  const search: any;
  const menu: any;
  const money: any;
  const loader: any;
  const thirdweb: any;

  export {
    tagType,
    createCampaign,
    dashboard,
    logo,
    logout,
    payment,
    profile,
    sun,
    withdraw,
    search,
    menu,
    money,
    loader,
    thirdweb,
  };
}
