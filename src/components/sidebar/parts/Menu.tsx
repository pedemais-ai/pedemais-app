import NavItem from "@/components/sidebar/parts/NavItem";
import MobileScreen from "@/components/sidebar/parts/MobileScreen";
import LargerScreen from "@/components/sidebar/parts/LargerScreen";

export default function Menu() {
    return (
        <>
            <div className="flex-lg-column my-auto">
                <ul className="nav nav-pills side-menu-nav justify-content-center" role="tablist">
                    <NavItem
                        href={"/profile"}
                        title={"Profile"}
                        icon={"ri-user-2-line"}
                    />

                    <NavItem
                        href={"/chats"}
                        title={"Chats"}
                        icon={"ri-message-3-line"}
                    />

                    <NavItem
                        href={"/groups"}
                        title={"Groups"}
                        icon={"ri-group-line"}
                    />

                    <NavItem
                        href={"/contacts"}
                        title={"Contacts"}
                        icon={"ri-contacts-line"}
                    />

                    <NavItem
                        href={"/settings"}
                        title={"Settings"}
                        icon={"ri-settings-2-line"}
                    />

                    <MobileScreen/>
                </ul>
            </div>

            <LargerScreen/>
        </>
    );
}