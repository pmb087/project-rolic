import { useEffect, useState } from 'react';
import UserService from '../service/UserService';
import { UserResponse } from '../types';

export default function useLikeStore(
  userInfo: UserResponse,
  id: number,
  selectedId: number
) {
  const [userData, setUserData] = useState<UserResponse>(userInfo);
  const [storeLike, setStoreLike] = useState<boolean>(false);

  const handleLike = async () => {
    if (storeLike) {
      const { data } = await UserService.unLikeStore(
        userData.id,
        id,
        userData.like_store
      );
      setUserData(data);
      setStoreLike(data.like_store.includes(id));
    } else {
      const { data } = await UserService.likeStore(
        userData.id,
        id,
        userData.like_store
      );
      setUserData(data);
      setStoreLike(data.like_store.includes(id));
    }
  };

  useEffect(() => {
    setStoreLike(userData.like_store.includes(id));
  }, [selectedId]);

  return { handleLike, storeLike };
}
