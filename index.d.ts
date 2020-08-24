declare var _default: {
    push: (pageName: any, params: any) => void;
    pop: (pageName: any, params: any) => void;
    backTo: (tabName: any, pageName?: string, params?: {}) => void;
    replace: (pageName: any, params: any) => void;
    sendEvent: (callbackId: any, params: any) => void;
    getRouters: () => any;
    setRightDrawPopEnabled: (enable: any) => any;
};
export default _default;
