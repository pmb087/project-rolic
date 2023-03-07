import { useRouter } from "next/router";
import { Url } from "url";
import LocalStorageService from "../service/LocalStorageService";

export default function useRedirect() {

  const {push} = useRouter();

  const goToMapByLoginStatus = (url: Url) => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser === null) return;
    push(url);
  };

  const ifLoggedInGetInfoElsePush = (notLoggedInUrl: Url, getUser: (user: string) => Promise<void>) => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser !== null) {      
      getUser(currentUser);
    } else {
      push(notLoggedInUrl);
    }
  };

  const switchUrlByResult = () => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser !== null) {
      push('/LoggedInMap');
    } else {
      push('/Map');
    }
  };
  return {goToMapByLoginStatus, ifLoggedInGetInfoElsePush, switchUrlByResult};
  };


