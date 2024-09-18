import {useNavigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/auth';

export default function PublicRoute(props) {
  const {isSignedIn} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSignedIn()) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);
  return props.children;
}
