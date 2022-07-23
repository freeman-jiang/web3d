import NextLink from "next/link";
import { Link, LinkProps, forwardRef } from "@chakra-ui/react";

interface CNLinkProps extends LinkProps {
  href: string;
}

export const CNLink = forwardRef<CNLinkProps, "a">((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <NextLink href={href} passHref>
      <Link
        {...rest}
        ref={ref}
        style={{ textDecoration: "none" }}
        width="fit-content"
        height="fit-content"
      >
        {children}
      </Link>
    </NextLink>
  );
});
