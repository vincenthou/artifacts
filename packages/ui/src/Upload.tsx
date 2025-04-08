import { File, Folder } from 'lucide-react';

export const Upload = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div 
        className="rounded-[30px] h-full max-h-[360px] flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden"
        id="upload-file-tab"
      >
        <input type="file" webkitdirectory="true" directory="" className="hidden" />
        <input type="file" accept=".html,.tsx,.jsx" className="hidden" />
        
        <div className="flex flex-col items-center justify-center h-full relative z-10 gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-medium text-black font-inter">
              Drag & Drop Your Creation
            </h2>
            <p className="text-black/45 text-xs font-inter">
              HTML or TSX file｜Folder with HTML, CSS, and JS files (＜10 MB)
            </p>
          </div>
          
          <div className="flex flex-row gap-4">
            <button 
              className="w-40 h-14 flex items-center justify-center cursor-pointer font-medium text-black/95 bg-[rgba(0,0,0,0.03)] gap-2 rounded-2xl hover:bg-white hover:shadow-xl"
              style={{ border: '1px dashed rgba(30,30,30,0.12)' }}
            >
              <span>Select File</span>
              <File className="w-4 h-4" />
            </button>
            
            <button 
              className="w-40 h-14 flex items-center justify-center cursor-pointer font-medium text-black/95 bg-[rgba(0,0,0,0.03)] gap-2 rounded-2xl hover:bg-white hover:shadow-xl"
              style={{ border: '1px dashed rgba(30,30,30,0.12)' }}
            >
              <span>Select Folder</span>
              <Folder className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};