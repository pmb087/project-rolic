import { useEffect, useState } from 'react';
import StoreService from '../service/StoreService';
import { RequestGetContent } from '../types';

export default function useGetRequest() {
  const [requestData, setRequestData] = useState<RequestGetContent[]>();

  const getRequestData = async () => {
    const { data } = await StoreService.getRequest();
    setRequestData(data);
  };

  useEffect(() => {
    getRequestData();
  }, []);

  return { requestData, setRequestData };
}
