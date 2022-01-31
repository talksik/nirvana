import getDynamicMeLayout from "../../components/Layouts/DynamicMeLayout";
import React from "react";

export default function Drawer() {
  return <div>All caught up.</div>;
}

Drawer.getLayout = function getLayout(page: React.ReactElement) {
  return getDynamicMeLayout(page);
};
