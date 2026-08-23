"use client";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="page-container">
      <button type="button" onClick={() => window.close()} className="back-button">Back</button>
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Whether you have a question, need customer support, want to share a suggestion, or have feedback about PrayerSync, feel free to contact us.</p>
      <h3>Customer Service &amp; Suggestions</h3>
      <p>For customer support, questions, feedback, or suggestions:</p>
      <p><strong>PrayerSync-Reply@outlook.com</strong></p>
      <h3>Creator &amp; Developer</h3>
      <p>For matters related to the creator and developer of PrayerSync:</p>
      <p><strong>Musa Mohammed</strong></p>
      <p><strong>deep.technical.go@gmail.com</strong></p>
      <h3>Developer</h3>
      <p>For technical or development-related matters:</p>
      <p><strong>karn.moussa@gmail.com</strong></p>
    </div>
  );
}