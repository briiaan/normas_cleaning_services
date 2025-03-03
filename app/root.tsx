import { Links, Meta, Outlet, Scripts, ScrollRestoration, useActionData } from "react-router";
import type { ActionFunction, LinksFunction } from "react-router";

import sanitizeHtml from 'sanitize-html';
import nodemailer from "nodemailer";
import dotenv from "dotenv"


export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
          let first_name = sanitizeHtml(String(data.get("first_name")));
          let name = sanitizeHtml(String(data.get("last_name")));
          let phone_number = sanitizeHtml(String(data.get("phone")));
          let email = sanitizeHtml(String(data.get("email")));
          let message = sanitizeHtml(String(data.get("message")));
          let city = sanitizeHtml(String(data.get("city")));
          let subject = sanitizeHtml(String(data.get("subject")));
          const errors = {first_name: "", email: "", phone_number: "", message: ""}  
  
          // VALIDATES
          if(typeof first_name !== "string" || first_name.length < 1) {
              errors.first_name += "Please enter a name.";
          }
          if(typeof email !== "string" || email.length < 1) {
              errors.email += "Please enter a a valid email.";
          }
          if(typeof phone_number !== "string" || phone_number.length < 1) {
              errors.phone_number += "Please enter a a valid email.";
          }
          if(typeof message !== "string" || message.length < 1) {
              errors.message += "Please enter a message.";
          }
  
          if(errors.first_name || errors.email || errors.message) {
              return { success: false };
          } else {
              // WRITE EMAIL HERE
              const transporter = nodemailer.createTransport({
                  host: process.env.HOSTNAME,
                  port: 587,
                  secure: false,
                  auth: { 
                      user: process.env.EMAIL_FROM,
                      pass: process.env.PASSWORD,
                  },
                  tls: {
                      rejectUnathorized: false,
                  },              });
  
              async function main() {
                  const info = await transporter.sendMail({
                      from: process.env.EMAIL_FROM,
                      to: process.env.EMAIL_TO,
                      subject: `${name} sent a message from normacleaningservices.com`,
                      text: `Phone Number: ${phone_number} Email: ${email} The message: ${message}`,
                      html: `<p>Phone Number: ${phone_number} <br><br> Email: ${email} <br><br> City: ${city} <br><br> Subject: ${subject} <br><br> Message: ${message} <br><br>`
                  })
  
                  console.log("message: ", info.messageId);
              }
  
              main().catch(console.error)
              return { success: true };
          } 
};

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.bunny.net",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.bunny.net/css?family=quicksand:300,400,500,600,700",
  },
  {
    rel: "stylesheet",
    href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
    crossOrigin: "",
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const response = useActionData();
  return <Outlet context={response}/>;
}
