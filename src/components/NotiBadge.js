import React from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { rtdb } from "../shared/firebase";
import { ref, onValue, update } from "firebase/database";
import { useSelector } from "react-redux";
import { Grid } from "../elements";

const NotiBadge = props => {
  const [isRead, setIsRead] = React.useState(true);
  const user_id = useSelector(state => state.user.user.user_id);
  const notiDB = ref(rtdb, `noti/${user_id}`);

  const notiCheck = () => {
    update(notiDB, { read: true });
    props._onClick();
  };

  React.useEffect(() => {
    onValue(notiDB, v => {
      if (v.val() === null) {
        update(notiDB, { read: true });
      } else {
        setIsRead(Boolean(v.val().read));
      }
    });
  }, []);

  return (
    <Grid width="30px">
      <Badge
        className="hover"
        style={{ color: "white" }}
        color="error"
        variant="dot"
        invisible={isRead}
        onClick={notiCheck}
      >
        <NotificationsIcon></NotificationsIcon>
      </Badge>
    </Grid>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
