import { getDefaultProvider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

const useENS = (address) => {
  const [ensName, setENSName] = useState();
  const [ensAvatar, setENSAvatar] = useState();

  useEffect(() => {
    const resolveENS = async () => {
      if (address) {
        const provider = await getDefaultProvider();
        const ensName = await provider.lookupAddress(address);
        const resolver = await provider.getResolver(ensName ?? "");
        const ensAvatar = await resolver?.getAvatar();
        setENSAvatar(ensAvatar?.url);
        setENSName(ensName);
      }
    };
    resolveENS();
  }, [address]);

  return { ensName, ensAvatar };
};

export default useENS;
