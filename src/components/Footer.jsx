
import { Mail, Phone } from 'lucide-react';
export default function Footer({ kontak }) {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom 1: Info Desa */}
        <div>
          <h3 className="font-bold text-lg mb-2">Desa Selorejo</h3>
          <p className="text-sm">Kecamatan Mojowarno, Kabupaten Jombang</p>
        </div>

        {/* Kolom 2: Kontak dengan link dinamis */}
        <div>
        <h3 className="font-bold text-lg mb-2">Kontak</h3>
        
        {/* Link Email */}
        <div className="flex items-center gap-2 text-sm mb-1">
            <Mail size={16} />
            <a href={`mailto:${kontak?.email}`} className="hover:underline">
            {kontak?.email}
            </a>
        </div>
        
        {/* Link WhatsApp */}
        <div className="flex items-center gap-2 text-sm">
            <Phone size={16} />
            <a href={`https://wa.me/${kontak?.hp}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {kontak?.hp}
            </a>
        </div>
        </div>

        {/* Kolom 3: Link Penting (Paten) */}
        <div>
          <h3 className="font-bold text-lg mb-2">Link Terkait</h3>
          <ul className="text-sm space-y-1">
            <li>
              <a href="https://mojowarno.jombangkab.go.id/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Portal Kecamatan Mojowarno
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/PhLftzk3X9Nhoq4K9" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Peta Lokasi Balai Desa
              </a>
            </li>
            <li>
              <a href="https://www.jombangkab.go.id/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Website Resmi Kabupaten Jombang
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center mt-6 text-xs border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} KKN Desa Selorejo. All rights reserved.
      </div>
    </footer>
  );
}