import React, { useEffect, useState } from "react";
import "./Quotes.css";
import 'react-toastify/dist/ReactToastify.css'
import { toast } from "react-toastify";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = () => {
    fetch("http://localhost:3000/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => console.error("Failed to fetch quotes:", err));
  };

  const deleteQuote = async (id) => {
    await fetch(`http://localhost:3000/api/quotes/${id}`, { method: "DELETE" });
    setQuotes((prev) => prev.filter((q) => q._id !== id));
  };

  const startEdit = (quote) => {
    setEditingId(quote._id);
    setEditText(quote.text);
    setEditAuthor(quote.author || "");
  };

  const saveEdit = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/quotes/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText, author: editAuthor }),
    });

    if (res.ok) {
      toast.success("Quote updated successfully!");
      setEditingId(null);
      fetchQuotes();
    } else {
      toast.error("Failed to update quote.");
    }
  } catch (err) {
    console.error(err);
    toast.error("An error occurred while updating.");
  }

    setEditingId(null);
    fetchQuotes();
  };

  return (
    <main>
      <div className="main-container">
        <div className="main-title">
          <h3>Fragments of Wisdom</h3>
        </div>
        <div className="main-items">
          {quotes.map((quote) => (
            <div className="quote-card" key={quote._id}>
              {editingId === quote._id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="quote-edit-text"
                    style={{resize:"none"}}
                  />
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    className="quote-edit-author"
                    placeholder="Author"
                  />
                  <div className="quote-buttons">
                    <button className="save-btn" onClick={saveEdit}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="quote-text">“{quote.text}”</p>
                  <div className="quote-meta">
                    <span className="quote-author">– {quote.author || "Anonymous"}</span>
                  </div>
                  <div className="quote-buttons">
                    <button className="edit-btn" onClick={() => startEdit(quote)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteQuote(quote._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Quotes;
