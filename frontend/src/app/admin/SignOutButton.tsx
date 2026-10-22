"use client";

import { signOut } from "next-auth/react";
import styles from "./recruitment/desk.module.css";

export default function SignOutButton() {
  return (
    <button className={styles.signout} type="button" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
      Sign out
    </button>
  );
}
