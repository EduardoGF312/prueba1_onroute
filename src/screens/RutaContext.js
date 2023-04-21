import React, { createContext, useState } from 'react';

const RutaContext = createContext({
  ruta: '',
  setRuta: () => {},
  newSituationAdded: false,
  setNewSituationAdded: () => {},
});

const RutaProvider = ({ children }) => {
  const [ruta, setRuta] = useState('');
  const [newSituationAdded, setNewSituationAdded] = useState(false);

  return (
    <RutaContext.Provider
      value={{
        ruta,
        setRuta,
        newSituationAdded,
        setNewSituationAdded,
      }}
    >
      {children}
    </RutaContext.Provider>
  );
};

export {RutaContext};
export default RutaProvider;
