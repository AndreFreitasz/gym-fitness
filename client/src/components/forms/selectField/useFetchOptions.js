import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const useFetchOptions = (url, formatOption, params = {}) => {
  const [options, setOptions] = useState([]);

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(url, { params: memoizedParams });
        const formattedOptions = response.data.message.map(formatOption);
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };
    fetchOptions();
  }, [url, formatOption, memoizedParams]);

  return options;
};

export default useFetchOptions;