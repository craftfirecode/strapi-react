import * as Icons from "lucide-react";
import { Menu } from "@base-ui/react";
import { useCallback } from "react";
import { NavLink, useNavigate } from "react-router";

export const NavigationMegaMenu = ({ items }: any) => {
  const navigate = useNavigate();

  function DynamicIcon({ iconName }: { iconName: string }) {
    // @ts-ignore
    const IconComponent: any = Icons[iconName];
    return IconComponent ? <IconComponent /> : null;
  }

  const handleKeyDown = useCallback(
    (url: string, event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        navigate(url);
      }
    },
    [navigate]
  );

  console.log(items);
  return (
    <div className="py-5 px-10 gap-15 grid grid-flow-col">
      {items.children.map((child: any, index: number) => (
        <div className="flex flex-col gap-2" key={index}>
          <div className="text-[#6d7682] text-[13px] font-semibold">
            {child.category}
          </div>
          {child.sub.map((sub: any, subIndex: number) => (
            <div key={subIndex}>
              {sub.invisible === false && (
                <NavLink
                  caseSensitive
                  role="link"
                  key={subIndex}
                  className={({ isActive }) =>
                    isActive ? " text-[#00c16a]" : "menuitem"
                  }
                  to={items.url + "/" + sub.url}
                >
                  <Menu.Item
                    tabIndex={0}
                    role="link"
                    className="flex items-center gap-2 py-2"
                    onKeyDown={(event) =>
                      handleKeyDown(items.url + "/" + sub.url, event)
                    }
                  >
                    <DynamicIcon iconName={sub.icon} />
                    {sub.label}
                  </Menu.Item>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      ))}
      <div>
        {items.cta && (
          <img
            title="cta"
            src={import.meta.env.VITE_PUBLIC_STRAPI_API_URL + items.cta.url}
            className="w-full h-full object-cover object-top rounded-lg"
          />
        )}
      </div>
    </div>
  );
};
