"use client";
import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";
import { CloudDownloadSVG } from "@/svgs";
import { cn } from "@/lib/utils";

interface FileUploadInputProps extends React.ComponentProps<"input"> {
  loading?: boolean;
}

const FileUploadInput = forwardRef<HTMLInputElement, FileUploadInputProps>(
  ({ onChange, className, loading = false, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(
      null,
    );

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        setSelectedFileName(file.name);
        if (onChange) {
          const syntheticEvent = {
            target: { files: e.dataTransfer.files },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setSelectedFileName(file.name);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center bg-black/20 text-center transition-colors",
          isDragging && "bg-accent-500",
          className,
        )}
      >
        <div className="flex aspect-square max-w-60 w-full flex-col items-center justify-center space-y-2 rounded-[2rem] bg-accent-100 p-3">
          <CloudDownloadSVG />

          <AnimatePresence>
            {selectedFileName ? (
              <motion.p
                key="fileName"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-2 text-gray-100"
              >
                {selectedFileName}
              </motion.p>
            ) : (
              <>
                <p className="text-gray-100">
                  Drag &amp; drop or click to upload
                </p>
                <p className="text-xs text-neutral-light">
                  SVG, PNG, JPG or GIF (MAX. 2MB)
                </p>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* HIDDEN FILE INPUT */}
        <input
          ref={ref}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          {...props}
        />

        {/* LOADING OVERLAY */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-accent-700/80"
            >
              <Loader className="animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </label>
    );
  },
);

FileUploadInput.displayName = "FileUploadInput";

export default FileUploadInput;
