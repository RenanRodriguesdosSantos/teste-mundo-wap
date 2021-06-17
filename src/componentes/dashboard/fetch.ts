import api from "../../service/api"
import { set_widgets } from "./reducer";

export const getAllWidgets = () => {
    return ((dispatch: any) => {
        api.get("/widgets")
        .then((response) => {
            dispatch(set_widgets(response.data.data));
        })
        .catch(console.log);
    });
}