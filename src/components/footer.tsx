"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import api from "../services/api";

interface OngData {
  facebook?: string;
  telefone?: string;
  instagram?: string;
}

export default function Footer() {
  const [ongData, setOngData] = useState<OngData>({
    facebook: "Carregando...",
    telefone: "Carregando...",
    instagram: "Carregando...",
  });

  useEffect(() => {
    const fetchOngData = async () => {
      try {
        const response = await api.get("/ong");

        setOngData({
          facebook: response.data.facebook || "Aaano",
          telefone: response.data.telefone || "(19) 99999-9999",
          instagram: response.data.instagram || "Aaano",
        });
      } catch (err) {
        console.error("Erro ao buscar dados da ONG:", err);

        setOngData({
          facebook: "Aaano",
          telefone: "(19) 99999-9999",
          instagram: "Aaano",
        });
      }
    };

    fetchOngData();
  }, []);

  return (
    <footer className="bg-slate-100 py-10 border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="space-y-4">
          <p className="font-semibold text-gray-700 text-center">
            Fale Conosco:
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
              />

              <span className="text-gray-600">{ongData.facebook}</span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/assets/telefone.png"
                alt="Telefone"
                width={24}
                height={24}
              />

              <span className="text-gray-600">{ongData.telefone}</span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/assets/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
              />

              <span className="text-gray-600">{ongData.instagram}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
