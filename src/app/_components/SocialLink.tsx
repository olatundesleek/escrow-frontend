import { motion } from "framer-motion";
import Link from "next/link";

export const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    whileTap={{
      scale: 0.95,
      transition: { type: "spring", stiffness: 500, damping: 10 },
    }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className="text-secondary bg-secondary/10 hover:bg-accent hover:text-white p-2 rounded-xl border border-accent transition-colors"
  >
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Social link"
    >
      {icon}
    </Link>
  </motion.li>
);
