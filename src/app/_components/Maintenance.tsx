import { FaTools } from "react-icons/fa";

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-amber-100 px-4 text-center">
      <FaTools size={64} className="mb-6 text-amber-400 animate-bounce" />
      <h1 className="text-4xl font-bold mb-4">We&#39;ll Be Back Soon!</h1>
      <p className="text-lg mb-6 max-w-xl">
        Our site is currently undergoing scheduled maintenance.
        <br />
        We appreciate your patience and understanding.
        <br />
        Please check back later.
      </p>
      <div className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Tona Escrow. All rights reserved.
      </div>
    </div>
  );
}
