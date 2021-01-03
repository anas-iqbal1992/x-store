import React from "react";
import MiddleHeader from "./middle-header";
import InnerHeader from "./inner-header";
const Header = () => {
    return(
        <div>
            <header className="header shop">
                <MiddleHeader/>
                <InnerHeader/>
            </header>
        </div>
    )
}
export default Header;