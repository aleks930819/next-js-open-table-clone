import Navbar from './components/Navbar';
import AuthContext from './context/AuthContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="bg-gray-100 min-h-screen w-screen overflow-hidden">
          <AuthContext>
            <main className="m-auto bg-white">
              <Navbar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
