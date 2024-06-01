import { ContentProvider } from './context/Context';
import AppRoutes from './routes/AppRoutes';
import React, { useEffect, useState } from 'react';



function App() {

  return (
     <ContentProvider>
       <AppRoutes />
     </ContentProvider>
  )
}

export default App
