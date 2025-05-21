import { Outlet } from 'react-router'
import Aside from "../components/shared/Aside"
import Header from '../components/shared/Header'


export default function MainLayout() {
    return (
        <div className='grid grid-rows-[auto_auto_1fr] h-screen lg:grid-cols-5 lg:grid-rows-5' >
            <Aside />
            <Header />



            <Outlet />


        </div>

    )
}
