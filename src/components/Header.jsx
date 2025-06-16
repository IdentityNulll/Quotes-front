import React, { useState } from "react";
import "./Header.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return toast.warn("Enter a quote!");

    try {
      const res = await fetch("http://localhost:3000/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, author }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Quote Saved Successfully!", data);
        setText("");
        setAuthor("");
      } else {
        toast.error("Failed to save quote");
      }
    } catch (err) {
      console.error(err);
      alert("Error while saving quote");
    }
  };

  return (
    <header>
      <div className="header-container">
        <a className="logo" href="./Header.jsx">
          <img
            src="/Logo.jpg"
            alt="Logo"
            loading="lazy"
            width={40}
            height={40}
          />
          Quotes
        </a>

        {/* Input fields */}

        <div className="input-wrapper">
        <input
        tabIndex={1}
          className="text-input"
          type="text"
          placeholder="Enter quote"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        </div>
        <div className="input-wrapper">
        <input
          tabIndex={2}
          className="author-input"
          type="text"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        </div>

        <div className="create-btn-container">
        <button className="create-btn" onClick={handleSubmit} tabIndex={3} >
          Create Quote
        </button>
        </div>

        
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
    </header>
  );
};

export default Header;
