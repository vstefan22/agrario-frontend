import { FC, useEffect, useState } from "react";
import fileUploadIcon from "../../assets/images/file-upload.png";
import fileDocumentIcon from "../../assets/images/file-document.png";
import deleteIcon from "../../assets/images/del.png";

function formatFileSize(sizeInBytes: number): string {
  const kb = sizeInBytes / 1024;
  if (kb < 1024) {
    return `${Math.round(kb)} KB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

interface UploadFileProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  initialFiles?: File[];
}

const MAX_FILES = 3;
const MAX_SIZE_MB = 25;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const UploadFile: FC<UploadFileProps> = ({
  onFilesChange,
  maxFiles = MAX_FILES,
  initialFiles = [],
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const filtered = newFiles.filter((file) => file.size <= MAX_SIZE_BYTES);
    const updatedFiles = [...files, ...filtered].slice(0, maxFiles);

    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);

    e.target.value = "";
  };
  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const handleDelete = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  return (
    <div className="flex items-start gap-4">
      <div className="w-[300px] h-[80px] border border-gray-medium rounded-[8px] border-dashed flex flex-col items-center justify-center relative">
        <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
          <input type="file" multiple className="hidden" onChange={handleFileSelect} />
          <img src={fileUploadIcon} alt="file upload" className="w-[36px] h-[36px]" />
          <p className="text-[12px] font-[500] text-center">
            <span className="text-primary-blue">Datei hinzufügen</span>{" "}
            <span className="text-gray-dark-100">(Max. File size: {MAX_SIZE_MB} MB)</span>
          </p>
        </label>
      </div>

      <div className="flex gap-4 flex-wrap">
        {files.map((file, index) => {
          const sizeText = formatFileSize(file.size);

          return (
            <div
              key={index}
              className="w-[300px] h-[80px] border border-gray-medium rounded-[8px] flex items-center px-3 py-2 gap-3 bg-white overflow-hidden"
            >
              <img src={fileDocumentIcon} alt="file document" className="w-6 h-6" />
              <div className="flex flex-col flex-1 overflow-hidden">
                <span
                  className="text-gray-dark-200 text-[16px] font-[400] truncate"
                  title={file.name}
                >
                  {file.name}
                </span>
                <span className="text-gray-medium text-[12px] font-[400]">{sizeText}</span>
              </div>
              <button type="button" onClick={() => handleDelete(index)} className="ml-auto">
                <img src={deleteIcon} alt="delete" className="w-[20px] h-[20px]" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadFile;
