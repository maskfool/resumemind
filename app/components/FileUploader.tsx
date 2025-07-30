import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '~/lib/utils';
interface onFileSelectProps{
    onFileSelect?: (file: File | null) => void;
}
const FileUploader = ({onFileSelect}:onFileSelectProps) => {
    
     const onDrop = useCallback((acceptedFiles:File[]) => {

    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, [onFileSelect])

  const maxFileSize = 20 * 1024 * 1024;
  const {getRootProps, getInputProps, isDragActive,acceptedFiles} = useDropzone({
    onDrop,
    multiple:false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: maxFileSize, // 20 MB


})
const file = acceptedFiles[0] || null;
  return (
    <div className="w-full gradient-border">
        <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='space-y-4 cursor-pointer'>
        
        {file?(
            <div className='uploader-selected-file flex items-center justify-between' onClick={(e) => e.stopPropagation()}>
  <div className='flex items-center space-x-2'>
    <img src='/images/pdf.png' alt='PDF' className='size-10' />
    <div>
      <p className='text-sm text-gray-700 font-medium truncate max-w-xs'>
        {file.name}
      </p>
      <p className='text-sm text-gray-500'>
        {formatSize(file.size)}
      </p>
    </div>
  </div>

  <button className='p-2 cursor-pointer' onClick={() => onFileSelect?.(null)}>
    <img src='/icons/cross.svg' alt='remove' className='w-4 h-4' />
  </button>
</div>

            
        ):(
            <div>
                <div className='mx-auto flex items-center w-16 h-16 justify-center mb-2'>
                    <img src='/icons/info.svg' alt='upload' className='size-20'/>
                </div>
                <p className='text-lg text-gray-500'>
                    <span className='font-semibold'>Click here to Upload </span>
                    or drag and drop
                </p>
                <p className='text-lg text-gray-500'>
                    PDF (max {formatSize(maxFileSize)})
                </p>
                
            </div>
        )}

      </div>
    </div>
    </div>
  )
}

export default FileUploader