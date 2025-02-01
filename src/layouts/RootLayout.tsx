import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/ui/custom/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import DemoPage from '@/payments/page';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
// import { NavigationMenuContent, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';

const RootLayout = () => {
    const [count, setCount] = useState(0);
    const handleCountIncrement = () => {
        setCount(count + 1);
    };
    const handleCountDecrement = () => {
        setCount(count - 1);
    };
    const [toggleSideBar, setToggleSideBar] = useState(false);
    const handleToggleSideBar = () => {
        setToggleSideBar(!toggleSideBar);
    };
    return (
        // <div className='flex h-screen'>
        //     <nav className={`bg-zinc-950 ${toggleSideBar ? 'w-0' : 'w-64'} transition-all delay-75 ease-in-out`}>
        //         <div className='wrapper text-slate-50 p-3'>
        //             <div className='logo text-2xl'>DevEdz</div>
        //             <ul className='nav-links flex flex-col gap-2 mt-5'>
        //                 <li className=''>
        //                     <NavLink to={'home'} className='px-4 py-2 block rounded-md transition-all duration-300 ease-in-out hover:bg-zinc-900'>
        //                         Home
        //                     </NavLink>
        //                 </li>
        //                 <li>
        //                     <NavLink to={'users'} className='px-4 py-2 block rounded-md transition-all duration-300 ease-in-out hover:bg-zinc-900'>
        //                         Users
        //                     </NavLink>
        //                 </li>
        //             </ul>
        //         </div>
        //     </nav>
        //     <div className='content flex-1 px-28 bg-[#E6FAD7]'>
        //         <h1>
        //             Hello, World! <span className='text-red-600'>{count}</span>
        //         </h1>
        //         <Button size='sm' onClick={handleCountIncrement}>
        //             Increment
        //         </Button>
        //         <Button size='sm' onClick={handleCountDecrement} variant={'link'}>
        //             Decrement
        //         </Button>
        //         <Button size='sm' onClick={handleToggleSideBar} variant={'link'}>
        //             {toggleSideBar ? 'Close' : 'Open'} Sidebar
        //         </Button>
        //         <DemoPage />
        //         <Outlet />
        //     </div>
        // </div>
        <SidebarProvider>
            <AppSidebar />
            <div className='flex-1 flex flex-col'>
                {/* <NavigationMenuItem>
                    <SidebarTrigger />
                    <h1>Hello</h1>
                </NavigationMenuItem> */}
                <nav className='flex items-center '>
                    <SidebarTrigger />
                    <div className='flex-1 flex items-center justify-end px-5 py-1'>
                        <Avatar className=''>
                            <AvatarImage className='rounded-full w-10' src='https://github.com/shadcn.png' alt='@shadcn' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </nav>
                <main className='content mt-5 px-28'>
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
};

export default RootLayout;
