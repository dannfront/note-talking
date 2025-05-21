
import ComplementGrid from "../ComplementGrid";
import Main from "../shared/Main";
import NavSettings from "../shared/NavSettings";
import ListSettings from "./ListSettings";



export default function Settings() {
    return (
        <>
            <NavSettings />

            <Main>
                <section className="lg:hidden">

                    <ListSettings />
                </section>
            </Main>
            <ComplementGrid />
        </>
    )
}
