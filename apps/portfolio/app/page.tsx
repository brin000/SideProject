import { resolve } from "path";
import React from "react";

const Page = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 2000);
  });

  return <div>Page</div>;
};

export default Page;
