import profile from "@/assets/images/banner.png";
import { StaticImageData } from "next/image";

export interface TestimonialType {
  image: StaticImageData;
  remark: string;
  clientname: string;
}

export const TestimonialData: TestimonialType[] = [
  {
    image: profile,
    remark:
      "This platform has completely transformed how I handled transactions. The level of security and transparency they provide gives me confidence every step of the way. I can't imagine conducting business without it now!",
    clientname: "Michele Stark",
  },
  {
    image: profile,
    remark:
      "Outstanding service! The user interface is so intuitive and easy to navigate. It's clear they put a lot of thought into the customer experience. Highly recommend!",
    clientname: "David Anderson",
  },
  {
    image: profile,
    remark:
      "Their support team is truly amazing. Anytime I had a question or needed help, they were quick to respond and incredibly helpful. It's rare to find such dedication.",
    clientname: "Sofia Martinez",
  },
  {
    image: profile,
    remark:
      "Reliable, secure, and efficient — exactly what I needed. I have full trust in this platform for all my business needs. Five stars from me!",
    clientname: "Liam Bennett",
  },
  {
    image: profile,
    remark:
      "I've tried many other platforms, but none come close to this one. Seamless transactions, great support, and real peace of mind. It's truly a game changer!",
    clientname: "Olivia Chen",
  },
];
