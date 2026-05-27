
import { useState, useDeferredValue, useMemo } from 'react';

function SearchList({ query }) {
  // We use useMemo to simulate a heavy computation based on the deferred value
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 20000; i++) {
      if (query === '' || `Item ${i}`.includes(query)) {
        list.push(<li key={i}>Item {i}</li>);
      }
    }
    return list;
  }, [query]);

  return <ul>{items}</ul>;
}

export default function UseDefferedValueComponent() {
  const [text, setText] = useState('');
  
  // Create a deferred version of the text state
  const deferredText = useDeferredValue(text);

  return (
    <div style={{ padding: '20px' }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to search..."
      />
      
      {/* The input stays fast because it uses 'text'.
         The list might lag, but it won't block the input because it uses 'deferredText'.
      */}
      <div style={{ opacity: text !== deferredText ? 0.5 : 1 }}>
        <SearchList query={deferredText} />
      </div>
    </div>
  );
}