import getDynamicMeLayout from "../../components/Layouts/DynamicMeLayout";
import React from "react";

export default function Later() {
  return <div>All caught up.</div>;
}

Later.getLayout = function getLayout(page: React.ReactElement) {
  return getDynamicMeLayout(page);
};
