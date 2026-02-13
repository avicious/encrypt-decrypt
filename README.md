# 🔐 Encrypt & Decrypt

A sleek, lightweight React component for encrypting and decrypting text using the **AES (Advanced Encryption Standard)** algorithm. This tool features a toggleable interface, real-time error handling, and a "copy-to-clipboard" feedback system.

## ✨ Features

- **AES-256 Encryption:** Securely transform plaintext into ciphertext.
- **Instant Decryption:** Revert hashes back to readable text using a shared secret.
- **Environment Safety:** Uses `.env` variables to manage sensitive keys.
- **Smart UI:**
  - **State-aware buttons:** Highlights the active mode (Encrypt/Decrypt).
  - **Visual feedback:** Icon toggles from `Copy` to `CopyCheck` upon success.
  - **Automatic Resets:** Error messages and results clear when switching modes.

## 🚀 How It Works

This application functions as a bridge between user input and the **AES** algorithm, managed through a reactive state machine.

### 1. The Encryption Pipeline

When you click **ENCRYPT**, the following sequence occurs:

- **Input Capture:** The `input` state retrieves the raw string from the textarea.
- **Key Application:** `CryptoJS.AES.encrypt` takes your text and the `SECRET_PASS` from your `.env`.
- **Ciphertext Generation:** The algorithm generates a CipherParams object, which is converted to a **Base64 string**.
- **State Update:** The resulting hash is stored in the `result` state and displayed to the user.

### 2. The Decryption Pipeline

When you click **DECRYPT**:

- **Validation:** The component checks if the input is a valid Base64/AES string.
- **Reverse Transformation:** `CryptoJS.AES.decrypt` attempts to strip the encryption layers using the secret key.
- **Encoding:** The resulting "words" (bytes) are converted back into a readable string using `Utf8` encoding.
- **Error Handling:** If the key is wrong or the data is corrupted, the `try-catch` block triggers a "Decryption failed" message instead of crashing the app.

## 🛠️ Installation & Setup

Follow these steps to get the Crypto Utility running in your local environment.

### 1. Install Dependencies

The project requires `crypto-js` for the encryption algorithms and `lucide-react` for the interface icons. Run the following command in your terminal:

```bash
npm install crypto-js lucide-react
```

### 2. Configure Environment Variables

To keep your secret key secure and out of your source code, use an environment variable.

1. Create a file named .env in the root directory of your project.

2. Add your secret password using the prefix required by your build tool:

For Vite

```
VITE_SECRET_PASS=your_super_secret_key
```

### 3. Secure Your Secret

To prevent your secret key from being leaked to version control (like GitHub), ensure your `.env` file is ignored. Open your `.gitignore` file and add:

```text
# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 4. Logic Implementation

In your React component, the key is accessed depending on your build tool. The provided code uses the Vite syntax:

```
import.meta.env.VITE_SECRET_PASS
```

### 5. Running the Application

Once the dependencies are installed and the .env file is configured, start your development server:

```
npm run dev
```
