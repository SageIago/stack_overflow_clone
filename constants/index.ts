import Sun from "@/app/public/assets/icons/sun.svg";
import Moon from "@/app/public/assets/icons/moon.svg";
import SystemIcon from "@/app/public/assets/icons/computer.svg";
import HomeIcon from "@/app/public/assets/icons/home.svg"
import CommunityIcon from "@/app/public/assets/icons/users.svg"
import ProfileIcon from '@/app/public/assets/icons/user.svg'
import StarIcon from "@/app/public/assets/icons/star.svg"
import QuestionIcon from "@/app/public/assets/icons/question.svg"
import SuitcaseIcon from "@/app/public/assets/icons/suitcase.svg"
import TagIcon from "@/app/public/assets/icons/tag.svg"
import { SidebarLink } from "@/types";

export const themes = [
  { values: "light", label: "Light", icon: Sun },
  { values: "dark", label: "Dark", icon: Moon },
  { values: "system", label: "System", icon: SystemIcon },
];


export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: HomeIcon,
    route: "/",
    label: "Home",
  },
  {
    imgURL: CommunityIcon,
    route: "/community",
    label: "Community",
  },
  {
    imgURL: StarIcon,
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: SuitcaseIcon,
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: TagIcon,
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: ProfileIcon,
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: QuestionIcon,
    route: "/ask-question",
    label: "Ask a question",
  },
];
export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
