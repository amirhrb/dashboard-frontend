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
> = ({ href, children, activeClassName, ...props }) => {
  const path = usePathname();
  const isActive = (
    path: string,
    href: Url,
    activeClassName?: string,
    className?: string
  ) => {
    const isActive: boolean = path === href;
    const isActiveCallback = (isActive: boolean) => {
      if (isActive) return `${activeClassName} ${className}`;
    };

    return isActiveCallback(isActive);
  };

  return (
    <Link
      href={href}
      {...props}
      className={isActive(path, href, activeClassName, props.className)}
    >
      {children}
    </Link>
  );
};

export default NavLink;
