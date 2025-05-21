import {
    createBrowserRouter,
} from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import NoteDetail from "../components/Note/NoteDetail";
import AllNotes from "../components/Note/AllNotes";
import NewNote from "../components/Note/NewNote";
import Settings from "../components/settings/Settings";
import Archive from "../components/archive/Archive";
import Tags from "../components/tag/Tags";
import Tag from "../components/tag/Tag";
import ArchiveNote from "../components/archive/ArchiveNote";
import AllTags from "../components/tag/AllTags";
import TagsTag from "../components/tag/TagsTag";
import Search from "../components/search/Search";
import ColorTheme from "../components/settings/ColorTheme";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Protected from "../auth/Protected";
import ChangePassword from "../components/settings/ChangePassword";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "/notes",
                        element:
                            <Protected>
                                <AllNotes />
                            </Protected>
                    },
                    {
                        path: "/notes/note/:id",
                        element:
                            <Protected>
                                <NoteDetail />
                            </Protected>
                    },
                    {
                        path: "/new-note",

                        element:
                            <Protected>
                                <NewNote />
                            </Protected>
                    },

                    {
                        path: "/archive",

                        element:
                            <Protected>
                                <Archive />
                            </Protected>
                    },
                    {
                        path: "/archive/note/:id",
                        element:
                            <Protected>
                                <ArchiveNote />
                            </Protected>
                    },
                    {
                        path: "/tags",
                        element:
                            <Protected>
                                <AllTags />
                            </Protected>
                    },
                    {
                        path: "/tags/tag/:tag",
                        element:
                            <Protected>
                                <TagsTag />
                            </Protected>
                    },
                    {
                        path: "/tag/:tag",
                        element:
                            <Protected>
                                <Tag />
                            </Protected>
                    },
                    {
                        path: "/tag/:tag/:id",

                        element: <Protected>
                            <Tags />
                        </Protected>
                    },

                    {
                        path: "/search",
                        element:
                            <Protected>

                                <Search />
                            </Protected>
                    },
                    {
                        path: "/settings",
                        element: <Protected>
                            <Settings />
                        </Protected >
                    },
                    {
                        path: "/settings/color-theme",
                        element: <Protected>
                            <ColorTheme />
                        </Protected>
                    },
                    {
                        path: "/settings/change-password",
                        element: <Protected>
                            <ChangePassword />
                        </Protected>
                    }

                ]
            },

        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

export default router
