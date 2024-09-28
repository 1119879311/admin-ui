import React, { PropsWithChildren, useContext } from "react";

const Provider = <T,>(
  Compent: React.ComponentProps<any>,
  modelValue: T
): ((props: PropsWithChildren<any>) => JSX.Element) => {
  return (props: PropsWithChildren<any>) => {
    return <Compent value={modelValue} {...props}  />;
  };
};
const createStore = <T extends Record<string, any>>(models: T) => {
  const StoreContext = React.createContext(models);
  const useModel = (modelName: keyof T) => {
    const stores = useContext(StoreContext);
    return stores[modelName];
  };

  return {
    useModel,
    Provider: Provider<T>(StoreContext.Provider, models),
  };
};

// const defaultModel = {

// }

export default createStore;

// const store = createStore({
//     defaultModel
// })

// export default store

// store.useModel;
// store.Provider
