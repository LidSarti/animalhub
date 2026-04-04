"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = true; //TO DO: deixar dinâmico com a API

  return (
    <header className="bg-slate-100 shadow-sm">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/logoONG.png" alt="Logo" width={50} height={50} />
            <span className="text-xl font-bold text-gray-800">Adote</span>
          </Link>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Image src="/assets/perfil 1.png" alt="Perfil" width={40} height={40} className="rounded-full" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50">
              {isAuthenticated ? (
                <>
                  <Link href="/animais/novo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cadastrar Animal</Link>
                  <Link href="/usuarios" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gerenciar Usuários</Link>
                  <Link href="/ong/editar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gerenciar ONG</Link>
                  <hr className="my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sair</button>
                </>
              ) : (
                <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Entrar</Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}