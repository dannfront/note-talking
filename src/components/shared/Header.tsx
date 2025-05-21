import { useLocation, useParams } from "react-router";
import InputSearch from "../search/InputSearch"

interface Props {
    title?: string; // Hacemos el título opcional ya que lo determinaremos dinámicamente
}

export default function Header({ title: propTitle }: Props) {
    const location = useLocation();
    const params = useParams();
    const path = location.pathname;

    // Función para determinar el título según la ruta
    const getDynamicTitle = () => {
        // Si se proporciona un título explícito, usarlo
        if (propTitle) return propTitle;

        // Comprobar patrones de URL para determinar título
        if (path.match(/^\/notes\/note\/[^/]+$/)) {
            // Ruta: /notes/note/:id
            return "Note Details";
        } else if (path === "/notes") {
            // Ruta: /notes
            return "All Notes";
        } else if (path === "/archive") {
            // Ruta: /archive
            return "Archived Notes";
        } else if (path.match(/^\/archive\/note\/[^/]+$/)) {
            // Ruta: /archive/note/:id
            return "Archived Note Details";
        } else if (path.match(/^\/tag\/[^/]+$/)) {
            // Ruta: /tag/:tag
            return `Notes Tagged: ${params.tag}`;
        } else if (path.match(/^\/tag\/[^/]+\/[^/]+$/)) {
            // Ruta: /tag/:tag/:id
            return `Tagged Note: ${params.tag}`;
        } else if (path === "/search") {
            // Ruta: /search
            return "Search Results";
        } else if (path === "/new-note") {
            // Ruta: /new-note
            return "Create New Note";
        }

        // Título por defecto
        return "Notes App";
    };

    const dynamicTitle = getDynamicTitle();

    return (
        <header className=' bg-white dark:bg-custom-neutral-950 rounded-t-xl p-[16px] flex justify-between lg:col-span-5 lg:col-start-2 lg:border-b lg:border-b-custom-neutral-200 lg:dark:border-b-custom-neutral-800 lg:rounded-none'>

            <h1 className="font-bold text-2xl dark:text-white">
                {dynamicTitle}
            </h1>

            <div className="hidden lg:block">
                <InputSearch />
            </div>
        </header>
    );
}