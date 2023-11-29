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
                  <div className="header--mobile__menu__container" ref={ref}>
                     {menuState.currentPage ===
                        MOBILE_HEADER_PAGE_TYPE.MAIN && (
                        <div className="header--mobile__menu">
                           <div className="logo--container pt-20">
                              <img src="/icons/logo.svg" alt="" height={58} />
                           </div>
                           <div className="langs">
                              <span className="h5-bold text--active">UA</span>
                              <span className="h5-bold">RU</span>
                              <span className="h5-bold">EN</span>
                           </div>

                           <div className="grid-10">
                              <HeaderMenuBtn
                                 actionClick={() =>
                                    dispachMenuState({
                                       type: MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE,
                                       payload: MOBILE_HEADER_PAGE_TYPE.TITLE,
                                       datalist: Product.getList(),
                                       pageTitle: "Меню каталога",
                                    })
                                 }
                                 text="КАТАЛОГ"
                                 isActive
                              />
                              <HeaderMenuBtn
                                 actionClick={() =>
                                    console.log("Почати бізнес")
                                 }
                                 text="КАТАЛОГ"
                              />
                           </div>
                           <div>
                              {true &&
                                 routes.map((item) => (
                                    <NavListItem
                                       actionClick={() =>
                                          console.log("navigate to", item.href)
                                       }
                                       text={item.title}
                                       hasArrow
                                    />
                                 ))}
                           </div>
                           <div className="grid-10">
                              <div className="text-content">Адреса</div>
                              <div className="text-content text-content--400">
                                 04073, м. Київ, вул. Сирецька 28/2
                              </div>
                           </div>
                           <div className="grid-10">
                              <div className="text-content">Працюємо</div>
                              <div className="h5-bold">
                                 Пн-Нд з 9:00 до 21:00
                              </div>
                           </div>
                           <div className="grid-10">
                              <div className="text-content">Продаж</div>
                              <div className="h5-bold">+38(067) 354 22 20</div>
                              <div className="text-content text-content--400">
                                 20sales@artofcooking.com.ua
                              </div>
                           </div>
                           <div className="grid-10">
                              <div className="text-content"> Закупівля</div>
                              <div className="h5-bold">+38 (067) 325 27 43</div>
                              <div className="text-content text-content--400">
                                 purchasing@artofcooking.com.ua
                              </div>
                           </div>
                        </div>
                     )}
                     {menuState.currentPage ===
                        MOBILE_HEADER_PAGE_TYPE.TITLE && (
                        <div className="header--mobile__menu">
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
                                 <NavListItem
                                    actionClick={() => {
                                       dispachMenuState({
                                          type: MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE,
                                          payload:
                                             MOBILE_HEADER_PAGE_TYPE.SUBTITLE,
                                          datalist: item.sublist,
                                          pageTitle: item.name,
                                       });
                                    }}
                                    text={item.name}
                                    hasArrow
                                 />
                              ))}
                        </div>
                     )}
                     {menuState.currentPage ===
                        MOBILE_HEADER_PAGE_TYPE.SUBTITLE && (
                        <div className="header--mobile__menu">
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
                                 <NavListItem
                                    actionClick={() =>
                                       dispachMenuState({
                                          type: MOBILE_HEADER_ACTION_TYPE.CHANGE_PAGE,
                                          payload: MOBILE_HEADER_PAGE_TYPE.DATA,
                                          datalist: item,
                                          pageTitle: item,
                                       })
                                    }
                                    text={item}
                                    hasArrow
                                 />
                              ))}
                        </div>
                     )}
                     {menuState.currentPage ===
                        MOBILE_HEADER_PAGE_TYPE.DATA && (
                        <div className="header--mobile__menu">
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
