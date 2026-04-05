'use client';

import { useState } from 'react';
import api from '../../services/api';

interface AnimalFormData {
  nome: string;
  raca: string;
  idade: string;
  cidade: string;
  estado: string;
  tipo_animal: string;
  porte_animal: string;
  biografia: string;
  foto: File | null;
}

export default function CadastrarAnimal() {
  const [formData, setFormData] = useState<AnimalFormData>({
    nome: '',
    raca: '',
    idade: '',
    cidade: '',
    estado: '',
    tipo_animal: '',
    porte_animal: '',
    biografia: '',
    foto: null,
    
  });

  const [errors, setErrors] = useState<Partial<AnimalFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, foto: file }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipo_animal: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AnimalFormData> = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.raca) newErrors.raca = 'Raça é obrigatória';
    if (!formData.idade) newErrors.idade = 'Idade é obrigatória';
    if (!formData.cidade) newErrors.cidade = 'Cidade é obrigatória';
    if (!formData.estado) newErrors.estado = 'Estado é obrigatório';
    if (!formData.tipo_animal) newErrors.tipo_animal = 'Tipo de animal é obrigatório';
    if (!formData.porte_animal) newErrors.porte_animal = 'Porte é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataToSend = {
      nome: formData.nome,
      raca: formData.raca,
      idade: parseInt(formData.idade, 10),
      disponivel: 1,
      biografia: formData.biografia || null,
      cidade: formData.cidade,
      estado: formData.estado,
      tipo_animal: parseInt(formData.tipo_animal, 10),
      porte_animal: parseInt(formData.porte_animal, 10),
    };

    try {
      const response = await api.post('/cadastroAnimal', dataToSend);
      if (response.status >= 200 && response.status < 300) {
        alert('Animal cadastrado com sucesso!');
        setFormData({
          nome: '',
          raca: '',
          idade: '',
          cidade: '',
          estado: '',
          tipo_animal: '',
          porte_animal: '',
          biografia: '',
          foto: null,
        });
      } else {
        alert('Erro ao cadastrar animal');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar animal');
    }
  };

  const porteOptions = [
    { value: '1', label: 'Pequeno' },
    { value: '2', label: 'Médio' },
    { value: '3', label: 'Grande' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Cadastrar Animal</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome:</label>
              <input
                id="nome"
                name="nome"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
              {errors.nome && <span className="text-red-600 text-sm">{errors.nome}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="raca" className="block text-sm font-medium text-gray-700 mb-1">Raça:</label>
              <input
                id="raca"
                name="raca"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Raça"
                value={formData.raca}
                onChange={handleInputChange}
              />
              {errors.raca && <span className="text-red-600 text-sm">{errors.raca}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-1">Idade:</label>
              <input
                id="idade"
                name="idade"
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Idade"
                value={formData.idade}
                onChange={handleInputChange}
              />
              {errors.idade && <span className="text-red-600 text-sm">{errors.idade}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">Cidade:</label>
              <input
                id="cidade"
                name="cidade"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cidade"
                value={formData.cidade}
                onChange={handleInputChange}
              />
              {errors.cidade && <span className="text-red-600 text-sm">{errors.cidade}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
              <input
                id="estado"
                name="estado"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Estado"
                value={formData.estado}
                onChange={handleInputChange}
              />
              {errors.estado && <span className="text-red-600 text-sm">{errors.estado}</span>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo:</label>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    type="radio"
                    name="tipo_animal"
                    value="1"
                    checked={formData.tipo_animal === '1'}
                    onChange={() => handleRadioChange('1')}
                  />
                  <label className="flex items-center gap-1 text-sm">
                    <img src="/assets/Icone cachorro.png" alt="Cachorro" className="w-6 h-6" /> Cachorro
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    type="radio"
                    name="tipo_animal"
                    value="2"
                    checked={formData.tipo_animal === '2'}
                    onChange={() => handleRadioChange('2')}
                  />
                  <label className="flex items-center gap-1 text-sm">
                    <img src="/assets/Icone gato.png" alt="Gato" className="w-6 h-6" /> Gato
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    type="radio"
                    name="tipo_animal"
                    value="3"
                    checked={formData.tipo_animal === '3'}
                    onChange={() => handleRadioChange('3')}
                  />
                  <label className="flex items-center gap-1 text-sm">
                    <img src="/assets/icone animais.png" alt="Outro" className="w-6 h-6" /> Outro
                  </label>
                </div>
              </div>
              {errors.tipo_animal && <span className="text-red-600 text-sm">{errors.tipo_animal}</span>}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label htmlFor="porte_animal" className="block text-sm font-medium text-gray-700 mb-1">Porte Animal:</label>
              <select
                id="porte_animal"
                name="porte_animal"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.porte_animal}
                onChange={handleInputChange}
              >
                <option value="">Selecione</option>
                {porteOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.porte_animal && <span className="text-red-600 text-sm">{errors.porte_animal}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto:</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                  {formData.foto ? (
                    <img src={URL.createObjectURL(formData.foto)} alt="Foto" className="w-18 h-18 object-cover rounded" />
                  ) : (
                    <img src="/assets/fotoPet.png" alt="Foto" className="w-18 h-18" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="foto-upload"
                  />
                  <label htmlFor="foto-upload" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full cursor-pointer hover:bg-gray-200">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload
                  </label>
                  <div className="text-xs text-gray-500 mt-2">Recomendamos que seja pelo menos 720x720</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="biografia" className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
              <textarea
                id="biografia"
                name="biografia"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="Biografia"
                value={formData.biografia}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}