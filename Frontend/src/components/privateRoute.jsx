import { Navigate } from "react-router-dom";
import useUserStore from "../user/useUserStore.js";

const PrivateRoute = (props ) => {
  let islogin = useUserStore((state) => state.islogin);
  if (props.reverse) islogin = !islogin
  if (!islogin) {
    return <Navigate to="/Error" replace />;
  }
  return props.children;
};

export default PrivateRoute;