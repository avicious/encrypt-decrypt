import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Copy, CopyCheck } from "lucide-react";

const SECRET_PASS = import.meta.env.VITE_SECRET_PASS;

const App = () => {
  const [input, setInput] = useState("");
  const [screen, setScreen] = useState("encrypt");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const resetState = (mode) => {
    setScreen(mode);
    setInput("");
    setResult("");
    setError("");
  };

  const handleAction = () => {
    if (!input.trim()) {
      setError("Please enter some text.");
      return;
    }

    try {
      if (screen === "encrypt") {
        const ciphertext = CryptoJS.AES.encrypt(input, SECRET_PASS).toString();
        setResult(ciphertext);
      } else {
        const bytes = CryptoJS.AES.decrypt(input, SECRET_PASS);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (!originalText) throw new Error("Invalid Key or Data");

        setResult(originalText);
      }
      setError("");
    } catch (err) {
      setError(
        screen === "encrypt"
          ? "Encryption failed."
          : "Invalid encrypted data or key.",
      );
      setResult("");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setIsCopied(true);
    } catch (err) {
      setError("Failed to copy!");
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <div className="container">
      <div>
        <button
          className={`btn btn-encrypt ${screen === "encrypt" && "active"}`}
          onClick={() => resetState("encrypt")}
        >
          Encrypt
        </button>

        <button
          className={`btn btn-decrypt ${screen === "decrypt" && "active"}`}
          onClick={() => resetState("decrypt")}
        >
          Decrypt
        </button>
      </div>

      <div className="card">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            screen === "encrypt"
              ? "Enter plain text..."
              : "Enter encrypted hash..."
          }
        />

        {error && <p className="error-text">{error}</p>}

        <button
          className={`btn submit-btn ${screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"}`}
          onClick={handleAction}
        >
          {screen.toUpperCase()}
        </button>
      </div>

      {result && (
        <div className="result-area">
          <div className="content">
            <label>{screen === "encrypt" ? "Ciphertext" : "Plaintext"}:</label>
            <button onClick={copyToClipboard} className="copy-btn">
              {isCopied ? (
                <CopyCheck color="#4BB543" size={20} />
              ) : (
                <Copy color="#a2a2a2" size={20} />
              )}
            </button>
          </div>
          <div className="result-display">
            <code>{result}</code>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
