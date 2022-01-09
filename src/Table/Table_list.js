// import { useState } from "react";
import Header_table from "./Header_table";
import Tbody from "./Tbody";

const Table_list = ({posts, title, remove}) => {
 
  return (
    <>
      <div>
        <h4>{title}</h4>
        <table className="table table-striped text-center">
          <Header_table />
          <tbody>
            {posts.map((item, index) => (
              
              <Tbody remove={remove} number={index+1} post={item} key={item.id} />
              
            ))}
          </tbody>
        </table>
      </div>


    </>
  );
};
export default Table_list;