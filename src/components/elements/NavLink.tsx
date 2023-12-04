"use client";

// types
import { FC } from "react";
import { InternalLinkProps, Url } from "../../../types/types";
// next
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink: FC<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof InternalLinkProps> &
    InternalLinkProps & {
      children?: React.ReactNode;
    } & React.RefAttributes<HTMLAnchorElement>
> = ({ href, children, exactActiveClassName, activeClassName, ...props }) => {
  const path = usePathname();
  const isActive = (
    path: string,
    href: Url,
    exactActiveClassName?: string,
    activeClassName?: string,
    className?: string
  ) => {
    const isActive: boolean = path.includes(href.toString());
    const isExactActive: boolean = path === href;
    const isActiveCallback = (isActive: boolean, isExactActive: boolean) => {
      if (isExactActive && isActive)
        return `${exactActiveClassName} ${activeClassName} ${className}`;
      else if (isExactActive) return `${exactActiveClassName} ${className}`;
      else if (isActive) return `${activeClassName} ${className}`;
      else {
        return `${className}`;
      }
    };

    return isActiveCallback(isActive, isExactActive);
  };

  return (
    <Link
      href={href}
      {...props}
      className={isActive(
        path,
        href,
        exactActiveClassName,
        activeClassName,
        props.className
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
