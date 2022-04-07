import React from "react";
import NotiCard from "../components/NotiCard";
import { Grid, Text } from "../elements";

import { rtdb } from "../shared/firebase";
import { useSelector } from "react-redux";
import { ref, get, update } from "firebase/database";

const Notification = () => {
  const user = useSelector(state => state.user.user);
  const [noti, setNoti] = React.useState([]);

  React.useEffect(() => {
    if (!user) return;

    const notiDB = ref(rtdb, `noti/${user.user_id}/list`);

    get(notiDB).then(snapshot => {
      if (snapshot.exists()) {
        let _data = snapshot.val();
        let _noti_list = Object.keys(_data)
          .reverse()
          .map(s => _data[s]);
        setNoti(_noti_list);
      }
    });
    
    return () => {
      const notiDB = ref(rtdb, `noti/${user.user_id}`);
      update(notiDB, {list: []});
    };
  }, [user]);

  return (
    <Grid>
      { noti.length > 0 ? noti.map((v, i) => (
        <NotiCard key={`noti_${i}`} {...v}></NotiCard>
      )) : <Text>알림이 없습니다!</Text>}
    </Grid>
  );
};

export default Notification;
