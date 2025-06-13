import { Github } from "lucide-react"
import { ReactNode } from "react"

type NavItem = {
  type: "link" | "button"
  href?: string
  label: string
  icon?: ReactNode
}

export const navItems: NavItem[] = [
  {
    type: "link",
    href: "#resources",
    label: "Resources",
  },
  {
    type: "link",
    href: "/submit",
    label: "Submit",
  },
  {
    type: "button",
    label: "GitHub",
    icon: <Github className="w-4 h-4 mr-2" />,
    href: "https://github.com", // optional if you want to wrap the button in <a>
  },
]
