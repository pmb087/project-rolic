import { useEffect, useState } from "react";
import LocalStorageService from "../service/LocalStorageService";
import UserService from "../service/UserService";
import { UserResponse } from "../types";

export default function useGetUser(imediate: boolean) {  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentUserInfo, setCurrentUserInfo] = useState<UserResponse>();

  const getUserInfo = async (user: string) => {
    const userInfo = await UserService.getUser(user);
    const adminInfo = await UserService.getAdmin();

    setCurrentUserInfo(userInfo.data);
    setIsAdmin(adminInfo.data.includes(userInfo.data.id));
  };

  useEffect(() => {
    if (imediate) {      
      const currentUser = LocalStorageService.get<string>('user');
      if (currentUser !== null) getUserInfo(currentUser);
    }
  }, []);

  return {isAdmin, currentUserInfo, getUserInfo};
}