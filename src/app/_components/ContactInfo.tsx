import Link from "next/link";
import { IconType } from "react-icons";
export const ContactInfo = ({
  Icon,
  text,
  href,
  link_text,
}: {
  Icon: IconType;
  text?: string;
  href?: string;
  link_text?: string;
}) => (
  <ul>
    <li className="flex items-center gap-2">
      <Icon size={20} className="text-secondary" />
      {(text && text) || (href && <Link href={href}>{link_text}</Link>)}
    </li>
  </ul>
);
