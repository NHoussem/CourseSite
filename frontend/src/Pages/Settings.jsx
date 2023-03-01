import React from "react";
import AccountDetails from "../Components/AccountDetailsComp";
import Heada from "../Components/Header";
import LeftSettinComp from "../Components/LeftSettinComp"


function Settings() {
    return (
        <><Heada />
            <div className="bg-gray-200 bold">
                <p className="text-bold text-4xl ml-20 mb-10">
                    MON COMPTE
                </p>
            </div><div className="grid grid-cols-3">
                <div className="col-span-1">
                    <LeftSettinComp />
                </div><div className="col-span-2">
                    <AccountDetails className="col-span-2" />
                </div>
            </div></>
    )
}
export default Settings