"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "../services/api";

export default function HomePage() {
  const [animais, setAnimais] = useState([]);
  
  const [opcoesFiltros, setOpcoesFiltros] = useState({
    racas: [],
    estados: [],
    cidades: [],
    porteAnimal: [], 
    status: []
  });

  const [filtros, setFiltros] = useState({
    raca: "",
    estado: "",
    cidade: "",
    tipoAnimal: "",
    porteAnimal: "",
    status: "",
  });

  const [pagina, setPagina] = useState(1);
  const [totalItens, setTotalItens] = useState(0);
  const itensPorPagina = 12;


  const fetchAnimais = async (paginaAlvo = 1) => {
    try {
      const paramsAtivos = Object.fromEntries(
        Object.entries(filtros).filter(([_, value]) => value !== "")
      );

      const params = {
        ...filtros,
        pagina: paginaAlvo
      };

      const response = await api.get("/cadastroAnimais", { params });
      setAnimais(response.data.animais); 
      setTotalItens(response.data.total);
      setPagina(paginaAlvo);
      
    } catch (error) {
      console.error("Erro ao buscar", error);
      setAnimais([]);
    }
  };

  const totalPaginas = Math.ceil(totalItens / itensPorPagina);

  const carregarFiltros = async () => {
    try {
      const response = await api.get("/cadastroAnimais/filtros");
      setOpcoesFiltros(response.data);
    } catch (error) {
      console.error("Erro ao carregar filtros", error);
    }
  };

  useEffect(() => {
    fetchAnimais();
    carregarFiltros();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Conheça seu novo amigo:
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-10 p-4 bg-slate-50 rounded-xl shadow-sm">
        
        <button 
          onClick={() => setFiltros({...filtros, tipoAnimal: "1"})}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm bg-white"
        >
          <Image src="/assets/icone cachorro.png" alt="Cachorros" width={24} height={24} />
          <span className="font-medium">Cachorros</span>
        </button>

        <button 
          onClick={() => setFiltros({...filtros, tipoAnimal: "2"})}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm bg-white"
        >
          <Image src="/assets/icone gato.png" alt="Gatos" width={24} height={24} />
          <span className="font-medium">Gatos</span>
        </button>

        <button 
          onClick={() => setFiltros({...filtros, tipoAnimal: "3"})}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm bg-white"
        >
          <Image src="/assets/icone animais.png" alt="Outros" width={24} height={24} />
          <span className="font-medium">Outros</span>
        </button>

       <select 
        name="raca" 
        value={filtros.raca}
        onChange={(e) => setFiltros({...filtros, raca: e.target.value})}
        className="form-select"
      >
        <option value="">Raça</option>
        {opcoesFiltros.racas.map((raca) => (
          <option key={raca} value={raca}>{raca}</option>
        ))}
      </select>

      <select 
        name="estado" 
        value={filtros.estado}
        onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
        className="form-select"
      >
        <option value="">Estado</option>
        {opcoesFiltros.estados.map((estado) => (
          <option key={estado} value={estado}>{estado}</option>
        ))}
      </select>

      <select 
        name="porteAnimal" 
        value={filtros.porteAnimal}
        onChange={(e) => setFiltros({...filtros, porteAnimal: e.target.value})}
        className="form-select"
      >
        <option value="">Porte Animal</option>
        {opcoesFiltros.porteAnimal.map((porteAnimal) => (
          <option key={porteAnimal} value={porteAnimal}>{porteAnimal}</option>
        ))}
      </select>

        <select 
        name="status" 
        value={filtros.status}
        onChange={(e) => setFiltros({...filtros, status: e.target.value})}
        className="form-select"
      >
        <option value="">Status</option>
        {opcoesFiltros.status.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

        <button 
          onClick={() => fetchAnimais(1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animais?.map((animal: any) => (
          <Link key={animal.id} href={`/animais/${animal.id}`} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full">
              
              <div className="relative h-52 w-full">
                <img
                  src={animal.imagem?.[0]?.imagem || "/assets/fotoPet.png"}
                  alt={animal.nome}
                  className={`w-full h-full object-cover transition duration-300 group-hover:scale-105 ${
                    animal.status_id !== 3 ? "grayscale" : ""
                  }`}
                />
              </div>

              <div className="p-4 text-center">
                <h5 className="text-lg font-bold text-gray-800 uppercase tracking-tight">
                  {animal.nome}, {animal.raca}
                </h5>
                <p className="text-gray-500 text-sm mt-1">
                  {animal.idade} anos
                </p>
                <div className="flex items-center justify-center gap-1 text-blue-600 mt-3 text-sm font-medium">
                  <i className="bi bi-geo-alt"></i> 
                  <span>{animal.cidade}, {animal.estado}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 pb-10">
          <button 
            onClick={() => fetchAnimais(pagina - 1)}
            disabled={pagina === 1}
            className="px-4 py-2 border rounded hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {/* Criar botões numerados dinamicamente */}
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => fetchAnimais(num)}
              className={`px-4 py-2 rounded shadow-md transition ${
                pagina === num 
                  ? "bg-blue-600 text-white" 
                  : "border hover:bg-gray-50 text-gray-600"
              }`}
            >
              {num}
            </button>
          ))}

          <button 
            onClick={() => fetchAnimais(pagina + 1)}
            disabled={pagina === totalPaginas}
            className="px-4 py-2 border rounded hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}