import NavItem from "@/components/bot/sidebar/parts/NavItem";
import MobileScreen from "@/components/bot/sidebar/parts/MobileScreen";
import LargerScreen from "@/components/bot/sidebar/parts/LargerScreen";

export default function Menu() {
    return (
        <>
            <div className="flex-lg-column my-auto">
                <ul className="nav nav-pills side-menu-nav justify-content-center" role="tablist">
                    <NavItem
                        href={"/bot/profile"}
                        title={"Profile"}
                        icon={"ri-user-2-line"}
                    />

                    <NavItem
                        href={"/bot/chats"}
                        title={"Chats"}
                        icon={"ri-message-3-line"}
                    />

                    <NavItem
                        href={"/bot/groups"}
                        title={"Groups"}
                        icon={"ri-group-line"}
                    />

                    <NavItem
                        href={"/bot/contacts"}
                        title={"Contacts"}
                        icon={"ri-contacts-line"}
                    />

                    <NavItem
                        href={"/bot/settings"}
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