import { MouseEventHandler } from "react";
import "./index.css";

interface ListProps {
   actionClick: MouseEventHandler<HTMLDivElement> | undefined;
   text: string | undefined;
   isActive?: boolean;
}

export const HeaderMenuBtn: React.FC<ListProps> = ({
   actionClick,
   text,
   isActive = false,
}) => {
   return (
      <div
         className={`menuButton ${isActive ? "menuButton--active" : ""} `}
         onClick={actionClick}
      >
         {isActive && (
            <img src="/icons/Catalog.svg" alt="" width={22} height={22} />
         )}
         {!isActive && (
            <img src="/icons/start_buisnes.svg" alt="" width={22} height={22} />
         )}

         <span>{text}</span>
      </div>
   );
};
