import React from "react";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { rtdb } from "../shared/firebase";
import { ref, onValue, update } from "firebase/database";
import { useSelector } from "react-redux";

const NotiBadge = (props) => {
  const [isRead, setIsRead] = React.useState(true);
  const user_id = useSelector(state => state.user.user.user_id);
  const notiDB = ref(rtdb, `noti/${user_id}`);

  const notiCheck = () => {
    update(notiDB, {read: true});
    props._onClick();
  }

  React.useEffect(() => {
    
    onValue(notiDB, (v) => {
      if(v.val() === null) {
        update(notiDB, {read: true})
      }else {
        setIsRead(Boolean(v.val().read));
      }
    })
  }, [])

  return (<>
  <Badge color="primary" variant="dot" invisible={isRead} onClick={notiCheck}>
    <NotificationsIcon></NotificationsIcon>
  </Badge>
  </>)
}

NotiBadge.defaultProps = {
  _onClick: () => {}
}

export default NotiBadge;