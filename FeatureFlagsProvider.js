import React, { createContext, useContext, useMemo, useState } from "react";
import { FLAGS } from "./flags";

// Load from env first, allow localStorage overrides for safe runtime toggles
function getInitialFlag(name, fallback = "false") {
  const ls = window.localStorage.getItem(name);
  if (ls !== null) return ls === "true";
  const env = process.env[name];
  return (env ?? fallback) === "true";
}

const FeatureFlagsContext = createContext({
  flags: {},
  setFlag: () => {},
  isOn: () => false,
});

export function FeatureFlagsProvider({ children }) {
  const [flags, setFlags] = useState({
    [FLAGS.NEW_USERLIST]: getInitialFlag(FLAGS.NEW_USERLIST, "false"),
    [FLAGS.ROUTER_V6]: getInitialFlag(FLAGS.ROUTER_V6, "true"),
  });

  const setFlag = (name, value) => {
    setFlags((f) => ({ ...f, [name]: !!value }));
    window.localStorage.setItem(name, value ? "true" : "false");
  };

  const value = useMemo(
    () => ({
      flags,
      setFlag,
      isOn: (name) => !!flags[name],
    }),
    [flags]
  );

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export const useFlags = () => useContext(FeatureFlagsContext);
