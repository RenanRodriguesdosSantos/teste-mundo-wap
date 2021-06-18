import api from "../../service/api"
import { set_widgets } from "./reducer";

export const getAllWidgets = (codUser: any) => {
    return ((dispatch: any) => {
        api.get("/widgets")
        .then(res => {
            api.get("/users/" + codUser + "/widgets")
            .then((response) => {
                const widgets = res.data.data;
                const widgets_user = response.data.data;
                const widgets_final = widgets.filter((item : any)=> {
                    for (let i = 0; i < widgets_user.length; i++) {
                        if(widgets_user[i].widget_id == item.id){ return true}
                    }
                });
                dispatch(set_widgets(widgets_final));
            });
        });
    });
}