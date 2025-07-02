import { IconType } from "react-icons";
import { TbHomeShield } from "react-icons/tb";
import { IoCarSportOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { SlBriefcase } from "react-icons/sl";
interface Service {
  title: string;
  goods: string;
  Icon: IconType;
  description: string;
}

export const services: Service[] = [
  {
    title: "Harmony",
    goods: "Home",
    Icon: TbHomeShield,
    description:
      "Facilitate secure real estate transactions with ease and confidence using our platform.",
  },
  {
    title: "Vehicle",
    goods: "Ease",
    Icon: IoCarSportOutline,
    description:
      "Ensure smooth and secure vehicle transactions, whether buying or selling.",
  },
  {
    title: "Precious",
    goods: "Items",
    Icon: CiGift,
    description:
      "Safeguard valuable assets such as jewelry, artwork, or collectibles with our secure platform.",
  },
  {
    title: "Business",
    goods: "Transfer",
    Icon: SlBriefcase,
    description:
      "Streamline the transfer of business assets or intellectual property securely and efficiently.",
  },
];
