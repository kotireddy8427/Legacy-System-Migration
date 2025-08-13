import React from "react";
import { useNavigate, Link as RRDLink } from "react-router-dom";
import { useFlags } from "../flags/FeatureFlagsProvider";
import { FLAGS } from "../flags/flags";

// Legacy code used history.push("/path").
// Provide a tiny adapter to keep legacy calls working while on v6:
export function useHistoryCompat() {
  const { isOn } = useFlags();
  const navigate = useNavigate();

  return {
    push: (to, options) => {
      // In v6 we navigate with navigate(to, { replace })
      if (isOn(FLAGS.ROUTER_V6)) {
        navigate(to, { replace: options?.replace || false, state: options?.state });
      } else {
        // If you still run v5 in parallel build, you could bridge here.
        // In this demo we simply fallback to navigate for both.
        navigate(to, { replace: options?.replace || false, state: options?.state });
      }
    },
  };
}

// Keep a Link alias so legacy imports from 'routerCompat' still work.
export const Link = RRDLink;
