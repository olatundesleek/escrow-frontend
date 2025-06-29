import * as motion from "motion/react-client";
import Link from "next/link";
export const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 15,
    }}
    className="text-secondary hover:bg-secondary hover:text-primary p-2 rounded-xl border border-secondary"
  >
    <Link href={href}>{icon}</Link>
  </motion.li>
);
