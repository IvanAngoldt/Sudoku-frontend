import { createContext, useContext, useState } from "react";

const AvatarContext = createContext({
  avatarVersion: 0,
  bumpAvatarVersion: () => {},
});

export const AvatarProvider = ({ children }) => {
  const [avatarVersion, setAvatarVersion] = useState(0);

  const bumpAvatarVersion = () => {
    setAvatarVersion((v) => v + 1);
  };

  return (
    <AvatarContext.Provider value={{ avatarVersion, bumpAvatarVersion }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatarVersion = () => useContext(AvatarContext);
