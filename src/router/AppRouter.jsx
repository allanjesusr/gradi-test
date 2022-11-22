import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import App from '../App';

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
