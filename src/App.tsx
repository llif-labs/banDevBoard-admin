import React, {useEffect} from 'react';
import Route from "./route";

function App() {

  useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    document.addEventListener('dragstart', handleDragStart);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return <Route />;
}

export default App;

