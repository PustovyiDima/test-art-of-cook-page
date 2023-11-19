import React from "react";
import "./App.css";
import { HeaderMobile } from "./container/header-mobile";

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <HeaderMobile />
            {/* <HeaderDesctop/> */}
         </header>
         <main>{/* <MainPageComponentInfo/> */}</main>
         <footer>{/* <Footer/> */}</footer>
         {/* <NavMobile/> */}
      </div>
   );
}

export default App;
