import React from "react";

function Loggedin(props: any) {
  return (
    <>
      <div>
        <h1>Logged In</h1>
        <p>Welcome to the logged-in page!</p>
      </div>
      <h2>Content</h2>
      {props.children}
    </>
  );
}

export default Loggedin;
