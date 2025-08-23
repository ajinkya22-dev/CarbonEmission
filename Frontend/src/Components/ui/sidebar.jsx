"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Skeleton } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function SidebarProvider({ children, defaultState = "expanded" }) {
  const isMobile = useIsMobile();
  const [state, setState] = React.useState(defaultState);
  const [open, setOpen] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile(!openMobile);
      return;
    }
    
    const newState = state === "expanded" ? "collapsed" : "expanded";
    setState(newState);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${newState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [isMobile, openMobile, state]);

  React.useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [toggleSidebar]);

  React.useEffect(() => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === SIDEBAR_COOKIE_NAME) {
        setState(value);
        break;
      }
    }
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

const sidebarVariants = cva("", {
  variants: {
    variant: {
      default: "",
      bordered: "border-r",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Sidebar({ className, variant, ...props }) {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();

  return isMobile ? (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent side="left" className="p-0" style={{ width: SIDEBAR_WIDTH_MOBILE }}>
        <div className="h-full flex flex-col">
          {props.children}
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <aside
      data-state={state}
      style={{
        width: state === "expanded" ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON,
      }}
      className={cn(
        "h-full flex-col bg-background transition-[width] duration-300",
        sidebarVariants({ variant }),
        className
      )}
    >
      {props.children}
    </aside>
  );
}

function SidebarHeader({ className, ...props }) {
  const { state, isMobile } = useSidebar();
  
  return (
    <header
      className={cn(
        "flex h-14 items-center gap-2",
        state === "collapsed" && !isMobile ? "justify-center" : "px-4",
        className
      )}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }) {
  return (
    <div className={cn("flex-1 overflow-y-auto", className)} {...props} />
  );
}

function SidebarFooter({ className, ...props }) {
  const { state, isMobile } = useSidebar();

  return (
    <div
      className={cn(
        "flex items-center",
        state === "collapsed" && !isMobile ? "justify-center p-2" : "p-4",
        className
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }) {
  return (
    <nav
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }) {
  return (
    <div
      className={cn("min-h-9 px-2 relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "w-full flex items-center gap-2 rounded-md text-sm py-2",
  {
    variants: {
      isActive: {
        true: "bg-accent text-accent-foreground font-medium",
        false: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

function SidebarMenuButton({
  children,
  className,
  isActive,
  asChild,
  ...props
}) {
  const { state, isMobile } = useSidebar();
  const Comp = asChild ? Slot : "button";
  const isIconOnly = state === "collapsed" && !isMobile;

  return isIconOnly ? (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Comp
            className={cn(
              "min-h-9 w-9 rounded-md flex items-center justify-center",
              sidebarMenuButtonVariants({ isActive }),
              className
            )}
            {...props}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && typeof child.type !== "string") {
                return child;
              }
              return null;
            })}
          </Comp>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child) || typeof child.type !== "string") {
              return null;
            }
            return child;
          })}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Comp
      className={cn(
        sidebarMenuButtonVariants({ isActive }),
        isActive && "before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-primary",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function SidebarTrigger({ className, ...props }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={cn("size-9", className)}
      {...props}
    >
      <PanelLeftIcon className="size-5" />
    </Button>
  );
}

function SidebarSection({ className, ...props }) {
  const { state, isMobile } = useSidebar();

  return (
    <div
      className={cn(
        state === "collapsed" && !isMobile ? "px-2" : "px-4",
        className
      )}
      {...props}
    />
  );
}

function SidebarSectionTitle({ className, ...props }) {
  const { state, isMobile } = useSidebar();

  if (state === "collapsed" && !isMobile) {
    return null;
  }

  return (
    <h3
      className={cn(
        "mb-1 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function SidebarSeparator({ className, ...props }) {
  return <Separator className={cn("my-4", className)} {...props} />;
}

function SidebarSearch({ className, ...props }) {
  const { state, isMobile } = useSidebar();

  if (state === "collapsed" && !isMobile) {
    return null;
  }

  return <Input className={cn("h-8", className)} {...props} />;
}

function SidebarSkeleton() {
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex items-center gap-2 px-2">
        <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
        {!isCollapsed && <Skeleton className="h-4 w-32" />}
      </div>
      <div className="flex items-center gap-2 px-2">
        <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
        {!isCollapsed && <Skeleton className="h-4 w-24" />}
      </div>
      <div className="flex items-center gap-2 px-2">
        <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
        {!isCollapsed && <Skeleton className="h-4 w-28" />}
      </div>
    </div>
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSearch,
  SidebarSection,
  SidebarSectionTitle,
  SidebarSeparator,
  SidebarSkeleton,
  SidebarTrigger,
  useSidebar,
};
