"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";

const guestOnly = "guestOnly";
const needLogin = "needLogin";
const organizerOnly = "organizerOnly";

class Route {
  constructor(path, type) {
    this.path = path;
    this.type = type;
  }
}

const routes = [];
routes.push(new Route("/"), guestOnly);
routes.push(new Route("/auth/customerRegister", guestOnly));
routes.push(new Route("/auth/orgenizerRegister", guestOnly));
routes.push(new Route("/auth/login", guestOnly));
routes.push(new Route("/customer/events")); //, needLogin
routes.push(new Route("/customer/events/[eventid]"));
routes.push(new Route("/organizer/dashboard", organizerOnly));
routes.push(new Route("/organizer/home", organizerOnly));
routes.push(new Route("/organizer/transaction", organizerOnly));
routes.push(new Route("/organizer/voucher", organizerOnly));

export default function ProtectedPage({ children }) {
  const userSelector = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(userSelector);
    const checkRoute = routes.find((route) => route.path == pathname);
    console.log(checkRoute, pathname);
    if (checkRoute?.type == organizerOnly && userSelector.role != "organizer")
      return redirect("/auth/login");
    else if (checkRoute?.type == needLogin && !userSelector.email)
      return redirect("/auth/login");
    else if (checkRoute?.type == guestOnly && userSelector.email)
      return userSelector.role == "organizer"
        ? redirect("/organizer/dashboard")
        : redirect("/customer/events");
    else
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  }, [userSelector]);

  return isLoading ? <> loading</> : children;
}
