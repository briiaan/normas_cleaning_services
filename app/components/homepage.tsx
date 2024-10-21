import React, { useEffect, useRef, useState } from "react";
import Contact from "./contact";
import background_image_url from "../images/living_room.jpeg";
import countertop_cleaning from "../images/cleaning_countertop.jpg";
import spray_gloves from "../images/spray_bottle_and_gloves.jpeg";
import "../styles/homepage.scss"
import services from "../data/services.json"
import { JSONToArrayWithoutKey } from "../utilities/functions";
import { Form, useActionData, useSubmit } from "@remix-run/react";


export default function Homepage() {
    const [isClient, setIsClient] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const serv = "services";
    const img = "images";
    const text = JSONToArrayWithoutKey(services, serv);
    const hamburger = useRef(null);
    const x_button = useRef(null);
    const button = useRef(null);
    const mobile_menu = useRef(null);

    const menu_show = () => {
        setIsOpen(true);
        mobile_menu.current.classList.replace("hide", "show");
        mobile_menu.current.classList.add("position-fixed");

        hamburger.current.classList.replace("show", "hide");

        x_button.current.classList.replace("hide", "show");
        x_button.current.classList.add("position-fixed", "right-neg5");

        document.body.style.overflow = 'hidden';
    }

    const menu_hide = () => {
        setIsOpen(false);
        mobile_menu.current.classList.replace("show", "hide")
        mobile_menu.current.classList.remove("position-fixed")

        hamburger.current.classList.replace("hide", "show");

        x_button.current.classList.remove("position-fixed", "right-neg5");
        x_button.current.classList.replace("show", "hide");

        document.body.style.overflow = 'auto';
    }

    const button_press = (location: string) => {
        event?.preventDefault();
        const section = document.querySelector(`#${location}`);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        }

        menu_hide();
    }

    useEffect(() => {
        setIsClient(typeof window != "undefined")
    }, [])

    useEffect(() => {
        if(isClient) {
            import("leaflet").then(L => {
                const map = L.map('map', {
                    center: [47.6062, -122.3321],
                    zoom: 10,
                    zoomControl: false,
                })
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                // Define coordinates around Seattle for panning
                const coordinates = [
                    [47.0379, -122.8980], // Olympia
                    [47.2529, -122.4443], // Tacoma
                    [47.3026, -122.3026], // Federal Way
                    [47.3781, -122.3297], // Des Moines
                    [47.6062, -122.3321], // Seattle
                    [47.9789, -122.2021], // Everett
                    [47.6815, -122.2087], // Kirkland
                    [47.6104, -122.2007], // Bellevue
                    [47.4829, -122.2171], // Renton
                    [47.1853, -122.2929], // Puyallup
                  ];
            

      let currentIndex = 0;

      // Function to pan the map to the next set of coordinates
      const panMap = () => {
        map.panTo(coordinates[currentIndex], { animate: true, duration: 2 }); // Pan with animation
        currentIndex = (currentIndex + 1) % coordinates.length; // Loop through coordinates
      };

      // Initial delay to allow map to load fully before starting panning
      setTimeout(() => {
        panMap(); // Start initial panning
        const intervalId = setInterval(panMap, 3000); // Continue panning every 3 seconds

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, 2000);
            })
        }
    }, [isClient])

    return (
        <>
        <div id="coverpage">
            <div id="desktop-cover-grid-container">
            <div id="desktop-cover" className="show">
            <div id="logo-cover">
                <a href="/"><p className="white noselect">Norma's <br/> Cleaning <br/> Services</p></a>
            </div>
            <div id="navbar">
                <div id="nav-desktop">
                    <ul>
                        <li><a href="#what-we-do-section"><p className="white">About</p></a></li>
                        <li><a href="#our-services"><p className="white">Services</p></a></li>
                        <li><a href="#contact-form-container-grid"><p className="white">Contact</p></a></li>
                        </ul>
                </div>
            </div>
            </div>
            </div>
            <div id="logo-mobile">
                <p>
                Norma's <br/> Cleaning <br/> Services
                </p>
            </div>
            <div id="hamburger-container" className="show">
                <div id="menu-button">
            <svg id="hamburger" className="show" onClick={menu_show} ref={hamburger} width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 26.8333H42.1666C43.1833 26.8333 44.1583 27.2372 44.8772 27.9561C45.5961 28.675 46 29.65 46 30.6667C46 31.6833 45.5961 32.6584 44.8772 33.3773C44.1583 34.0961 43.1833 34.5 42.1666 34.5H23C21.9833 34.5 21.0083 34.0961 20.2894 33.3773C19.5705 32.6584 19.1666 31.6833 19.1666 30.6667C19.1666 29.65 19.5705 28.675 20.2894 27.9561C21.0083 27.2372 21.9833 26.8333 23 26.8333ZM49.8333 57.5H69C70.0166 57.5 70.9916 57.9039 71.7105 58.6228C72.4294 59.3417 72.8333 60.3167 72.8333 61.3333C72.8333 62.35 72.4294 63.325 71.7105 64.0439C70.9916 64.7628 70.0166 65.1667 69 65.1667H49.8333C48.8166 65.1667 47.8416 64.7628 47.1227 64.0439C46.4038 63.325 46 62.35 46 61.3333C46 60.3167 46.4038 59.3417 47.1227 58.6228C47.8416 57.9039 48.8166 57.5 49.8333 57.5ZM23 42.1667H69C70.0166 42.1667 70.9916 42.5705 71.7105 43.2894C72.4294 44.0083 72.8333 44.9833 72.8333 46C72.8333 47.0167 72.4294 47.9917 71.7105 48.7106C70.9916 49.4295 70.0166 49.8333 69 49.8333H23C21.9833 49.8333 21.0083 49.4295 20.2894 48.7106C19.5705 47.9917 19.1666 47.0167 19.1666 46C19.1666 44.9833 19.5705 44.0083 20.2894 43.2894C21.0083 42.5705 21.9833 42.1667 23 42.1667Z" fill="white"/>
</svg>
<div id="x-container" className="hide" ref={x_button} onClick={menu_hide}>
<p id="x">
    X
</p>
</div>
</div>
            </div>
            <div id="menu" className="hide" ref={mobile_menu}>
                    <div id="nav-mobile-container">
                        <div id="nav-mobile">
                            <ul>
                            <li><a href="#what-we-do-section" onClick={() => button_press('what-we-do-section')}><p className="white">About</p></a></li>
                            <li><a href="#our-services" onClick={() => button_press('our-services')}><p className="white">Services</p></a></li>
                            <li><a href="#contact-form-container-grid" onClick={() => button_press("contact-form-container-grid")}><p className="white">Contact</p></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            <div id="coverpage-grid">
                <div id="background-container-coverpage">
                    <div id="cover-translucent" className="noselect">
                    </div>
                    <img src={background_image_url} className="noselect" alt="modern living room" />
                </div>
            </div>
        </div>
        <div id="introduction-section">
            <div id="introduction-section-contiainer-grid-outer">
                <div id="introduction-section-grid">
                    <div id="introduction-words">
                        <p className="black">
                        Your trusted <br/>
                        partner in <br/> cleanliness <br/>
                        and care
                        </p>
                    </div>
                <div id="image-container">
                    <img src={countertop_cleaning} className="noselect" alt="countertop"/>
                </div>
            </div>
            </div>
        </div>
        <div className="divider-container">
        <div/>
        </div>
        <div id="what-we-do-section">
            <div id="what-we-do-section-container">
                <div id="what-we-do-section-container-grid">
            <div id="title-section-what-we-do">
                <p>What We Do</p>
            </div>
            <div id="box-container-what-we-do">
            <div id="box-what-we-do">
                <div id="text">
                    <p>
                    We provide top quality cleaning services to keep your spaces spotless and inviting. We are dedicated to delivering exceptional results with attention to detail and customer satisfaction at the core of everything we do. 
                    </p>
                </div>
                <div id="image-container">
                    <img src={spray_gloves}/>
                </div>
            </div>
            </div>
            </div>
            </div>
        </div>
        <div className="divider-container">
        <div/>
        </div>
        <div id="our-services" className="noselect">
            <div id="our-services-container">
                <div id="our-services-container-grid">
                    <div id="title-section-our-services">
                        <p>Our Services</p>
                    </div>
                    <div id="box-services-grid">
                    <div id="box-our-services">
                        {JSONToArrayWithoutKey(services, img).map((value, index) => {
                            if ((index+1) % 2 == 0) {
                                return (<div className="services-list" key={index+1} id={`service_${index+1}`}>
                                    <div id="services-box-container">
                                        <div id={`service-1-` + index} className="service-mini-box">
                                            <p>{text[index-1]}</p>
                                            </div>
                                        <div id={'service-2' + index} className="service-mini-box">
                                            <p>{text[index]}</p>
                                            </div>
                                            </div>
                                        </div>)
                            } else {
                                return <div className="image-services" key={index+1} id={`img_${index+1}`}><img src={value}/></div>
                            }
                        })}
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="divider-container">
        <div/>
        </div>
        <div id="map-section">
            <div id="map-section-contiainer-grid-outer">
                <div id="map-section-grid">
                <div id="map-container">
                    <div id="map"></div>
                </div>
                    <div id="map-words">
                        <p className="black">
                        We serve the <br/> Greater Puget <br/> Sound area.
                        </p>
                    </div>
            </div>
            </div>
        </div>
        <Contact/>
        <div>

        </div>
        </>
    ) 
}