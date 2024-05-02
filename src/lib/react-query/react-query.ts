import { cache } from "react";

import { QueryClient } from "@tanstack/query-core";

const queryClient = new QueryClient();

const getQueryClient = cache(() => queryClient);

export { getQueryClient };
