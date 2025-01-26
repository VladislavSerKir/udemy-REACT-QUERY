// import { toast } from "@/components/app/toast";
import { createStandaloneToast } from "@chakra-ui/react";
import { QueryClient } from "react-query";

import { theme } from "../theme";

const toast = createStandaloneToast({ theme });

export function queryErrorHandler(error: unknown): void {
  const id = "react-query-error";
  const title =
    error instanceof Error
      ? error.toString().replace(/^Error:\s*/, "")
      : "error connecting to the server";

  // prevent duplicate toasts
  toast.toast.closeAll();
  toast.toast({
    id,
    title,
    status: "error",
    variant: "subtle",
    isClosable: true,
  });
}

// function errorHandler(errorMsg: string) {
//   // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
//   // one message per page load, not one message per query
//   // the user doesn't care that there were three failed queries on the staff page
//   //    (staff, treatments, user)
//   const id = "react-query-toast";

//   if (!toast.isActive(id)) {
//     const action = "fetch";
//     const title = `could not ${action} data: ${
//       errorMsg ?? "error connecting to server"
//     }`;
//     toast({ id, title, status: "error", variant: "subtle", isClosable: true });
//   }
// }

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 600000, // 10 min
      cacheTime: 900000, // 15 min
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
