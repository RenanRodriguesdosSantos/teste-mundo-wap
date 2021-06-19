import api from "../../service/api"
import { setUser } from "./reducer";

export const getUser = () => {
    return ((dispatch: any) => {
        api.get("/users/me")
        .then(response => {
            dispatch(setUser(response.data.data[0]));
        });
    });
}