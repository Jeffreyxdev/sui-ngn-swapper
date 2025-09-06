import { useState } from "react";
import { db } from "../Firebase"; // your Firebase config file
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "waitlist"), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus("✅ You’re on the waitlist! Check your email.");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong, try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2"
      />
      <button
        type="submit"
        className="bg-[#8F3F90] text-white rounded p-2"
      >
        Join Waitlist
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}
