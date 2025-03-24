"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Image, FileVideo, FileAudio, File, Upload, X, Plus } from "lucide-react"

export default function CourseEditForm() {
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState("")
  const [price, setPrice] = useState("")
  const [level, setLevel] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const [audioFiles, setAudioFiles] = useState<File[]>([])

  // Track which modal is open
  const [openModal, setOpenModal] = useState<string | null>(null)

  // Refs for modal click outside detection
  const modalRefs = {
    images: useRef<HTMLDivElement>(null),
    videos: useRef<HTMLDivElement>(null),
    documents: useRef<HTMLDivElement>(null),
    audio: useRef<HTMLDivElement>(null),
  }

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openModal &&
        modalRefs[openModal as keyof typeof modalRefs]?.current &&
        !modalRefs[openModal as keyof typeof modalRefs].current?.contains(event.target as Node)
      ) {
        setOpenModal(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openModal])

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "videos" | "documents" | "audio",
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)

      switch (type) {
        case "images":
          setImages((prev) => [...prev, ...filesArray])
          break
        case "videos":
          setVideos((prev) => [...prev, ...filesArray])
          break
        case "documents":
          setDocuments((prev) => [...prev, ...filesArray])
          break
        case "audio":
          setAudioFiles((prev) => [...prev, ...filesArray])
          break
      }
    }
  }

  const removeFile = (index: number, type: "images" | "videos" | "documents" | "audio") => {
    switch (type) {
      case "images":
        setImages((prev) => prev.filter((_, i) => i !== index))
        break
      case "videos":
        setVideos((prev) => prev.filter((_, i) => i !== index))
        break
      case "documents":
        setDocuments((prev) => prev.filter((_, i) => i !== index))
        break
      case "audio":
        setAudioFiles((prev) => prev.filter((_, i) => i !== index))
        break
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log({
      title,
      duration,
      price,
      level,
      images,
      videos,
      documents,
      audioFiles,
    })
    alert("Curso guardado correctamente")
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Editar Curso</h2>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título del Curso
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Introduce el título del curso"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duración (horas)
                </label>
                <input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Ej: 10"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Precio
                </label>
                <input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ej: 99.99"
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel
                </label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona un nivel</option>
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Multimedia Sections */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Contenido Multimedia</h3>

            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium flex items-center">
                  <Image className="h-5 w-5 mr-2" />
                  Imágenes
                </h4>
                <button
                  type="button"
                  onClick={() => setOpenModal("images")}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Imágenes
                </button>
              </div>

              {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Preview ${index}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index, "images")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">No hay imágenes añadidas</p>
                </div>
              )}
            </div>

            {/* Videos Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium flex items-center">
                  <FileVideo className="h-5 w-5 mr-2" />
                  Videos
                </h4>
                <button
                  type="button"
                  onClick={() => setOpenModal("videos")}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Videos
                </button>
              </div>

              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos.map((file, index) => (
                    <div key={index} className="relative">
                      <video src={URL.createObjectURL(file)} controls className="w-full h-auto rounded-md" />
                      <button
                        type="button"
                        onClick={() => removeFile(index, "videos")}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-sm mt-1">{file.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">No hay videos añadidos</p>
                </div>
              )}
            </div>

            {/* Documents Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium flex items-center">
                  <File className="h-5 w-5 mr-2" />
                  Documentos
                </h4>
                <button
                  type="button"
                  onClick={() => setOpenModal("documents")}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Documentos
                </button>
              </div>

              {documents.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <File className="h-5 w-5 mr-2 text-blue-500" />
                        <span className="text-sm truncate max-w-[400px]">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index, "documents")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">No hay documentos añadidos</p>
                </div>
              )}
            </div>

            {/* Audio Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium flex items-center">
                  <FileAudio className="h-5 w-5 mr-2" />
                  Archivos de Audio
                </h4>
                <button
                  type="button"
                  onClick={() => setOpenModal("audio")}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Audio
                </button>
              </div>

              {audioFiles.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {audioFiles.map((file, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm truncate max-w-[400px]">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index, "audio")}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <audio src={URL.createObjectURL(file)} controls className="w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">No hay archivos de audio añadidos</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Modal for Images */}
      {openModal === "images" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRefs.images}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Añadir Imágenes</h3>
              <button type="button" onClick={() => setOpenModal(null)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Haz clic para subir imágenes</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "images")}
                  />
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 max-h-[400px] overflow-y-auto p-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Preview ${index}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index, "images")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Videos */}
      {openModal === "videos" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRefs.videos}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Añadir Videos</h3>
              <button type="button" onClick={() => setOpenModal(null)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Haz clic para subir videos</span>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "videos")}
                  />
                </label>
              </div>

              {videos.length > 0 && (
                <div className="space-y-4 mt-4 max-h-[400px] overflow-y-auto p-2">
                  {videos.map((file, index) => (
                    <div key={index} className="relative">
                      <video src={URL.createObjectURL(file)} controls className="w-full h-auto rounded-md" />
                      <button
                        type="button"
                        onClick={() => removeFile(index, "videos")}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-sm mt-1">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Documents */}
      {openModal === "documents" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRefs.documents}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Añadir Documentos</h3>
              <button type="button" onClick={() => setOpenModal(null)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Haz clic para subir documentos</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "documents")}
                  />
                </label>
              </div>

              {documents.length > 0 && (
                <div className="space-y-2 mt-4 max-h-[400px] overflow-y-auto p-2">
                  {documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <File className="h-5 w-5 mr-2 text-blue-500" />
                        <span className="text-sm truncate max-w-[400px]">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index, "documents")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Audio */}
      {openModal === "audio" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRefs.audio}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Añadir Archivos de Audio</h3>
              <button type="button" onClick={() => setOpenModal(null)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Haz clic para subir archivos de audio</span>
                  <input
                    type="file"
                    accept="audio/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "audio")}
                  />
                </label>
              </div>

              {audioFiles.length > 0 && (
                <div className="space-y-4 mt-4 max-h-[400px] overflow-y-auto p-2">
                  {audioFiles.map((file, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm truncate max-w-[400px]">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index, "audio")}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <audio src={URL.createObjectURL(file)} controls className="w-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

