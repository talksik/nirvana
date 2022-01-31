import getDynamicMeLayout from "../../components/Layouts/DynamicMeLayout";
import React from "react";

export default function Done() {
  return <div>All caught up.</div>;
}

Done.getLayout = function getLayout(page: React.ReactElement) {
  return getDynamicMeLayout(page);
};
