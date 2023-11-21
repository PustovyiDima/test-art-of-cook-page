import "./index.css";
import { useClickAway } from "react-use";
import { useReducer, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { Product } from "../../data";

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

export const HeaderMobile = () => {
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
                  <div className="header--mobile__menu__container">
                     {menuState.currentPage ===
                        MOBILE_HEADER_PAGE_TYPE.MAIN && (
                        <div ref={ref} className="header--mobile__menu">
                           {/* menu */}
                           <button
                              onClick={() => {
                                 dispachMenuState({
                                    type: MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE,
                                    payload: MOBILE_HEADER_PAGE_TYPE.TITLE,
                                    datalist: Product.getList(),
                                    pageTitle: "Меню каталога",
                                 });
                              }}
                           ></button>
                        </div>
                     )}
                     {menuState.currentPage ===
                        MOBILE_HEADER_PAGE_TYPE.TITLE && (
                        <div ref={ref} className="header--mobile__menu">
                           <div className="menu-page__title--component flex">
                              <div
                                 className="backbtn flex"
                                 onClick={() => {
                                    dispachMenuState({
                                       type: MOBILE_HEADER_ACTION_TYPE.REMOVE,
                                    });
                                 }}
                              >
                                 <div className="arrow--reverse "></div>
                                 <span>Назад</span>
                              </div>
                              <span className="menu-page__title">
                                 {menuState.pageTitle}
                              </span>
                           </div>
                           {menuState.datalist.length > 0 &&
                              menuState.datalist.map((item) => (
                                 <div
                                    className="nav-list--item"
                                    onClick={() => {
                                       dispachMenuState({
                                          type: MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE,
                                          payload:
                                             MOBILE_HEADER_PAGE_TYPE.SUBTITLE,
                                          datalist: item.sublist,
                                          pageTitle: item.name,
                                       });
                                    }}
                                 >
                                    <span> {item.name}</span>
                                    <div className="arrow"></div>
                                 </div>
                              ))}
                        </div>
                     )}
                     {menuState.currentPage ===
                        MOBILE_HEADER_PAGE_TYPE.SUBTITLE && (
                        <div ref={ref} className="header--mobile__menu">
                           <div className="menu-page__title--component flex">
                              <div
                                 className="backbtn flex"
                                 onClick={() => {
                                    dispachMenuState({
                                       type: MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE,
                                       payload: MOBILE_HEADER_PAGE_TYPE.TITLE,
                                       datalist: Product.getList(),
                                       pageTitle: "Меню каталога",
                                    });
                                 }}
                              >
                                 <div className="arrow--reverse "></div>
                                 <span>Назад</span>
                              </div>
                              <span className="menu-page__title">
                                 {menuState.pageTitle}
                              </span>
                           </div>
                           {menuState.datalist.length > 0 &&
                              menuState.datalist.map((item) => (
                                 <div
                                    className="nav-list--item"
                                    onClick={() => {
                                       dispachMenuState({
                                          type: MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE,
                                          payload: MOBILE_HEADER_PAGE_TYPE.DATA,
                                          datalist: item,
                                          pageTitle: item,
                                       });
                                    }}
                                 >
                                    <span> {item}</span>
                                    {/* <img
                                    src="/icons/chevron.svg"
                                    alt=""
                                    width={15}
                                    height={15}
                                    style={{ transform: "rotate(-90deg)" }}
                                 /> */}
                                    <div className="arrow"></div>
                                 </div>
                              ))}
                        </div>
                     )}
                     {menuState.currentPage ===
                        MOBILE_HEADER_PAGE_TYPE.DATA && (
                        <div ref={ref} className="header--mobile__menu">
                           <div className="menu-page__title--component flex">
                              <div
                                 className="backbtn flex"
                                 onClick={() => {
                                    dispachMenuState({
                                       type: MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE,
                                       payload:
                                          MOBILE_HEADER_PAGE_TYPE.SUBTITLE,
                                       datalist: Product.getSubList(
                                          menuState.prevPage
                                       ),
                                       pageTitle: menuState.prevPage,
                                    });
                                 }}
                              >
                                 <div className="arrow--reverse "></div>
                                 <span>Назад</span>
                              </div>
                              <span className="menu-page__title">
                                 {menuState.pageTitle}
                              </span>
                           </div>
                        </div>
                     )}
                     <img
                        className="menu-vector "
                        src="/Vector1.svg"
                        width={17.5}
                        height={47.21}
                        alt=" "
                     />
                  </div>
                  <div className="close--btn__component">
                     <div
                        className="close__btn"
                        onClick={() => {
                           setOpen(false);
                           dispachMenuState({
                              type: MOBILE_HEADER_ACTION_TYPE.REMOVE,
                           });
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
