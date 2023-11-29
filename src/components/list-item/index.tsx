import { MouseEventHandler } from "react";
import "./index.css";

interface ListProps {
   actionClick: MouseEventHandler<HTMLDivElement> | undefined;
   text: string | undefined;
   hasArrow?: boolean;
}

export const NavListItem: React.FC<ListProps> = ({
   actionClick,
   text,
   hasArrow = false,
}) => {
   return (
      <div className="nav-list--item" onClick={actionClick}>
         <span> {text}</span>
         {hasArrow && <div className="arrow"></div>}
      </div>
   );
};
