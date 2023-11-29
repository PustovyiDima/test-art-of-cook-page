import "./index.css";
import { useClickAway } from "react-use";
import { useReducer, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { Product } from "../../data";
import { routes } from "../../routes";
import { NavListItem } from "../../components/list-item";
import { HeaderMenuBtn } from "../../components/header-menu-btn";

enum MOBILE_HEADER_ACTION_TYPE {
   CHANGE_PAGE = "CHANGE_PAGE",
   RETURN = "RETURN",
   REMOVE = "REMOVE",
}

enum MOBILE_HEADER_PAGE_TYPE {
   MAIN = "main",
   TITLE = "title",
   SUBTITLE = "subtitle",
   DATA = "data",
}

type State = {
   currentPage: string | undefined;
   prevPage: string | undefined;
   datalist: any[];
   pageTitle?: string;
};

type Action = {
   type: MOBILE_HEADER_ACTION_TYPE;
   payload?: MOBILE_HEADER_PAGE_TYPE;
   datalist?: any[];
   pageTitle?: string;
};

const setMenuComponentReducer: React.Reducer<State, Action> = (
   state: State,
   action: Action
): State => {
   let page;
   let dataList: any[] = [];
   if (action.datalist) {
      dataList = action.datalist;
   }

   switch (action.type) {
      case MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE:
         if (action.payload === MOBILE_HEADER_PAGE_TYPE.TITLE) {
            page = MOBILE_HEADER_PAGE_TYPE.MAIN;
         } else if (
            action.payload === MOBILE_HEADER_PAGE_TYPE.SUBTITLE &&
            state.currentPage === MOBILE_HEADER_PAGE_TYPE.TITLE
         ) {
            page = MOBILE_HEADER_PAGE_TYPE.TITLE;
         } else if (
            action.payload === MOBILE_HEADER_PAGE_TYPE.DATA &&
            state.currentPage === MOBILE_HEADER_PAGE_TYPE.SUBTITLE
         ) {
            page = state.pageTitle;
         }

         let title = state.pageTitle;

         if (action.pageTitle) {
            title = action.pageTitle;
         }

         return {
            ...state,
            currentPage: action.payload,
            prevPage: page,
            pageTitle: title,
            datalist: dataList,
         };
      case MOBILE_HEADER_ACTION_TYPE.REMOVE:
         return {
            ...state,
            currentPage: MOBILE_HEADER_PAGE_TYPE.MAIN,
            prevPage: MOBILE_HEADER_PAGE_TYPE.MAIN,
            pageTitle: "",
            datalist: [],
         };
      default:
         return state;
   }
};

export const HeaderDesctop = () => {
   const [isOpen, setOpen] = useState(false);
   const ref = useRef(null);

   useClickAway(ref, () => {
      setOpen(false);
      dispachMenuState({ type: MOBILE_HEADER_ACTION_TYPE.REMOVE });
   });

   const [menuState, dispachMenuState] = useReducer(setMenuComponentReducer, {
      currentPage: MOBILE_HEADER_PAGE_TYPE.MAIN,
      prevPage: MOBILE_HEADER_PAGE_TYPE.MAIN,
      pageTitle: "",
      datalist: [],
   });

   return (
      <div className="header--desctop">
         <div className="header--line">
            <div className="flex center g-1">
               <span className="text-content text-content--small text-content--white">
                  Відділ продажу:
               </span>
               <span className="text-content text-content--small text-content--white text-content--600">
                  +38 (067) 354 22 20
               </span>
            </div>
            <div className="flex center g-5 text-content text-content--small text-content--white">
               <div className="flex center g-1">
                  <span>Ваше місто</span>
                  <span className="text-content--600">Київ</span>
               </div>
               <div>
                  <div className="text-content--600">UA</div>
               </div>
               <div className="flex center g-1 text-content--600">
                  <img
                     src="/icons/user.svg"
                     alt=" "
                     className="user--icon"
                     width={16}
                     height={16}
                  />
                  <span> Особистий кабінет</span>
               </div>
            </div>
         </div>
         <div className="header--nav ">
            <div className="logo--container">
               <img src="/icons/logo.svg" alt="" height={58} />
            </div>
            <div className="nav-container">
               <div className="flex center g-3">
                  <HeaderMenuBtn
                     actionClick={() => console.log("КАТАЛОГ")}
                     text="КАТАЛОГ"
                     isActive
                  />
                  <HeaderMenuBtn
                     actionClick={() => console.log("Почати бізнес")}
                     text="Почати бізнес"
                  />
               </div>
               <div className="nav-list"></div>
            </div>
         </div>
      </div>
   );
};
