import React, { useState, useEffect, useRef } from 'react';
import LZString from 'lz-string';
import { Grip, Eye, Link, Squirrel, Info, X } from 'lucide-react';
import * as $3Dmol from '3dmol/build/3Dmol.js';

function TextArea({ xyzData, setXyzData }) {
  return (
    <textarea
      value={xyzData}
      onChange={(e) => setXyzData(e.target.value)}
      placeholder="Input XYZ data here"
      wrap="off"
    />
  );
}

function ViewArea({ xyzData }) {
  const viewerRef = useRef(null);
  useEffect(() => {
    const config = {
      backgroundColor: 'white',
    };
    const viewer = $3Dmol.createViewer(viewerRef.current, config);
    viewer.clear();
    viewer.addModelsAsFrames(xyzData, 'xyz', {'keepH': true});
    viewer.animate({loop: "forward", reps: 0, interval: 200});
    viewer.setStyle({}, { stick: {}, sphere: { scale: 0.3 } });
    viewer.zoomTo();
    viewer.render();
    return () => {
      viewer.clear();
    };
  }, [xyzData]);
  return (
    <div className="viewarea" ref={viewerRef}></div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={32} />
        </button>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState('input');
  const [xyzData, setXyzData] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const decompressedData = LZString.decompressFromEncodedURIComponent(hash);
      if (decompressedData) {
        setXyzData(decompressedData);
        setMode('view');
      }
    } else {
      const exampleData = 'EwFgUGByAEtwjAOgKwA4AMq53Yg7OsHttALS7BECcYAwidEgQGzAnn4DMeI7F8wZlAa5knEOnZJkzPPD6JOydJzojFwTvJJJOzdJJK5CPNdg6oBndSGRj1meHjNwOzKrIVVOlBemaswubAiPCoqMzq7lSG2BR4qKr0wYioyAIKyMDoyOrAYsBBrkhUYsTm0mFYRojoIIIuOIjMMtWunLVEvOa48LLIYADyDCGWelKI+WgKfd5DeaggVCMoPN1xochU8I1ko+geKwZa6so+u9CjnOja2NIG67Ac8B6oYAAS7B1URLdPuLJUOUNtxAp8dIgQKhNF9IXVIj18BEBuDXPFMLCsnUFFDmG9UU00p5zB1gFQYuogeEPuwQiArCseAkFNknDSUvp6is9MA-rBpJQdgSyB1UFQ8NYId4QI9YLg9KV2dgOlstgwkCpOJK0aktOBhdBSaBlhDkHhtpSpkq4CFmCATiQQulrplzZwgA';
      setXyzData(LZString.decompressFromEncodedURIComponent(exampleData));
      setMode('input');
    }
  }, []);

  const handleLinkButton = () => {
    const compressedData = LZString.compressToEncodedURIComponent(xyzData);
    const url = `${window.location.origin}${window.location.pathname}#${compressedData}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 600);
  };

  const handleInfoButton = () => {
    setIsInfoModalOpen(true);
  };

  return (
    <main>
      <div className='buttonContainer'>
        <button onClick={() => setMode(mode === 'input' ? 'view' : 'input')}>
          {mode === 'input' ? <Eye size={28} /> : <Grip size={28} />}
        </button>
        <button onClick={handleLinkButton}>
        {isCopied ? <Squirrel size={28} /> : <Link size={28} />}
        </button>
        <button onClick={handleInfoButton}>
          <Info size={28} />
        </button>
      </div>
      {mode === 'input' ? (
        <TextArea xyzData={xyzData} setXyzData={setXyzData} />
      ) : (
        <ViewArea xyzData={xyzData} />
      )}
      <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <h2>PockeMol 🐿️</h2>
        <p><strong>PockeMol</strong> is an easy-to-use web app designed for visualizing and sharing molecular structures.</p>
        <ul>
          <li>Click on <i><Eye size={14} /></i> to switch to the <strong>view</strong> mode and see the 3D molecular structure.</li>
          <li>Click on <i><Grip size={14} /></i> to switch to the <strong>input</strong> mode and enter the XYZ coordinate of the molecule.</li>
          <li>Click on <i><Link size={14} /></i> to generate a shareable URL containing structural data on the molecule.</li>
        </ul>
        <p><strong>PockeMol</strong> was created by <a href="https://yamnor.me" target="_blank" rel="noopener noreferrer">yamnor</a>,
        a chemist 🧪 specializing in molecular simulation 🖥️ living in Japan 🇯🇵.</p>
        <p>If you have any questions, thoughts, or comments, feel free to <a href="https://letterbird.co/yamnor" target="_blank" rel="noopener noreferrer">contact me</a> ✉️ or
        find me on <a href="https://x.com/yamnor" target="_blank" rel="noopener noreferrer">X</a>.</p>
        <p>For more information, visit my <a href="https://github.com/yamnor/pockemol" target="_blank" rel="noopener noreferrer">GitHub repository</a>.</p>
      </Modal>
    </main>
  );
}

export default App;