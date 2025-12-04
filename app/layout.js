
export const metadata = {
  title: 'Portfolio',
  description: 'Student portfolio site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />  {/* ← Add this line */}

        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  )
}