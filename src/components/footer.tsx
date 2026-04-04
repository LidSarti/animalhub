import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-10 border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="space-y-4">
          <p className="font-semibold text-gray-700 text-center">Fale Conosco:</p>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image src="/assets/facebook.png" alt="Facebook" width={24} height={24} />
              <span className="text-gray-600">Aaano</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/assets/telefone.png" alt="Telefone" width={24} height={24} />
              <span className="text-gray-600">(19) 99999-9999</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/assets/instagram.png" alt="Instagram" width={24} height={24} />
              <span className="text-gray-600">Aaano</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}