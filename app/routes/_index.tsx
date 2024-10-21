import { ActionFunction, MetaFunction, json, redirect, LoaderFunction} from "@remix-run/node";
import { Link } from "@remix-run/react";
import Homepage from "~/components/homepage";
import Topbar from "~/components/topbar";

export const meta: MetaFunction = () => {
  return [
    { title: "Norma's Cleaning Services" },
    { name: "description", content: "Norma's Cleaning Services offers professional residential, scheduled or one-time cleaning services in the Puget Sound area. Reliable, eco-friendly, and tailored cleaning solutions for homeowners and businesses." },
    { name: "theme-color", content: "#323232"},
  ];
};

export const loader: LoaderFunction = async () => {
  return { hideLink: true };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  // ready to send to a email client.
  return { success: true };
};

export default function Index() {
  return (
    <>
    <Topbar/>
    <Homepage/> 
    </>
  );
}
