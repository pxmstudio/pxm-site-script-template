export interface PxmType {
  site: string;
}

export const Pxm: PxmType = {
  site: "",
};

declare global {
  interface Window {
    Pxm: PxmType;
    Webflow: any;
  }
}
