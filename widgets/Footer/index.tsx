import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#2C2824] text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
        <div>
          <h3 className="font-semibold mb-4 text-[#C6A43F]">LumenBridge Finance</h3>
          <p className="text-xs md:text-sm text-white/60">Краткосрочные финансовые решения</p>
          <p className="text-xs md:text-sm text-white/60 mt-2">18 Lower Baggot Street, Dublin 2</p>
          <p className="text-xs md:text-sm text-[#C6A43F] mt-2">support@lumenbridge.example</p>
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-medium text-white/50 mb-4">КОМПАНИЯ</h4>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link href="/how-it-works" className="text-white/60 hover:text-[#C6A43F] transition">Как работает</Link></li>
            <li><Link href="/for-business" className="text-white/60 hover:text-[#C6A43F] transition">Для бизнеса</Link></li>
            <li><Link href="/faq" className="text-white/60 hover:text-[#C6A43F] transition">FAQ</Link></li>
            <li><Link href="/contacts" className="text-white/60 hover:text-[#C6A43F] transition">Контакты</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-medium text-white/50 mb-4">ДОКУМЕНТЫ</h4>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link href="/privacy" className="text-white/60 hover:text-[#C6A43F] transition">Политика</Link></li>
            <li><Link href="/cookies" className="text-white/60 hover:text-[#C6A43F] transition">Cookie Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-medium text-white/50 mb-4">КОНТАКТЫ</h4>
          <p className="text-xs md:text-sm text-white/60">+353 1 531 8420</p>
          <p className="text-xs md:text-sm text-[#C6A43F] mt-2">support@lumenbridge.example</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center text-white/30 text-xs mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
        <p>© 2024 LumenBridge Finance Ltd. Все права защищены.</p>
      </div>
    </footer>
  );
}
