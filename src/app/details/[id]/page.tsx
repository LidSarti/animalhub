'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '../../../services/api';

interface Animal {
  id: number;
  nome: string;
  biografia: string | null;
  imagens?: Array<{ imagem: string }>;
}

interface ContactForm {
  nome: string;
  email: string;
  telefone: string;
  biografia: string;
}

export default function DetalhesAnimal() {
  const params = useParams();
  const animalId = params.id as string;

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({
    nome: '',
    email: '',
    telefone: '',
    biografia: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // TODO: implementar autenticação real

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await api.get(`/cadastroAnimal/${animalId}`);
        setAnimal(response.data.cadastroAnimal);
      } catch (err) {
        console.error('Erro ao buscar animal:', err);
        setError('Erro ao carregar dados do animal');
      } finally {
        setLoading(false);
      }
    };

    if (animalId) {
      fetchAnimal();
    }

    // TODO: verificar se usuário está autenticado
    setIsAuthenticated(true);
  }, [animalId]);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implementar envio por email
    alert('Funcionalidade de email será implementada');
  };

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse em adotar o(a) ${animal?.nome}.`;
    const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (error || !animal) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="text-center text-red-600">{error || 'Animal não encontrado'}</div>
      </div>
    );
  }

  const animalImage = animal.imagens?.[0]?.imagem || '/assets/fotoPet.png';

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Conheça {animal.nome}:</h1>

      <div className="pet-profile grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex justify-center">
          <img
            src={animalImage}
            alt={animal.nome}
            className="w-80 h-80 object-cover"
          />
        </div>

        <div className="pet-info">
          <h2 className="text-2xl font-semibold mb-4">Biografia</h2>
          <p className="text-gray-700 mb-4">{animal.biografia}</p>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet ac mauris eget malesuada.
            Donec nec congue libero. In hac habitasse platea dictumst. Nulla ac diam eget leo egestas imperdiet
            sed quis tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>

          <div className="action-buttons flex gap-4">
            <button className="btn-adopt bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Quero adotar
            </button>
            {isAuthenticated && (
              <Link href={`/edicaoAnimal/${animal.id}`} className="btn-edit bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-block text-center">
                Editar
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="adoption-info bg-blue-50 rounded-lg p-8 mb-8">
        <h3 className="text-xl font-semibold mb-4">Você está pronto para adotar um bichinho?</h3>
        <p className="text-gray-700">
          Adotar um bichinho não é brincadeira, precisam de muito cuidado e responsabilidade.
          Mas se você acredita estar pronto só entrar em contato conosco que respondemos o mais rápido possível! 😊
        </p>
      </div>

      <div className="contact-form bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-semibold mb-6">Escolha uma forma para falar conosco:</h3>

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">Nome:</label>
            <input
              type="text"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Lídia Sarti"
              value={contactForm.nome}
              onChange={(e) => setContactForm(prev => ({ ...prev, nome: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">E-mail para contato:</label>
            <input
              type="email"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="teste@email.com"
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">Telefone:</label>
            <input
              type="tel"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(19) 9999-9999"
              value={contactForm.telefone}
              onChange={(e) => setContactForm(prev => ({ ...prev, telefone: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">Biografia:</label>
            <textarea
              className="form-textarea w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder=""
              value={contactForm.biografia}
              onChange={(e) => setContactForm(prev => ({ ...prev, biografia: e.target.value }))}
            />
          </div>

          <div className="contact-options flex gap-4">
            <button
              type="submit"
              className="btn-email bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enviar e-mail
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn-whatsapp bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}