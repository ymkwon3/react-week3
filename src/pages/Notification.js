import React from "react";
import NotiCard from "../components/NotiCard";
import { Grid } from "../elements";

const Notification = () => {
  
  return (
    <Grid>
      <NotiCard>익명</NotiCard>
      <NotiCard>응애</NotiCard>
      <NotiCard>모코</NotiCard>
    </Grid>
  );
};

export default Notification;
