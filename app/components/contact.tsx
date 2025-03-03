import React, { useEffect, useRef, useState } from "react";
import { Form, useActionData, useSubmit } from "react-router";
import "../styles/contact.scss";
import { sanitize } from "~/utilities/functions";

export default function Contact() {
    const [response, setResponse] = useState({ success: null })
    const [formData, setFormData] = useState({ first_name: "", last_name: "", city: "", email: "", phone: "", subject: "", message: ""})
    const [actionData, setActionData] = useState({})
    const submit = useSubmit();

    const refs = {
        message: useRef(null),
        message_error: useRef(null),
        first_name: useRef(null),
        first_name_error: useRef(null),
        last_name: useRef(null),
        last_name_error: useRef(null),
        phone: useRef(null),
        phone_error: useRef(null),
        email: useRef(null),
        email_error: useRef(null)
    }

    const handleDataChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent the default form submission
        const data = new FormData();
        for (const [key, value] of Object.entries(actionData)) {
            refs[`${key}`].current.classList.remove('error-validation')
            refs[`${key}_error`].current.classList.remove('popover-visible')
        }
        const action_data = {}
        // VERIFY THE DATA MATCHES
        if (formData.first_name) {
            data.append("first_name", formData.first_name);
        } else {
            action_data["first_name"] = "Please provide your first name."
        }
        if (formData.last_name) {
            data.append("last_name", formData.last_name);
        } else {
            action_data['last_name'] = "Please provide your last name"
        }
        if (formData.email) {
            data.append("email", formData.email);
        } else {
            action_data['email'] = "Please provide a correct email address."
        }
        if (formData.phone) {
            data.append("phone", formData.phone)
        } else {
            action_data["phone"] = "Please provide a phone number."
        }
        if (formData.message) {
            data.append("message", formData.message);
        } else {
            action_data['message'] = "Please provide a message"
        }
        data.append("city", formData.city);
        data.append("subject", formData.subject)
        if (Object.keys(action_data).length > 0) {
            setActionData(action_data)
        } else {            
            submit(data, { method: "POST", action: "/" });
            setResponse({success: true})

            // **Clear form fields**
        setFormData({
            first_name: "",
            last_name: "",
            city: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });

        // **Clear input field values**
        Object.values(refs).forEach(ref => {
            if (ref.current) ref.current.value = "";
        });
        }        
      };
      
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        handleDataChange(name, value);
      };

      useEffect(() => {
        if(typeof window != "undefined") {
        for (const [key, value] of Object.entries(actionData)) {
            refs[`${key}`].current.classList.add('error-validation')
            refs[`${key}_error`].current.classList.add('popover-visible')
        }
    }
      }, [actionData])

      useEffect(() => {
        if (response.success) {
            const timer = setTimeout(() => {
                setResponse({ success: null });
            }, 5000);
            return () => clearTimeout(timer);
        }      }, [response])

      return (
        <>
        <div id="contact-form-container-grid">
        <div id="contact-title">
            <p>Contact Us</p>
        </div>
            <div id="contact-form-container-inner">
                <form id="contact-form">
                    <div id="first-section">
                    <div id="first-name-input" className="justify-end">
                        <input required id="firstname" name="first_name" type="text" onChange={handleInputChange} placeholder="First Name" className="" ref={refs.first_name}/>
                        <div id="first-name-error" role="tooltip" className="show popover" ref={refs.first_name_error}>{actionData.first_name}</div>
                    </div>
                    <div id="last-name-input">
                        <input required id="lastname" name="last_name" type="text" onChange={handleInputChange} placeholder="Last Name" ref={refs.last_name}/>
                        <div id="last-name-error" role="tooltip" className="show popover" ref={refs.last_name_error}>{actionData.last_name}</div>
                    </div>
                    </div>
                    <div id="second-section">
                    <div id="email-input" className="justify-end">
                        <input required id="email" name="email" type="text" onChange={handleInputChange} placeholder="Email" ref={refs.email}/>
                        <div id="email-error" role="tooltip" className="show popover" ref={refs.email_error}>{actionData.email}</div>
                    </div>
                    <div id="phone-input">
                        <input required id="phone" name="phone" type="text" onChange={handleInputChange} ref={refs.phone} placeholder="Phone" className=""/>
                        <div id="phone-error" role="tooltip" className="show popover" ref={refs.phone_error}>{actionData.phone}</div>
                    </div>
                    </div>
                    <div id="third-section">
                        <div id="city-input" className="justify-end">
                            <input id="city" name="city" type="text" onChange={handleInputChange} placeholder="City"/>
                        </div>
                        <div>
                            <input id="subject" name="subject" type="text" onChange={handleInputChange} placeholder="Subject"/>
                        </div>
                    </div>
                    <div id="fourth-section">
                        <div id="message-input">
                            <textarea required id="message" name="message" onChange={handleInputChange} placeholder="Hello! I'm interested in your services." ref={refs.message}/>
                            <div id="message-error" role="tooltip" className="show popover" ref={refs.message_error}>{actionData.message}</div>
                        </div>
                    </div>
                    <div id="button-container">
                        <button type="button" id="button" onClick={handleSubmit}><p>Submit</p></button>
                    </div>
                    {response?.success ? (
    <p className="success-message">Message sent!</p>
) : response?.error ? (
    <p className="fail-message">Message could not be sent. Please try again.</p>
) : null}

                </form>
            </div>
        </div>
        </>
    )
}