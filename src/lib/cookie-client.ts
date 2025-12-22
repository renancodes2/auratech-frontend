import { getCookie, deleteCookie } from "cookies-next"

export function getCookieClient() { return getCookie("session") }

export function deleteCookieClient() { deleteCookie("session") }