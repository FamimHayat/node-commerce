import React from "react";
import Banner from "./(components)/home/Banner";
import CheckProduct from "./(components)/home/CheckProduct";
import Category from "./(components)/home/Category";
import Parallax from "./(components)/home/Parallax";

const page = () => {
  return (
    <>
      <Banner />
      <CheckProduct />
      <Parallax />

      {/* <Category /> */}
    </>
  );
};

export default page;
