import { useSelector } from "react-redux"
import { getToken } from "../services/authSlice"
import jwtDecode from "jwt-decode"

const useUserID = () => {
    const token = useSelector(getToken)
    const payload = jwtDecode(token)
    return payload.userId
}

export default useUserID