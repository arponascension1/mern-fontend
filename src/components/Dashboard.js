import {useSelector} from "react-redux";
import CenterBox from "../Layouts/CenterBox";

function Dashboard() {
    const user = useSelector((state) => state.auth.user);
    return(
        <>
            <CenterBox>
                <p>This is protected dashboard.</p>
                Author Name : {user.name}<br/>
                email: {user.email}
            </CenterBox>

        </>
    )
}

export default Dashboard;