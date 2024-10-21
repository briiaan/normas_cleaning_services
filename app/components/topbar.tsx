import React from 'react';
import "../styles/topbar.scss";

export default function Topbar() {
    return (
        <>
        <div id="topbar-container">
            <div id="topbar-center">
                <div id="topbar-flex">
                    <div id="phone-number-topbar">
                        <div className="icon">
                        <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.474407 0.319611C0.19975 0.319611 0 0.488847 0 0.721546V16.8624C0 17.0951 0.19975 17.2644 0.474407 17.2644H12.035C12.3096 17.2644 12.5094 17.0951 12.5094 16.8624V0.721546C12.5094 0.488847 12.3096 0.319611 12.035 0.319611L0.474407 0.319611ZM2.49688 2.43506H9.98752V13.0123H2.49688V2.43506ZM6.2422 14.07C6.94132 14.07 7.49064 14.5354 7.49064 15.1278C7.49064 15.7201 6.94132 16.1855 6.2422 16.1855C5.54307 16.1855 4.99376 15.7201 4.99376 15.1278C4.99376 14.5354 5.54307 14.07 6.2422 14.07Z" fill="white"/>
</svg>
                        </div>
                        <div id='number-container-topbar' className='text fw-medium white'>
                            <div id="number-a-container">
                            <a href='tel:20660592355'>
                            (206) 605-92355
                            </a>
                            </div>
                        </div>
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
                                xxxxx@normascleaningservices.com
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