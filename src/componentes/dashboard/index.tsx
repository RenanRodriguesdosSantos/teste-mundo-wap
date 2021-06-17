import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import api from "../../service/api";
import { getAllWidgets } from "./fetch";
import { set_widgets } from "./reducer";

const Dashboard = () => {
    const widgets = useAppSelector(state => state.widgets);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllWidgets());
    },[dispatch]);

    return(
        <div>
            <div className="row">
                {
                    widgets.map((row: any) => 
                        <div className="col-md-3" key={row.id}>
                            <h3>{row.title}</h3>
                            <p>{row.description}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Dashboard;