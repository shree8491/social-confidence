import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Real-World Social Confidence & Cold Outreach | Field Coaching Program & Framework',
  description:
    'An intensive 5-hour field-based coaching program in Chennai designed to transform introverted, socially anxious individuals into confident communicators through progressive public outreach challenges and real-time debriefs.',
  keywords: [
    'Social Confidence',
    'Cold Outreach',
    'Approach Anxiety',
    'Communication Coaching',
    'Chennai Field Coaching',
    'Shree Sundar',
  ],
  authors: [{ name: 'Shree Sundar' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#090d16] text-gray-100 antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
