import { type PropsWithChildren } from "react";

import { Providers } from "@Application/contents/@providers";

export const GenericLayout = ({ children }: PropsWithChildren) => {
  return <Providers>{children}</Providers>;
};
