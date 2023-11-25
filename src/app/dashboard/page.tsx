import {Metadata} from "next";
import SideBar from "@/components/sidebar/SideBar";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Dashboard() {
    return (
        <>
            <div className="layout-wrapper d-lg-flex">
                <SideBar/>
            </div>
        </>
    )
}