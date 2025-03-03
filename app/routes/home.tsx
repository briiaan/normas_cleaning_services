import { ActionFunction, MetaFunction, redirect, LoaderFunction } from "react-router";
import { Link } from "react-router";
import Homepage from "~/components/homepage";
import Topbar from "~/components/topbar";
import { useOutletContext } from "react-router";


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

export default function Index() {
  return (
    <>
    <Topbar/>
    <Homepage/> 
    </>
  );
}
