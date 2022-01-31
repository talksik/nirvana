import getDynamicMeLayout from "../../components/Layouts/DynamicMeLayout";
import React from "react";

export default function Priority() {
  return <div>All caught up.</div>;
}

Priority.getLayout = function getLayout(page: React.ReactElement) {
  return getDynamicMeLayout(page);
};
