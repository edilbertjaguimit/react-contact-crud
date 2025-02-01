import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Menu items.
const items = [
    {
        title: 'Home',
        url: 'home',
        icon: Home,
    },
    {
        title: 'Contact',
        url: 'users',
        icon: Users,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent className='bg-zinc-950'>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-zinc-50 text-2xl mb-5'>DevEdz</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className='px-4 py-2 block rounded-md transition-all duration-300 ease-in-out text-zinc-50 '
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
