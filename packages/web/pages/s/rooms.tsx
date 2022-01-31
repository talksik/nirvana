import getDynamicMeLayout from "../../components/Layouts/DynamicMeLayout";
import React from "react";

export default function Rooms() {
  return <div>All caught up.</div>;
}

Rooms.getLayout = function getLayout(page: React.ReactElement) {
  return getDynamicMeLayout(page);
};
