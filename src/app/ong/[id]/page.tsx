"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../../services/api";

interface OngData {
  id: number;
  nome_ong: string;
  email: string;
  facebook: string;
  instagram: string;
  cidade: string;
  estado: string;
  telefone: string;
  caminho_imagem_logo: string | null;
}

interface EditFormData {
  nome_ong: string;
  email: string;
  facebook: string;
  instagram: string;
  cidade: string;
  estado: string;
  telefone: string;
}

export default function EditarOng() {
  const router = useRouter();
  const id = 1; // TODO: ajustar a dinâmica do id

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditFormData>({
    nome_ong: "",
    email: "",
    facebook: "",
    instagram: "",
    cidade: "",
    estado: "",
    telefone: "",
  });
  const [errors, setErrors] = useState<Partial<EditFormData>>({});
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchOng = async () => {
      try {
        const response = await api.get(`/ong`);
        const ong = response.data;

        setFormData({
          nome_ong: ong.nome_ong || "",
          email: ong.email || "",
          facebook: ong.facebook || "",
          instagram: ong.instagram || "",
          cidade: ong.cidade || "",
          estado: ong.estado || "",
          telefone: ong.telefone || "",
        });

        setPreviewImage(ong.caminho_imagem_logo || "/assets/logoONG.png");
      } catch (err) {
        console.error("Erro ao buscar ONG:", err);
        setError("Erro ao carregar dados da ONG");
      } finally {
        setLoading(false);
      }
    };
    fetchOng();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EditFormData> = {};
    if (!formData.nome_ong) newErrors.nome_ong = "Nome da ONG é obrigatório";
    if (!formData.email) newErrors.email = "Email é obrigatório";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.cidade) newErrors.cidade = "Cidade é obrigatória";
    if (!formData.estado) newErrors.estado = "Estado é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaveLoading(true);

    const dataToSend = {
      nome_ong: formData.nome_ong,
      email: formData.email,
      facebook: formData.facebook,
      instagram: formData.instagram,
      cidade: formData.cidade,
      estado: formData.estado,
      telefone: formData.telefone,
    };

    try {
      const response = await api.put(`/ong/${id}`, dataToSend);
      if (response.status >= 200 && response.status < 300) {
        alert("ONG atualizada com sucesso!");
        router.push("/");
      } else {
        alert("Erro ao atualizar ONG");
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao atualizar ONG");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        Gerenciamento {formData.nome_ong}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <label
                htmlFor="nome_ong"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome da ONG:
              </label>
              <input
                id="nome_ong"
                name="nome_ong"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.nome_ong}
                onChange={handleInputChange}
              />
              {errors.nome_ong && (
                <span className="text-red-600 text-sm">{errors.nome_ong}</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Facebook:
              </label>
              <input
                id="facebook"
                name="facebook"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.facebook}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="instagram"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Instagram:
              </label>
              <input
                id="instagram"
                name="instagram"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.instagram}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="cidade"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cidade:
              </label>
              <input
                id="cidade"
                name="cidade"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.cidade}
                onChange={handleInputChange}
              />
              {errors.cidade && (
                <span className="text-red-600 text-sm">{errors.cidade}</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="estado"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Estado:
              </label>
              <input
                id="estado"
                name="estado"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.estado}
                onChange={handleInputChange}
              />
              {errors.estado && (
                <span className="text-red-600 text-sm">{errors.estado}</span>
              )}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telefone:
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.telefone}
                onChange={handleInputChange}
              />
              <small className="text-gray-500">
                Será usado para contato via WhatsApp
              </small>
              {errors.telefone && (
                <span className="text-red-600 text-sm block">
                  {errors.telefone}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo:
              </label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded overflow-hidden">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Logo ONG"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full cursor-pointer hover:bg-gray-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Upload
                  </label>
                  <small className="text-gray-500 block mt-2">
                    Recomendamos que seja pelo menos 256x256
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            disabled={saveLoading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
