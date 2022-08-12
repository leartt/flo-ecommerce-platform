import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const location = useLocation();

  const result = new URLSearchParams(location.search);

  return result;
};

export default useQuery;
