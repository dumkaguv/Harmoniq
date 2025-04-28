import { useEffect, useState } from "react";

export const useIsUserInteracted = () => {
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    const onDocumentClick = () => setIsUserInteracted(true);

    document.addEventListener("click", onDocumentClick);

    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return isUserInteracted;
};
