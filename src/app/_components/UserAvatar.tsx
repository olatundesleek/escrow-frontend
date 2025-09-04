import Image from "next/image";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import { TbSettingsCog } from "react-icons/tb";
import { useUserProfileForm } from "../_hooks/useUserProfileForm";

interface UserAvatarProps {
  dropdown: boolean;
  setDropdown: (value: boolean) => void;
}

export default function UserAvatar({ dropdown, setDropdown }: UserAvatarProps) {
  const { user } = useUserProfileForm();

  return (
    <div className="relative">
      <div
        onClick={() => setDropdown(!dropdown)}
        className="cursor-pointer w-[40px] h-[40px] mx-auto rounded-full"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt="user avatar/profile image"
            fill
            className="object-contain rounded-full border-2 border-purple-500"
            sizes="40px"
          />
        ) : (
          <Image
            src="/useravartar.png"
            alt="user avatar/profile image"
            fill
            className="object-contain rounded-full"
            sizes="60px"
          />
        )}
      </div>
      {dropdown && (
        <ul className="absolute right-0 mt-2 p-2 bg-white rounded-xl shadow-lg z-10 min-w-[130px]">
          <li>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
            >
              <LuUserRound className="text-blue-500" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
            >
              <TbSettingsCog className="text-purple-600" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
