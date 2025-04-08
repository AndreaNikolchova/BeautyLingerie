import { useContext, useState } from 'react';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const productCategories = [
    { name: 'Bikini', href: '/bikini' },
    { name: 'Underwear', href: '/underwear' },
    { name: 'Others', href: '/others' },
    { name: 'All', href: '' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <header className="bg-beige">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Beauty Lingerie</span>
                        <img alt="" src="/Logo.png" className="h-20 w-auto" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Products
                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-beige shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="p-4">
                                {productCategories.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-white-50"
                                    >
                                        <div className="flex-auto">
                                            <Link to={`/products${item.href}`} className="block font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Popover>

                    <Link to={'/products/new-arrivals'} className="text-sm font-semibold leading-6 text-gray-900">
                        New Arrivals
                    </Link>
                    <Link to={'/about'} className="text-sm font-semibold leading-6 text-gray-900">
                        About
                    </Link>
                    {isAuthenticated && (
                        <Link
                            to="/reviews"
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-500 transition-colors"
                        >
                            My Reviews
                        </Link>
                    )}
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">

                    {!isAuthenticated ? (
                        <>
                            <Link to={'/register'} className="text-sm font-semibold leading-6 text-gray-900 ">
                                Register
                            </Link>
                            <Link to={'/login'} className="text-sm font-semibold leading-6 text-gray-900 ">
                                Log In
                            </Link>
                        </>
                    ) : (
                        <Link to={'/logout'} className="text-sm font-semibold leading-6 text-gray-900 ">
                            Log Out
                        </Link>
                    )}
                    <Link to="/cart">
                        <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
                    </Link>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-beige px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Beauty Lingerie</span>
                            <img alt="" src="/Logo.png" className="h-10 w-auto" />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-beige-50">
                                        Products
                                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...productCategories].map((item) => (
                                            <Link
                                                key={item.name}
                                                to={`/products${item.href}`}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-beige-50"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <Link
                                    to={'/products/new-arrivals'}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-beige-50"
                                >
                                    New Arrivals
                                </Link>
                                <Link
                                    to="/about"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-beige-50"
                                >
                                    About
                                </Link>
                                {isAuthenticated && (
                                    <Link
                                        to="/reviews"
                                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-500 transition-colors"
                                    >
                                        My Reviews
                                    </Link>
                                )}
                            </div>
                            <div className="py-6">

                                {!isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-beige-50"
                                        >
                                            Register
                                        </Link>
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-beige-50"
                                        >
                                            Log In
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        to="/logout"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-beige-50"
                                    >
                                        Log Out
                                    </Link>
                                )}
                                <Link
                                    to="/cart"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-beige-50"
                                >
                                    <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
