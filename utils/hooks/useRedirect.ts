import { useRouter } from "next/router";
import { useEffect } from "react";
import { Url } from "url";
import LocalStorageService from "../service/LocalStorageService";

export default function useRedirect(url: Url, getUser?: (user: string) => Promise<void>) {

  const {push} = useRouter();

  const goToMapByLoginStatus = () => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser === null) return;
    push(url);
  };

  const ifLoggedInGetInfoElsePush = (callBack: (user: string) => Promise<void>) => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser !== null) {      
      callBack(currentUser);
    } else {
      push(url);
    }
  };

  useEffect(() => {
    if (getUser !== undefined) ifLoggedInGetInfoElsePush(getUser);
    else goToMapByLoginStatus();
  }, []);
};


