import React, { useState, useEffect, useRef } from 'react';
import LZString from 'lz-string';
import { Grip, Eye, Link2, Info } from 'lucide-react';

function InputArea({ xyzData, setXyzData }) {
  return (
    <textarea
      value={xyzData}
      onChange={(e) => setXyzData(e.target.value)}
      placeholder="Input XYZ data here"
      cols="80"
      wrap="off"
    />
  );
}

function CanvasArea({ xyzData }) {
  const viewerRef = useRef(null);
  useEffect(() => {
    const config = { backgroundColor: 'white' };
    const viewer = window.$3Dmol.createViewer(viewerRef.current, config);
    viewer.clear();
    viewer.addModel(xyzData, 'xyz');
    viewer.addStyle({}, { stick: {}, sphere: { scale: 0.3 } });
    viewer.zoomTo();
    viewer.render();
    return () => {
      viewer.clear();
    };
  }, [xyzData]);

  return (
    <div class="molview" ref={viewerRef}></div>
  );
}

function App() {
  const [mode, setMode] = useState('input');
  const [xyzData, setXyzData] = useState('');

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
    alert('Copied to clipboard!');
  };

  const handleInfoButton = () => {
    window.open('https://github.com/yamnor/pockemol', '_blank', 'noopener,noreferrer')
  };

  return (
    <main>
      <div class='buttonContainer'>
        <button onClick={() => setMode(mode === 'input' ? 'view' : 'input')}>
          {mode === 'input' ? <Eye size={24} /> : <Grip size={24} /> }
        </button>
        <button onClick={handleLinkButton}>
          <Link2 size={24} />
        </button>
        <button onClick={handleInfoButton}>
          <Info size={24} />
        </button>
      </div>
      {mode === 'input' ? (
        <InputArea xyzData={xyzData} setXyzData={setXyzData} />
      ) : (
        <CanvasArea xyzData={xyzData} />
      )}
    </main>
  );
}

export default App;