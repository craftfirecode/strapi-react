import { Link, NavLink, useLocation } from "react-router";
import React from "react";
import { Menu } from "@base-ui-components/react";
import * as Icons from "lucide-react";
import { MenuIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { NavigationMegaMenu } from "./desktop/navigation-mega-menu";

export const Navigation = ({ data }: { data: any }) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false); // State für das Öffnen/Schließen des Menüs

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Menü öffnen oder schließen
  };
  function DynamicIcon({ iconName }: { iconName: string }) {
    // @ts-ignore
    const IconComponent: any = Icons[iconName];
    return IconComponent ? <IconComponent /> : null;
  }

  const isActive = (path: string): boolean => {
    return location.pathname.startsWith("/" + path);
  };
  return (
    <>
      <nav className="container hidden mx-auto md:flex items-center gap-2 pt-5">
        <Link to="/" aria-label="Home">
          <div className="me-3 flex items-center gap-2 text-light font-bold text-[16px]">
            <svg
              className="brand"
              width="75"
              height="75"
              viewBox="0 0 57 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M46.1577 37.3289C51.4322 48.095 47.5178 60.0008 37.0082 65.4048C28.7176 69.6677 17.963 67.2454 12.0902 59.7928C6.5683 52.7853 6.0301 43.8742 10.6781 36.2199C12.8824 32.59 15.7141 29.3349 17.2061 24.9998C18.0741 26.618 17.8547 28.0776 17.6891 29.5291C17.3996 32.0665 17.5601 34.5121 19.2046 36.6282C19.6614 37.2158 20.1677 37.7839 21.1208 37.9604C21.5629 36.8312 21.1947 35.7116 20.8909 34.7177C18.7967 27.866 20.0878 21.6571 24.1896 15.9006C26.1815 13.1052 27.6689 10.1139 27.5596 6.53437C27.5039 4.70995 27.0463 3.01794 26.2663 1.38888C26.0748 0.989016 25.7262 0.632975 25.7887 0.0266113C26.9654 0.212634 27.8333 0.847154 28.6483 1.51138C34.046 5.91173 35.625 11.6146 34.3181 18.2924C33.9789 20.0253 33.2828 21.7332 33.9053 23.5486C34.1033 24.1258 34.2527 24.7177 34.9195 25.1537C36.2399 24.2732 36.7367 22.873 37.2011 21.4518C37.6584 20.0526 37.4244 18.5829 37.5296 17.1441C38.3385 17.0555 38.4476 17.6677 38.6791 18.0721C39.6081 19.6959 39.9958 21.4938 40.1083 23.3283C40.2874 26.2492 41.0605 28.9559 42.6104 31.4476C43.8011 33.3615 44.943 35.3056 46.1577 37.3289Z"
                fill="#ED5114"
              />
              <path
                d="M50.4335 35.5531C49.0643 32.7826 47.3472 30.3694 45.2339 28.2806C44.2837 27.3413 44.3771 26.7158 45.1995 25.8301C46.2041 24.7484 46.7345 25.7822 47.2474 26.2805C51.4392 30.353 54.2148 35.2469 55.2656 41.0064C57.1214 51.1793 54.5179 60.0736 46.9023 67.1464C33.1891 79.8823 12.6723 76.0483 3.76908 60.3598C-2.33443 49.6046 -0.454403 36.1201 8.08409 27.2633C8.50705 26.8246 8.95443 26.4058 9.41931 26.0119C10.5907 25.0191 10.812 25.1073 11.691 26.3363C12.277 27.1556 11.8711 27.5622 11.3182 28.0927C8.07882 31.2008 5.64735 34.8316 4.26741 39.1325C-0.38709 53.6391 8.90444 68.9464 23.9334 71.5269C37.267 73.8164 50.5502 64.337 52.653 51.0039C53.4935 45.6733 52.8789 40.5296 50.4335 35.5531Z"
                fill="#ED9614"
              />
            </svg>
            <div>CraftFire</div>
          </div>
        </Link>
        {data.map((item: any) => (
          <React.Fragment key={item.id}>
            {item.invisible === false && (
              <>
                {item.children.length === 0 ? (
                  <NavLink
                    caseSensitive
                    tabIndex={0}
                    role="link"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#00c16a] py-2 px-3"
                        : "text-light py-2 px-3 transition-colors duration-450 hover:text-[#00c16a]"
                    }
                    to={item.url}
                  >
                    <div className="flex items-center gap-1.5">
                      <DynamicIcon iconName={item.icon} />
                      {item.label}
                    </div>
                  </NavLink>
                ) : (
                  <Menu.Root openOnHover>
                    {(() => {
                      const hasActiveChild = item.children.some((child: any) =>
                        child.sub.some((sub: any) =>
                          isActive(item.url + "/" + sub.url)
                        )
                      );
                      return (
                        <>
                          <Menu.Trigger
                            role="link"
                            className={`flex h-10 items-center justify-center gap-1.5 rounded-md px-3.5 select-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:text-[#00c16a] ${
                              hasActiveChild
                                ? "text-[#00c16a]"
                                : "py-2 px-3 transition-colors duration-450"
                            }`}
                          >
                            <DynamicIcon iconName={item.icon} />
                            {item.label}
                            <ChevronDownIcon className="-mr-1" />
                          </Menu.Trigger>
                          <Menu.Portal>
                            <Menu.Positioner
                              className="outline-none"
                              sideOffset={8}
                            >
                              <Menu.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
                                <Menu.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
                                  <ArrowSvg />
                                </Menu.Arrow>
                                <NavigationMegaMenu items={item} />
                              </Menu.Popup>
                            </Menu.Positioner>
                          </Menu.Portal>
                        </>
                      );
                    })()}
                  </Menu.Root>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </nav>
      <nav className="container felx mx-auto md:hidden items-center pt-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="me-3">
              <svg
                className="brand"
                width="75"
                height="75"
                viewBox="0 0 57 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M46.1577 37.3289C51.4322 48.095 47.5178 60.0008 37.0082 65.4048C28.7176 69.6677 17.963 67.2454 12.0902 59.7928C6.5683 52.7853 6.0301 43.8742 10.6781 36.2199C12.8824 32.59 15.7141 29.3349 17.2061 24.9998C18.0741 26.618 17.8547 28.0776 17.6891 29.5291C17.3996 32.0665 17.5601 34.5121 19.2046 36.6282C19.6614 37.2158 20.1677 37.7839 21.1208 37.9604C21.5629 36.8312 21.1947 35.7116 20.8909 34.7177C18.7967 27.866 20.0878 21.6571 24.1896 15.9006C26.1815 13.1052 27.6689 10.1139 27.5596 6.53437C27.5039 4.70995 27.0463 3.01794 26.2663 1.38888C26.0748 0.989016 25.7262 0.632975 25.7887 0.0266113C26.9654 0.212634 27.8333 0.847154 28.6483 1.51138C34.046 5.91173 35.625 11.6146 34.3181 18.2924C33.9789 20.0253 33.2828 21.7332 33.9053 23.5486C34.1033 24.1258 34.2527 24.7177 34.9195 25.1537C36.2399 24.2732 36.7367 22.873 37.2011 21.4518C37.6584 20.0526 37.4244 18.5829 37.5296 17.1441C38.3385 17.0555 38.4476 17.6677 38.6791 18.0721C39.6081 19.6959 39.9958 21.4938 40.1083 23.3283C40.2874 26.2492 41.0605 28.9559 42.6104 31.4476C43.8011 33.3615 44.943 35.3056 46.1577 37.3289Z"
                  fill="#ED5114"
                />
                <path
                  d="M50.4335 35.5531C49.0643 32.7826 47.3472 30.3694 45.2339 28.2806C44.2837 27.3413 44.3771 26.7158 45.1995 25.8301C46.2041 24.7484 46.7345 25.7822 47.2474 26.2805C51.4392 30.353 54.2148 35.2469 55.2656 41.0064C57.1214 51.1793 54.5179 60.0736 46.9023 67.1464C33.1891 79.8823 12.6723 76.0483 3.76908 60.3598C-2.33443 49.6046 -0.454403 36.1201 8.08409 27.2633C8.50705 26.8246 8.95443 26.4058 9.41931 26.0119C10.5907 25.0191 10.812 25.1073 11.691 26.3363C12.277 27.1556 11.8711 27.5622 11.3182 28.0927C8.07882 31.2008 5.64735 34.8316 4.26741 39.1325C-0.38709 53.6391 8.90444 68.9464 23.9334 71.5269C37.267 73.8164 50.5502 64.337 52.653 51.0039C53.4935 45.6733 52.8789 40.5296 50.4335 35.5531Z"
                  fill="#ED9614"
                />
              </svg>
            </div>
          </Link>
          <div className="p-3 cursor-pointer" onClick={() => setOpen(true)}>
            <MenuIcon />
          </div>
        </div>
        <Sheet open={open}>
          <SheetContent
            className="bg-white overflow-auto h-screen"
            onPointerDownOutside={() => setOpen(false)}
          >
            <SheetHeader>
              <SheetDescription>CraftFire</SheetDescription>
            </SheetHeader>
            <Accordion type="single" collapsible>
              <div className="">
                {data.map((item: any, index: number) => (
                  <div className="" key={item.id}>
                    {item.children.length === 0 ? (
                      <>
                        {item.invisible === false && (
                          <NavLink
                            onClick={() => setOpen(false)}
                            caseSensitive
                            role="link"
                            className={({ isActive }) =>
                              isActive
                                ? "text-[#00c16a] flex py-2 px-3"
                                : "text-dark flex py-2 px-3 transition-colors duration-450 hover:text-[#00c16a]"
                            }
                            to={item.url}
                          >
                            <div className="flex items-center gap-1.5 text-[19px]">
                              <DynamicIcon iconName={item.icon} />
                              {item.label}
                            </div>
                          </NavLink>
                        )}
                      </>
                    ) : (
                      <>
                        {(() => {
                          const hasActiveChild = item.children.some(
                            (child: any) =>
                              child.sub.some((sub: any) =>
                                isActive(item.url + "/" + sub.url)
                              )
                          );
                          return (
                            <AccordionItem
                              value={String(item.id)}
                              className={`${
                                hasActiveChild
                                  ? "text-[#00c16a] py-2 px-3"
                                  : "text-black  py-2 px-3 transition-colors duration-450"
                              }`}
                            >
                              <AccordionTrigger className="p-0 m-0 small-menu">
                                <div className="flex items-center gap-1.5 text-[19px] font-normal">
                                  <DynamicIcon iconName={item.icon} />
                                  {item.label}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-0 pb-0">
                                <div className="flex gap-3 flex-col pt-3">
                                  {item.children.map(
                                    (child: any, index: number) => (
                                      <React.Fragment key={index}>
                                        <div className="text-[#6d7682] text-[13px] font-semibold">
                                          {child.category}
                                        </div>
                                        {child.sub.map(
                                          (sub: any, subIndex: number) => (
                                            <React.Fragment key={subIndex}>
                                              {sub.invisible === false && (
                                                <NavLink
                                                  role="link"
                                                  onClick={() => setOpen(false)}
                                                  caseSensitive
                                                  className={({ isActive }) =>
                                                    isActive
                                                      ? "text-[#00c16a]"
                                                      : "text-black"
                                                  }
                                                  to={item.url + "/" + sub.url}
                                                >
                                                  <div className="flex items-center gap-1.5 py-2">
                                                    <DynamicIcon
                                                      iconName={sub.icon}
                                                    />
                                                    {sub.label}
                                                  </div>
                                                </NavLink>
                                              )}
                                            </React.Fragment>
                                          )
                                        )}
                                      </React.Fragment>
                                    )
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })()}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Accordion>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-gray-300"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
    </svg>
  );
}
