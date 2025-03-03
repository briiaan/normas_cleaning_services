import React from 'react';
import "../styles/topbar.scss";

export default function Topbar() {
    return (
        <>
        <div id="topbar-container">
            <div id="topbar-center">
                <div id="topbar-flex">
                    <div id="phone-number-topbar">
                       <p id="text">Email us at:</p>
                    </div>
                    <div id="email-topbar">
                        <div className="icon">
                        <svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0.319611V3.00253L12.6667 8.36836L25.3333 3.00253V0.319611H0ZM0 5.68545V16.4171H25.3333V5.68545L12.6667 11.0513L0 5.68545Z" fill="white"/>
</svg>
                        </div>
                        <div id='email-container-topbar' className="text fw-medium white">
                            <div id="email-a-container">
                            <a href='mailto:xxxxx@normascleaningservices.com'>
                                norma@normacleaningservices.com
                            </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}