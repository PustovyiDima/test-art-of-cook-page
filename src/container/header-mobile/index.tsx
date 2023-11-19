import "./index.css";
import { useClickAway } from "react-use";
import { useReducer, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

type State = {
   currentPage: string | undefined;
};

type Action = {
   type: ACTION_TYPE;
   payload: string | undefined;
};

enum ACTION_TYPE {
   CHANGE_PAGE = "CHANGE_PAGE",
}

const setMenuComponentReducer: React.Reducer<State, Action> = (
   state: State,
   action: Action
): State => {
   switch (action.type) {
      case ACTION_TYPE.CHANGE_PAGE:
         return { ...state, currentPage: action.payload };
      default:
         return state;
   }
};

export const HeaderMobile = () => {
   const [isOpen, setOpen] = useState(false);
   const ref = useRef(null);

   useClickAway(ref, () => {
      setOpen(false);
      dispachMenuState({ type: ACTION_TYPE.CHANGE_PAGE, payload: "main" });
   });

   const [menuState, dispachMenuState] = useReducer(setMenuComponentReducer, {
      currentPage: "main",
   });

   return (
      <div className="header--mobile">
         <div>
            <Hamburger
               toggled={isOpen}
               size={20}
               toggle={setOpen}
               color="#fff"
            />

            {isOpen && (
               <div className="header--mobile__container">
                  {menuState.currentPage === "main" && (
                     <div ref={ref} className="header--mobile__menu__container">
                        {/* title */}
                        {/* subtitle */}
                        {/* menu */}
                     </div>
                  )}

                  <div className="close--btn__component">
                     <img
                        src="/Vector1.svg"
                        width={17.5}
                        height={47.21}
                        alt=" "
                     />
                     <div
                        className="close__btn"
                        onClick={() => {
                           setOpen(false);
                        }}
                     >
                        <img src="/closed.svg" width={32} height={32} alt=" " />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};
