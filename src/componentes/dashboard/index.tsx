import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllWidgets } from "./fetch";

const Dashboard = () => {
    const widgets = useAppSelector(state => state.widgets);
    const dispatch = useAppDispatch();
    useEffect(() => {
            dispatch(getAllWidgets());
    }, [dispatch]);

    return (
        <div>
            <div className="row">
                {
                    widgets.map((row: any) =>
                        <div className="col-sm-3 col-md-2 card m-1" key={row.id}>
                            <div className="card-title p-3">{row.title}</div>
                            <div className="card-description">{row.description}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Dashboard;