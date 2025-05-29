import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, LogOut, Menu, Moon, Sun } from "lucide-react";
import logo from "@/assets/default/logo.png.webp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { getUser, isLoggedIn, logout } from "@/store/authSlice";
import { selectDarkMode, toggleDarkMode } from "@/store/darkModeSlice";
import { setLoader } from "@/store/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Header = () => {
  const darkmode = useAppSelector(selectDarkMode);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const isLogged = useAppSelector(isLoggedIn);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 170); // Change to fixed after 170px scroll
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sheet when not mobile
  useEffect(() => {
    if (sheetOpen && !isMobile) {
      setSheetOpen(false);
    }
  }, [isMobile, sheetOpen]);

  const logoutUser = async () => {
    try {
      dispatch(setLoader(true));
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <header className={`h-20 z-[20] transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md shadow-sm' : 'relative'}`}>
      <div className="w-full max-w-7xl mx-auto py-2 px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="brand w-20">
            <img src={logo} className="w-full h-full" alt="Logo" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex-auto hidden lg:flex justify-center items-center">
            <nav>
              <ul className="flex gap-2">
                <li>
                  <Link 
                    className={`font-semibold px-5 py-5 block transition-colors duration-300 ${isScrolled ? 'text-foreground hover:text-custom-primary' : 'text-white hover:text-custom-primary'}`} 
                    to={'/'}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    className={`font-semibold px-5 py-5 block transition-colors duration-300 ${isScrolled ? 'text-foreground hover:text-custom-primary' : 'text-white hover:text-custom-primary'}`} 
                    to={'/product'}
                  >
                    Product
                  </Link>
                </li>
                <li>
                  <Link 
                    className={`font-semibold px-5 py-5 block transition-colors duration-300 ${isScrolled ? 'text-foreground hover:text-custom-primary' : 'text-white hover:text-custom-primary'}`} 
                    to={'/promo'}
                  >
                    Promo
                  </Link>
                </li>
                <li>
                  <Link 
                    className={`font-semibold px-5 py-5 block transition-colors duration-300 ${isScrolled ? 'text-foreground hover:text-custom-primary' : 'text-white hover:text-custom-primary'}`} 
                    to={'/about'}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    className={`font-semibold px-5 py-5 block transition-colors duration-300 ${isScrolled ? 'text-foreground hover:text-custom-primary' : 'text-white hover:text-custom-primary'}`} 
                    to={'/contact'}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex gap-2 items-center">
            {(isLogged && user) ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hidden md:flex">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="User" />
                      <AvatarFallback className="uppercase">{user?.username?.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  {user?.role == "admin" && (
                    <DropdownMenuItem>
                      <Link to="/admin" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={logoutUser}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant={isScrolled ? "outline" : "default"}>
                  <Link to={'/login'}>Sign In</Link>
                </Button>
                <Button asChild variant={isScrolled ? "default" : "outline"}>
                  <Link to={'/register'}>Register</Link>
                </Button>
              </>
            )}

            <Button 
              className="hidden md:block" 
              variant={isScrolled ? "outline" : "ghost"} 
              onClick={() => dispatch(toggleDarkMode())}
            >
              {darkmode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant={isScrolled ? "outline" : "ghost"} size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="max-w-2xs">
                <div className="flex flex-col h-full pt-10">
                  <nav className="flex-auto px-4 pt-5 border-t">
                    <ul className="flex flex-col gap-2">
                      <li>
                        <Link 
                          className="block p-2 transition-colors duration-500 hover:bg-muted rounded-md" 
                          to="/"
                          onClick={() => setSheetOpen(false)}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link 
                          className="block p-2 transition-colors duration-500 hover:bg-muted rounded-md" 
                          to="/product"
                          onClick={() => setSheetOpen(false)}
                        >
                          Product
                        </Link>
                      </li>
                      <li>
                        <Link 
                          className="block p-2 transition-colors duration-500 hover:bg-muted rounded-md" 
                          to="/promo"
                          onClick={() => setSheetOpen(false)}
                        >
                          Promo
                        </Link>
                      </li>
                      <li>
                        <Link 
                          className="block p-2 transition-colors duration-500 hover:bg-muted rounded-md" 
                          to="/about"
                          onClick={() => setSheetOpen(false)}
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link 
                          className="block p-2 transition-colors duration-500 hover:bg-muted rounded-md" 
                          to="/contact"
                          onClick={() => setSheetOpen(false)}
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </nav>

                  {isLogged && user && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex flex-row px-2 py-2 gap-4 border-t cursor-pointer">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={"/img"} alt={"profile"} />
                            <AvatarFallback className="rounded-lg">
                              {user?.username?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user?.username}</span>
                            <span className="truncate text-xs">{user?.email}</span>
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
                        <DropdownMenuLabel className="p-0 font-normal">
                          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                              <AvatarImage src={'/img'} alt={"profile"} />
                              <AvatarFallback className="rounded-lg">
                                {user?.username?.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-semibold">{user?.username}</span>
                              <span className="truncate text-xs">{user?.email}</span>
                            </div>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <Link to={'profile'}>
                            <DropdownMenuItem onClick={() => setSheetOpen(false)}>
                              <BadgeCheck className="mr-2 h-4 w-4" />
                              Account
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logoutUser}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;